import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"

function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-text">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <section id="projects">Projects</section>
        <section id="contact">Contact</section>
      </main>
    </div>
  )
}

export default App
