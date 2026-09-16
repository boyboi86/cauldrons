/**
 * Asset preparation: trims the transparent PNG wordmarks to their true
 * content bounds and re-encodes them, so the header/footer logo can be sized
 * directly with a plain CSS height (no padding compensation, no negative
 * offsets).
 *
 * Run from the repository root:  node scripts/trim-logo.js
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

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

  return { width, height, bpp, pixels }
}

function contentBounds({ width, height, bpp, pixels }) {
  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = bpp === 4 ? pixels[y * width * bpp + x * bpp + 3] : 255
      if (alpha <= 8) continue
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  if (maxX < 0) throw new Error('image is fully transparent')
  return { minX, minY, maxX, maxY }
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

function trim(file) {
  const source = decodePng(file)
  const { minX, minY, maxX, maxY } = contentBounds(source)
  const width = maxX - minX + 1
  const height = maxY - minY + 1
  const rgba = Buffer.alloc(width * height * 4)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const from = (y + minY) * source.width * source.bpp + (x + minX) * source.bpp
      const to = (y * width + x) * 4
      const alpha = source.bpp === 4 ? source.pixels[from + 3] : 255
      // Premultiply against nothing: keep colour, keep alpha.
      rgba[to] = source.pixels[from]
      rgba[to + 1] = source.pixels[from + 1]
      rgba[to + 2] = source.pixels[from + 2]
      rgba[to + 3] = alpha
    }
  }

  return { width, height, buffer: encodePng(width, height, rgba) }
}

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'brand')
mkdirSync(outDir, { recursive: true })

const jobs = [
  ['assets/skybrique-logo-transparent.png', 'skybrique-wordmark.png'],
  ['assets/skybrique-logo-dark-transparent.png', 'skybrique-wordmark-dark.png'],
]

for (const [input, output] of jobs) {
  const result = trim(path.join(root, input))
  const target = path.join(outDir, output)
  writeFileSync(target, result.buffer)
  console.log(`${output}: ${result.width}x${result.height} (${(result.buffer.length / 1024).toFixed(1)} KB)`)
}
