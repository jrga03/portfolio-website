import type { Project } from "../data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-text-muted hover:-translate-y-1 transition-all duration-300">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-text-muted mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 bg-bg rounded-full text-text-muted border border-border"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-xs text-text-muted mb-4">{project.date}</p>
        <div className="flex gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Live Demo &rarr;
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
