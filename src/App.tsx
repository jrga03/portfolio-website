import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Projects } from "./components/Projects"

function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-text">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Projects />
        <section id="contact">Contact</section>
      </main>
    </div>
  )
}

export default App
