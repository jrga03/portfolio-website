export interface Project {
  title: string
  description: string
  tech: string[]
  date: string
  liveUrl: string
  githubUrl: string
  image: string
}

export const projects: Project[] = [
  {
    title: "Stackdown",
    description:
      "Browser-based block-stacking game with Marathon and Practice modes. Pure TypeScript engine with Canvas 2D rendering.",
    tech: ["React", "TypeScript", "Vite", "Canvas API"],
    date: "Mar 2026",
    liveUrl: "https://stackdown.jrga.workers.dev/",
    githubUrl: "https://github.com/jrga03/stackdown",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Wedding Dashboard",
    description:
      "Wedding planning dashboard with RSVP, vendors, budget, and seating management. PWA with realtime collaboration.",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    date: "Feb 2026",
    liveUrl: "https://wedding-dashboard-nu.vercel.app",
    githubUrl: "https://github.com/jrga03/wedding-dashboard",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Household Hub",
    description:
      "Offline-first household finance app with event sourcing and multi-device sync.",
    tech: ["React", "TypeScript", "Supabase", "Dexie.js"],
    date: "Feb 2026",
    liveUrl: "https://household-hub.jrga.workers.dev",
    githubUrl: "https://github.com/jrga03/household-hub",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Meal Planner",
    description:
      "Full-stack meal planning app with authentication, recipe scraping, and PWA support.",
    tech: ["React", "JavaScript", "Create React App"],
    date: "Feb 2023",
    liveUrl: "https://meal-planner-3771.vercel.app",
    githubUrl: "https://github.com/jrga03/meal-planner",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Cert Generator",
    description:
      "Batch certificate generator from CSV and template image to PDF/PNG.",
    tech: ["Next.js", "PDFKit", "PapaParse"],
    date: "Sep 2023",
    liveUrl: "https://cert-generator-two.vercel.app",
    githubUrl: "https://github.com/jrga03/cert-generator",
    image: "/projects/placeholder.svg",
  },
  {
    title: "VA Grants Map",
    description:
      "Interactive SVG map of the Philippines showing grant partnership coverage.",
    tech: ["React", "Vite", "Tailwind CSS", "SVG"],
    date: "Sep 2025",
    liveUrl: "https://va-ph-grants-map.netlify.app/",
    githubUrl: "https://github.com/jrga03/va-ph-grants-map",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Recipe Extractor",
    description: "Scrapes structured recipe data from any recipe URL.",
    tech: ["Next.js", "TypeScript", "Cheerio"],
    date: "Feb 2022",
    liveUrl: "https://recipe-extractor-eta.vercel.app",
    githubUrl: "https://github.com/jrga03/recipe-extractor",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Report Table Maker",
    description:
      "Converts CSV to styled color-gradient table images for reporting.",
    tech: ["React", "Canvas API", "PapaParse"],
    date: "Jul 2023",
    liveUrl: "https://fb-report-table-maker.netlify.app/",
    githubUrl: "https://github.com/jrga03/fb-report-table-maker",
    image: "/projects/placeholder.svg",
  },
  {
    title: "QR Code Generator",
    description: "Customizable QR code generator with color picker.",
    tech: ["React", "Vite", "easyqrcodejs"],
    date: "Jul 2024",
    liveUrl: "https://jrga03-qrcode-generator.netlify.app/",
    githubUrl: "https://github.com/jrga03/qrcode-generator",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Poker Chip Count",
    description: "Poker chip distribution calculator per player.",
    tech: ["React", "Vite", "Formik", "Tailwind CSS"],
    date: "Jun 2023",
    liveUrl: "https://poker-chip-count.netlify.app/",
    githubUrl: "https://github.com/jrga03/poker-chip-count",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Markdown Previewer",
    description: "Markdown to HTML previewer.",
    tech: ["React", "JavaScript"],
    date: "Jun 2019",
    liveUrl: "https://jrga03.github.io/markdown-previewer/",
    githubUrl: "https://github.com/jrga03/markdown-previewer",
    image: "/projects/placeholder.svg",
  },
  {
    title: "JavaScript Calculator",
    description: "JavaScript calculator.",
    tech: ["HTML", "CSS", "JavaScript"],
    date: "Feb 2018",
    liveUrl: "https://jrga03.github.io/javascript-calcu/",
    githubUrl: "https://github.com/jrga03/javascript-calcu",
    image: "/projects/placeholder.svg",
  },
  {
    title: "Pomodoro Clock",
    description: "Pomodoro timer.",
    tech: ["React", "JavaScript"],
    date: "Nov 2017",
    liveUrl: "https://jrga03.github.io/pomodoro-clock/",
    githubUrl: "https://github.com/jrga03/pomodoro-clock",
    image: "/projects/placeholder.svg",
  },
]
