# PHASE 1: PROJECT INVENTORY & SYSTEM ARCHITECTURE AUDIT

**Target Project:** `abikurian/portfolio` (e:\Project\portfolio-main)  
**Audit Date:** 2026-09-28  
**Auditor Mode:** Exhaustive Static Source Audit  

---

## 1. Full Directory Tree

```
e:\Project\portfolio-main
├── .vscode/
│   ├── extensions.json
│   └── launch.json
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── frames/
│       ├── ezgif-frame-001.png
│       ├── ezgif-frame-002.png
│       ├── ezgif-frame-003.png
│       ├── ezgif-frame-004.png
│       ├── ezgif-frame-005.png
│       ├── ezgif-frame-006.png
│       ├── ezgif-frame-007.png
│       ├── ezgif-frame-008.png
│       ├── ezgif-frame-009.png
│       ├── ezgif-frame-010.png
│       ├── ezgif-frame-011.png
│       ├── ezgif-frame-012.png
│       ├── ezgif-frame-013.png
│       ├── ezgif-frame-014.png
│       ├── ezgif-frame-015.png
│       ├── ezgif-frame-016.png
│       ├── ezgif-frame-017.png
│       ├── ezgif-frame-018.png
│       ├── ezgif-frame-019.png
│       ├── ezgif-frame-020.png
│       ├── ezgif-frame-021.png
│       ├── ezgif-frame-022.png
│       ├── ezgif-frame-023.png
│       ├── ezgif-frame-024.png
│       ├── ezgif-frame-025.png
│       ├── ezgif-frame-026.png
│       ├── ezgif-frame-027.png
│       ├── ezgif-frame-028.png
│       ├── ezgif-frame-029.png
│       ├── ezgif-frame-030.png
│       ├── ezgif-frame-031.png
│       ├── ezgif-frame-032.png
│       ├── ezgif-frame-033.png
│       ├── ezgif-frame-034.png
│       ├── ezgif-frame-035.png
│       ├── ezgif-frame-036.png
│       ├── ezgif-frame-037.png
│       ├── ezgif-frame-038.png
│       ├── ezgif-frame-039.png
│       ├── ezgif-frame-040.png
│       ├── ezgif-frame-041.png
│       ├── ezgif-frame-042.png
│       ├── ezgif-frame-043.png
│       ├── ezgif-frame-044.png
│       ├── ezgif-frame-045.png
│       ├── ezgif-frame-046.png
│       ├── ezgif-frame-047.png
│       ├── ezgif-frame-048.png
│       ├── ezgif-frame-049.png
│       ├── ezgif-frame-050.png
│       ├── ezgif-frame-051.png
│       ├── ezgif-frame-052.png
│       ├── ezgif-frame-053.png
│       ├── ezgif-frame-054.png
│       ├── ezgif-frame-055.png
│       ├── ezgif-frame-056.png
│       ├── ezgif-frame-057.png
│       ├── ezgif-frame-058.png
│       ├── ezgif-frame-059.png
│       ├── ezgif-frame-060.png
│       └── ezgif-frame-061.png
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/
│   │   ├── AntigravityCard.tsx
│   │   ├── CanvasScrollAnimation.jsx
│   │   ├── ContactSection.tsx
│   │   ├── FloatingNav.tsx
│   │   ├── ProjectFilterGrid.tsx
│   │   ├── ScrollBackgroundManager.tsx
│   │   ├── SplineHeroCanvas.tsx
│   │   ├── TelemetrySection.tsx
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

*Excluded directories during read per protocol:* `.git`, `node_modules`, `dist`, `.astro`.

---

## 2. Tech Stack Identification

* **Core Framework:** Astro `v6.1.5` (Source: `package.json:22`)
* **UI Library:** React `v19.2.5` & React DOM `v19.2.5` via `@astrojs/react` `v5.0.3` (Source: `package.json:15,25,26`)
* **Styling Approach:** Tailwind CSS `v4.2.2` via `@tailwindcss/vite` `v4.2.2` and `@import "tailwindcss";` in `src/styles/global.css` (Source: `package.json:19,23`, `src/styles/global.css:1`)
* **Language:** TypeScript `v5.x` compatible ESM, with JSX/TSX support (`"jsx": "react-jsx"`, `"jsxImportSource": "react"`) (Source: `tsconfig.json:11-12`)
* **Bundler / Dev Server:** Vite (integrated within Astro 6) (Source: `astro.config.mjs:11-21`)
* **Animation & WebGL Libraries:**
  * `framer-motion` `v13.4.4` (Source: `package.json:23`)
  * `@splinetool/react-spline` `v4.1.0` (Source: `package.json:17`)
  * `@splinetool/runtime` `v2.0.59` (Source: `package.json:18`)
  * `lucide-react` `v1.48.0` (Source: `package.json:24`)
* **Font System:** Google Fonts (`Bebas Neue`, `Inter`, `JetBrains Mono` via Google Fonts CDN in `Layout.astro:36`) + `@fontsource/jetbrains-mono` `v5.2.8` (Source: `package.json:16`)
* **Package Manager:** `npm` (Lockfile version 3 present: `package-lock.json`)

---

## 3. Complete Dependencies & DevDependencies Inventory

Source file: [`package.json`](file:///e:/Project/portfolio-main/package.json#L14-L28)

| Dependency Name | Specified Version | Type | Project Purpose & Usage |
| :--- | :--- | :--- | :--- |
| `@astrojs/react` | `^5.0.3` | `dependency` | Astro integration enabling React component rendering (`client:load`, `client:visible`). |
| `@fontsource/jetbrains-mono` | `^5.2.8` | `dependency` | Self-hosted JetBrains Mono font distribution package. |
| `@splinetool/react-spline` | `^4.1.0` | `dependency` | React component wrapper for Spline 3D WebGL scenes. |
| `@splinetool/runtime` | `^2.0.59` | `dependency` | WebGL rendering runtime engine for Spline 3D scenes. |
| `@tailwindcss/vite` | `^4.2.2` | `dependency` | Official Vite plugin for Tailwind CSS v4 compilation. |
| `@types/react` | `^19.2.14` | `dependency` | TypeScript definitions for React 19. |
| `@types/react-dom` | `^19.2.3` | `dependency` | TypeScript definitions for React DOM 19. |
| `astro` | `^6.1.5` | `dependency` | Static site builder and island architecture web framework. |
| `framer-motion` | `^13.4.4` | `dependency` | Production-grade motion engine for React (spring physics, tilt, layout transitions). |
| `lucide-react` | `^1.48.0` | `dependency` | Icon library for React UI components. |
| `react` | `^19.2.5` | `dependency` | Core React UI component library. |
| `react-dom` | `^19.2.5` | `dependency` | DOM rendering engine for React. |
| `tailwindcss` | `^4.2.2` | `dependency` | Utility-first CSS framework engine (v4). |

*Note on devDependencies:* `devDependencies` block in `package.json` is `NOT DEFINED` (empty / absent); all packages are listed under `dependencies`.

---

## 4. Full Configuration Files Audit

### 4.1. `package.json`
Source: [`package.json`](file:///e:/Project/portfolio-main/package.json#L1-L30)

* **`name`**: `"portfolio"`
* **`type`**: `"module"`
* **`version`**: `"0.0.1"`
* **`engines`**: `{ "node": ">=22.12.0" }`
* **`scripts`**:
  * `"dev"`: `"astro dev"` (Launches local development server at `localhost:4321`)
  * `"build"`: `"astro build"` (Compiles production static assets to `./dist/`)
  * `"preview"`: `"astro preview"` (Previews local production build)
  * `"astro"`: `"astro"` (Runs CLI command utility)

---

### 4.2. `astro.config.mjs`
Source: [`astro.config.mjs`](file:///e:/Project/portfolio-main/astro.config.mjs#L1-L22)

```javascript
import { defineConfig } from 'astro/config';
import { searchForWorkspaceRoot } from 'vite';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          'E:/Project/node_modules'
        ]
      }
    }
  }
});
```

* **Integrations:** `react()` integration registered.
* **Vite Config:** `@tailwindcss/vite` plugin enabled; filesystem access allowed for workspace root and `E:/Project/node_modules`.

---

### 4.3. `tsconfig.json`
Source: [`tsconfig.json`](file:///e:/Project/portfolio-main/tsconfig.json#L1-L14)

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [
    ".astro/types.d.ts",
    "**/*"
  ],
  "exclude": [
    "dist"
  ],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

* **Extends:** `"astro/tsconfigs/strict"`
* **JSX Configuration:** `"jsx": "react-jsx"`, `"jsxImportSource": "react"`

---

### 4.4. Tailwind Configuration & Theme Extensions
Source: [`src/styles/global.css`](file:///e:/Project/portfolio-main/src/styles/global.css#L1-L84)

* **Tailwind Version:** Tailwind CSS v4 (`@import "tailwindcss";` syntax). Standalone `tailwind.config.js` is `NOT DEFINED`.
* **Theme Variables Defined in `@layer base` (`global.css:4-8`):**
  * `--font-bebas`: `'Bebas Neue', sans-serif`
  * `--font-inter`: `'Inter', sans-serif`
  * `--font-mono`: `'JetBrains Mono', monospace`
* **Custom Base Styles:**
  * `html`: `scroll-behavior: smooth; overflow-x: hidden; background-color: #09090b; color: #f5f5f5;`
  * `body`: `background-color: #09090b; color: #f5f5f5; margin: 0; padding: 0; min-height: 100vh; overflow-x: hidden; font-family: var(--font-inter); -webkit-font-smoothing: antialiased;`
