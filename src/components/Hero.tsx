export function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.querySelector("#projects")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="gradient-backdrop" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="relative z-10 max-w-2xl text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Jason Acido
        </h1>
        <p className="text-lg md:text-xl text-text-muted mb-8">
          Full-stack developer building for the web.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#projects"
            onClick={handleScroll}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium"
          >
            View Projects
          </a>
          <a
            href="https://github.com/jasonacido"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border hover:border-text-muted rounded-lg transition-colors font-medium text-text-muted hover:text-text"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
