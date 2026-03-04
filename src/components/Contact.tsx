const socials = [
  { label: "GitHub", url: "https://github.com/jasonacido" },
  { label: "LinkedIn", url: "https://linkedin.com/in/jasonacido" },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch</h2>
        <p className="text-text-muted mb-8">
          Have a project in mind or just want to say hi?
        </p>
        <a
          href="mailto:hello@jasonacido.com"
          className="inline-block px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium mb-8"
        >
          hello@jasonacido.com
        </a>
        <div className="flex justify-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
