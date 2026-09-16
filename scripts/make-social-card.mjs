/**
 * Asset preparation: builds the 1200x630 Open Graph / Twitter social card from
 * the supplied dark lockup asset, so shared links use the ~1.91:1 ratio those
 * platforms expect instead of the 10:3 logo strip they centre-crop.
 *
 * The lockup pixels are reused verbatim (no resampling): the content bounds are
 * cropped from the source card and re-centred on a canvas filled with the same
 * brand navy as the source background.
 *
 * Run from the repository root:  node scripts/make-social-card.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

const WIDTH = 1200
const HEIGHT = 630
/** --navy, and the exact background colour of the source card. */
const BACKGROUND = [0x0b, 0x1f, 0x3b]
const THRESHOLD = 10
const MARGIN = 16

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = 0xffffffff
  for (const byte of buffer) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(typeAndData), 0)
  return Buffer.concat([length, typeAndData, crc])
}

function decodePng(file) {
  const buf = readFileSync(file)
  let pos = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  const idat = []

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos)
    const type = buf.toString('ascii', pos + 4, pos + 8)
    const data = buf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }
    pos += 12 + len
  }

  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
    throw new Error(`${file}: only 8-bit RGB/RGBA PNGs are supported`)
  }

  const bpp = colorType === 6 ? 4 : 3
  const raw = zlib.inflateSync(Buffer.concat(idat))
  const stride = width * bpp
  const pixels = Buffer.alloc(height * stride)

  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)]
    const src = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride)
    const dst = pixels.subarray(y * stride, (y + 1) * stride)
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null

    for (let x = 0; x < stride; x += 1) {
      const a = x >= bpp ? dst[x - bpp] : 0
      const b = prev ? prev[x] : 0
      const c = prev && x >= bpp ? prev[x - bpp] : 0
      let val = src[x]
      if (filter === 1) val += a
      else if (filter === 2) val += b
      else if (filter === 3) val += (a + b) >> 1
      else if (filter === 4) {
        const p = a + b - c
        const pa = Math.abs(p - a)
        const pb = Math.abs(p - b)
        const pc = Math.abs(p - c)
        val += pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      } else if (filter !== 0) throw new Error(`bad filter ${filter}`)
      dst[x] = val & 0xff
    }
  }

  // Normalise to RGBA so the compositor only deals with one layout.
  if (bpp === 4) return { width, height, pixels }

  const rgba = Buffer.alloc(width * height * 4)
  for (let i = 0; i < width * height; i += 1) {
    rgba[i * 4] = pixels[i * 3]
    rgba[i * 4 + 1] = pixels[i * 3 + 1]
    rgba[i * 4 + 2] = pixels[i * 3 + 2]
    rgba[i * 4 + 3] = 255
  }
  return { width, height, pixels: rgba }
}

function encodePng(width, height, rgba) {
  const stride = width * 4
  const raw = Buffer.alloc(height * (stride + 1))
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride)
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function contentBounds({ width, height, pixels }) {
  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const o = (y * width + x) * 4
      const differs =
        Math.abs(pixels[o] - BACKGROUND[0]) > THRESHOLD ||
        Math.abs(pixels[o + 1] - BACKGROUND[1]) > THRESHOLD ||
        Math.abs(pixels[o + 2] - BACKGROUND[2]) > THRESHOLD ||
        pixels[o + 3] < 255
      if (!differs) continue
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  if (maxX < 0) throw new Error('source card contains no content')
  return { minX, minY, maxX, maxY }
}

const root = path.resolve(import.meta.dirname, '..')
const sourcePath = path.join(root, 'assets', 'skybrique-logo-dark-1200x360.png')
const outDir = path.join(root, 'public', 'brand')
mkdirSync(outDir, { recursive: true })

const source = decodePng(sourcePath)
const bounds = contentBounds(source)
const cropX = Math.max(0, bounds.minX - MARGIN)
const cropY = Math.max(0, bounds.minY - MARGIN)
const cropW = Math.min(source.width - cropX, bounds.maxX + MARGIN - cropX + 1)
const cropH = Math.min(source.height - cropY, bounds.maxY + MARGIN - cropY + 1)

if (cropW > WIDTH || cropH > HEIGHT) {
  throw new Error(`lockup ${cropW}x${cropH} does not fit in ${WIDTH}x${HEIGHT}`)
}

const canvas = Buffer.alloc(WIDTH * HEIGHT * 4)
for (let i = 0; i < WIDTH * HEIGHT; i += 1) {
  canvas[i * 4] = BACKGROUND[0]
  canvas[i * 4 + 1] = BACKGROUND[1]
  canvas[i * 4 + 2] = BACKGROUND[2]
  canvas[i * 4 + 3] = 255
}

const pasteX = Math.round((WIDTH - cropW) / 2)
const pasteY = Math.round((HEIGHT - cropH) / 2)

for (let y = 0; y < cropH; y += 1) {
  const from = ((cropY + y) * source.width + cropX) * 4
  const to = ((pasteY + y) * WIDTH + pasteX) * 4
  source.pixels.copy(canvas, to, from, from + cropW * 4)
}

const target = path.join(outDir, 'skybrique-social-card-1200x630.png')
writeFileSync(target, encodePng(WIDTH, HEIGHT, canvas))
console.log(
  `skybrique-social-card-1200x630.png: lockup ${cropW}x${cropH} centred at ${pasteX},${pasteY} on ${WIDTH}x${HEIGHT}`,
)
