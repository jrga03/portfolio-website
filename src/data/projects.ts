export interface Project {
  title: string
  description: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  image: string
}

export const projects: Project[] = [
  {
    title: "Project One",
    description: "A full-stack web application for managing tasks with real-time collaboration.",
    tech: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jasonacido/project-one",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Project Two",
    description: "CLI tool for automating deployment workflows across multiple cloud providers.",
    tech: ["TypeScript", "Docker", "AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jasonacido/project-two",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Project Three",
    description: "Open-source library for building type-safe REST APIs with minimal boilerplate.",
    tech: ["TypeScript", "Express", "Zod"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/jasonacido/project-three",
    image: "/projects/placeholder.svg",
  },
]
