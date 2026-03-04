import { Navbar } from "./components/Navbar"

function App() {
  return (
    <div className="min-h-[100dvh] bg-bg text-text">
      <Navbar />
      <main className="pt-16">
        <section id="hero" className="h-[100dvh]">Hero</section>
        <section id="projects">Projects</section>
        <section id="contact">Contact</section>
      </main>
    </div>
  )
}

export default App
