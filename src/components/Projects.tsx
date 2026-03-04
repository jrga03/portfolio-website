import { projects } from "../data/projects"
import { ProjectCard } from "./ProjectCard"

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
