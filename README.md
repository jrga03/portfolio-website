# Portfolio Website

Personal developer portfolio built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Vite 7** — build tool and dev server
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS v4** — utility-first styling

## Getting Started

### Prerequisites

- Node.js 22+

### Install and run

```sh
npm install
npm run dev
```

### Build for production

```sh
npm run build
```

Output goes to `dist/`.

## Project Structure

```
src/
├── components/
│   ├── Contact.tsx      # Contact section
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Hero/intro section
│   ├── Navbar.tsx       # Navigation bar
│   ├── ProjectCard.tsx  # Individual project card
│   └── Projects.tsx     # Projects grid section
├── data/
│   └── projects.ts      # Project entries
├── App.tsx              # Root component
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## Customization

- **Projects** — edit `src/data/projects.ts` to add, remove, or update portfolio entries.
- **Contact info** — update links and details in `src/components/Contact.tsx`.

## Deployment

Configured for **Cloudflare Pages**:

- Build command: `npm run build`
- Output directory: `dist`
