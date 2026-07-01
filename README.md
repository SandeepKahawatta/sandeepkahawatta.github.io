# The Daily Dev — Portfolio of Sandeep Kahawaththa

> "All the code that's fit to commit."

My personal portfolio, designed as a broadsheet newspaper: the cover story is my bio, projects run as headline articles, skills are listed in the classifieds, and hiring me starts with a letter to the editor.

**Live site:** https://sandeepkahawatta.github.io/

<!-- TODO: add a full-page screenshot here, e.g. docs/screenshot.png -->

## Who am I

Software Engineering undergraduate at SLIIT (Class of 2026) — full-stack developer with production experience (MERN, NestJS, TypeScript, React Native) and published final-year research in Multi-Agent Reinforcement Learning and Graph Neural Networks (81.8% reduction in simulated urban traffic waiting time).

- **LinkedIn:** [sandeep-kahawatta](http://www.linkedin.com/in/sandeep-kahawatta-a7b5a8216)
- **Email:** sandeepkahawatta9@gmail.com
- **CV:** [resume.pdf](public/resume.pdf)

## Tech stack

- **React 19 + Vite 7** — SPA with fast dev/build tooling
- **Tailwind CSS 4** — utility-first styling; the newspaper theme (Newsreader serif, halftone overlays, drop caps, dot leaders) lives in [src/index.css](src/index.css)
- **Framer Motion** — layout animations (headline promotion, modal transitions), with `MotionConfig reducedMotion="user"` respecting OS motion preferences
- **lucide-react** — icons
- **GitHub Actions** — every push to `main` builds with Vite and deploys `dist/` to GitHub Pages ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

## Architecture

Content and presentation are strictly separated — updating the CV data never touches a component:

```
src/
├── data/            # All content (single source of truth, mirrors the CV)
│   ├── profile.js   # bio, contact, education, achievements
│   ├── skills.js    # skill categories
│   ├── experience.js# production / client / research work
│   └── projects.js  # project articles with images & links
├── components/      # One component per page section
│   ├── Header.jsx          # masthead
│   ├── Navbar.jsx          # sticky nav + scroll-spy highlight
│   ├── BreakingNews.jsx    # marquee ticker
│   ├── Hero.jsx            # cover story
│   ├── Sidebar.jsx         # education, CV download, socials, achievements
│   ├── TechnicalSection.jsx# op-ed + skill columns
│   ├── ExperienceSection.jsx # "Field Reports"
│   ├── ProjectSection.jsx  # headline / sub-stories / briefs layout
│   ├── ProjectModal.jsx    # accessible dialog (focus trap, ESC, scroll lock)
│   ├── ClassifiedsSection.jsx # full skill list + contact coupon
│   ├── ContactSection.jsx  # services, availability, letter composer
│   └── Footer.jsx
└── hooks/
    └── useActiveSection.js # IntersectionObserver-based scroll spy
```

Accessibility is a feature: keyboard-navigable cards, a real `role="dialog"` modal, descriptive alt text, and `prefers-reduced-motion` support throughout.

## Run it locally

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Deployment

Merging to `main` triggers the GitHub Actions workflow, which runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages. No manual deploy steps.
