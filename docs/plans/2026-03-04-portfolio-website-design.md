# Developer Portfolio Website — Design

## Summary

Single-page developer portfolio built with Vite + React + TypeScript + Tailwind CSS. Three sections: Hero, Projects, Contact. Dark minimal aesthetic. Deployed on Cloudflare Pages.

## Architecture

Single-page app with smooth-scroll navigation. No routing library. Static build output.

```
src/
  components/
    Navbar.tsx
    Hero.tsx
    ProjectCard.tsx
    Projects.tsx
    Contact.tsx
    Footer.tsx
  data/
    projects.ts
  assets/
    projects/
  App.tsx
  main.tsx
  index.css
```

## Sections

### Navbar

- Fixed top bar, semi-transparent dark background with backdrop blur
- Name/logo left, scroll links (Hero, Projects, Contact) right
- Hamburger menu on mobile
- Smooth scroll on link click

### Hero

- Full viewport height (`100dvh`)
- Name, tagline, CTA buttons ("View Projects" scroll link + "GitHub" external link)
- Subtle fade-in animation on load

### Projects

- Grid layout: 2 columns desktop, 1 column mobile
- Each card: thumbnail, title, description, tech tags (pills), "Live Demo" + "GitHub" links
- Subtle hover effect (lift/glow)
- Data from hardcoded `projects.ts` array

### Contact

- Heading, email as `mailto:` link, icon links (GitHub, LinkedIn, etc.)
- No contact form — no backend needed

### Footer

- Minimal one-liner: "Built by Jason" + current year

## Project Data Shape

```ts
interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}
```

Projects live in separate repos with their own deployments. This site references them via URLs.

## Styling & Tech

- **Tailwind CSS** with custom dark color palette
- **TypeScript** throughout
- **Responsive** mobile-first design
- **`dvh`/`dvw` units** instead of `vh`/`vw` for proper mobile viewport handling
- **CSS transitions only** — no animation library
- **No routing, no state management libraries**
- **Vite** dev server and static build (`dist/`)
- **Cloudflare Pages** deploys from `dist/`
