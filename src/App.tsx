import { Closing } from './components/Closing'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Mission } from './components/Mission'
import { OpenSource } from './components/OpenSource'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { ResearchAreas } from './components/ResearchAreas'

export default function App() {
  return (
    <>
      <a className="sb-skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Process />
        <Mission />
        <ResearchAreas />
        <Projects />
        <OpenSource />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