* **Custom Utility Classes:**
  * `.glass-panel`: `background: rgba(18, 18, 20, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1);`
  * `.glass-panel-hover`: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`
  * `.animate-float`: `animation: floatWeightless 6s ease-in-out infinite;`
  * `.animate-float-delayed`: `animation: floatWeightless 8s ease-in-out 2s infinite;`
  * `.font-bebas`: `font-family: 'Bebas Neue', sans-serif;`
  * `.font-mono-custom`: `font-family: 'JetBrains Mono', monospace;`

---

### 4.5. Environment Variables Configuration
* `.env` file presence: `NOT DEFINED` (file `.env` absent in workspace root).
* `.gitignore` explicitly ignores `.env` and `.env.production` (Source: `.gitignore:17-18`).

---

### 4.6. VSCode Editor Config
Source files:
* [`.vscode/extensions.json`](file:///e:/Project/portfolio-main/.vscode/extensions.json#L1-L5): Recommended extension `astro-build.astro-vscode`.
* [`.vscode/launch.json`](file:///e:/Project/portfolio-main/.vscode/launch.json#L1-L12): Node launch configuration running `./node_modules/.bin/astro dev`.

---

## 5. Documentation & Spec Files Analysis

### 5.1. `README.md` Rules & Tokens
Source: [`README.md`](file:///e:/Project/portfolio-main/README.md#L1-L41)

* **Project Title:** `Abi Kurian Varghese // Interactive Systems Portfolio`
* **Live Deployment URL:** `https://portfolioo-six-roan.vercel.app/` (Listed in text as `abikurian.vercel.app`)
* **Design Philosophy:** "Swiss Brutalist" high-contrast dark mode palettes, sharp borders, monospace typography, uppercase tracking, glassmorphism, scroll-triggered canvas animations.
* **Core Stack Rules:** Astro Island Architecture for minimal JS payload; React UI components; Tailwind CSS; TypeScript; IntersectionObserver API; Spline (WebGL); Vercel deployment.

---

### 5.2. `design.md` Audit
* Status: `NOT DEFINED` (File `design.md` does NOT exist in the repository).
* Deviaitions vs `design.md`: Cannot flag deviations as `design.md` is absent.

---

## 6. Skipped Files Report

| File Path | Status | Reason |
| :--- | :--- | :--- |
| `package-lock.json` | Skipped details | Auto-generated package lock file (216,428 bytes); dependencies verified via `package.json`. |
| `public/frames/ezgif-frame-*.png` (61 files) | Skipped raw binary data | Binary image frame assets (`001.png` to `061.png`). Indexed in asset inventory (Phase 7). |
| `public/favicon.ico` | Skipped raw binary data | Binary icon asset. |
| `public/favicon.svg` | Verified inline | Standard SVG favicon file. |
| `src/assets/astro.svg` | Verified inline | Vector asset file. |
| `src/assets/background.svg` | Verified inline | Vector background grid asset file. |
| `.astro/` | Excluded | Generated build types and cache directory per protocol rules. |
| `.git/` | Excluded | Version control directory per protocol rules. |
| `dist/` | Excluded | Production output directory per protocol rules. |
| `node_modules/` | Excluded | Third-party dependency directory per protocol rules. |
