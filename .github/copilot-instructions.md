# Copilot Instructions for this Codebase

## Project Overview
This is a Vite-powered React + TypeScript project with Tailwind CSS for styling. The project is a portfolio/business site with a modern, interactive UI, custom theming, and advanced navigation/animation features. It uses both React (for the main app) and vanilla JS (for DOM enhancements in `script.js`).

## Key Files & Structure
- `src/` — Main React app (entry: `main.tsx`, root: `App.tsx`, styles: `index.css`)
- `index.html` — Main HTML shell, includes sidebar, navigation, and links to `style.css` and `script.js`
- `style.css` — Custom CSS variables, theming, and layout (extends Tailwind)
- `script.js` — Handles theme toggling, navigation, accordions, scroll animations, analytics, and accessibility for the static HTML
- `public/` — Static assets (e.g., profile image)
- `tailwind.config.js`, `postcss.config.js` — Tailwind and PostCSS setup
- `vite.config.ts` — Vite config, excludes `lucide-react` from dependency optimization

## Build & Development
- **Start dev server:** `npm run dev` (Vite, hot reload)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint:** `npm run lint` (uses ESLint with TypeScript and React rules)

## Patterns & Conventions
- **UI:** Use Tailwind CSS classes in JSX. For icons, use `lucide-react` in React components and Font Awesome in static HTML.
- **No extra UI libraries:** Only use `lucide-react` for icons in React. Do not add other UI/icon packages unless requested.
- **Theming:** Theme toggling is managed in `script.js` via a `ThemeManager` class, using CSS variables and the `.dark` class.
- **Navigation:** Sidebar and mobile menu logic is in `script.js` (`NavigationManager`). React app is currently a placeholder; most UI is static HTML.
- **Animations:** Use `.fade-in` and `.visible` classes for scroll-based animations (see `ScrollAnimationManager` in `script.js`).
- **Accessibility:** Keyboard navigation and focus management are handled in `script.js` (`enhanceAccessibility`).
- **Performance:** Images are lazy-loaded, scroll events are throttled, and critical resources are preloaded in `PerformanceManager`.

## Integration Points
- **React + Vanilla JS:** The React app (`src/`) is currently minimal. Most interactivity is handled by `script.js` on the static HTML. If migrating features to React, ensure not to duplicate logic.
- **External dependencies:**
  - `lucide-react` (React icons, but excluded from Vite optimizeDeps)
  - `font-awesome` (CDN, for static HTML icons)
  - Google Fonts (CDN)

## Project-Specific Advice
- **Do not add new UI libraries** unless explicitly requested.
- **Follow the design language**: Modern, beautiful, production-worthy UIs (see `.bolt/prompt`).
- **Use Tailwind for all styling** in React; extend with `style.css` as needed.
- **For new features:** Prefer React for new interactive UI, but ensure compatibility with existing static/vanilla JS logic.
- **For icons:** Use `lucide-react` in React, Font Awesome in static HTML.

## Examples
- See `script.js` for patterns on theme toggling, navigation, and animation.
- See `index.html` for sidebar, navigation, and section structure.
- See `style.css` for theming, layout, and responsive design.

---

If you are unsure about a workflow or pattern, check for conventions in `.bolt/prompt` and existing files before introducing new dependencies or approaches.
