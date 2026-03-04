import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Projects } from "./components/Projects"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"

function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-text">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
