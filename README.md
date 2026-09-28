# Abi Kurian Varghese // Interactive Systems Portfolio

A high-fidelity cinematic web interface designed to showcase full-stack software engineering projects and system architectures. Built with a strict "Swiss Brutalist" design language, the portfolio balances heavy visual elements—like glassmorphism and scroll-triggered canvas components—with blazing-fast web performance.

## Live Deployment
**URL:** [abikurian.vercel.app](https://portfolioo-six-roan.vercel.app/)

## System Architecture & Tech Stack
* **Core Framework:** [Astro](https://astro.build/) (Leveraging Island Architecture for a minimal JavaScript payload)
* **UI Components:** React
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Animations & Rendering:** IntersectionObserver API, Spline (WebGL)
* **Deployment:** Vercel

## Core Features
* **Optimized DOM Rendering:** Utilizes the IntersectionObserver API to manage scroll-triggered animations and full-bleed layout transitions, preventing browser lag during heavy repaints.
* **Astro Islands:** Complex React components are mounted only when required, keeping the baseline performance fast and efficient.
* **Swiss Brutalist UI:** High-contrast dark mode palettes, sharp borders, monospace typography, and uppercase tracking for a distinct, engineering-focused aesthetic.

## Local Development Setup

To run this project locally, ensure you have Node.js installed, then execute the following commands from the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (runs at localhost:4321)
npm run dev

# 3. Build the production site to the ./dist/ directory
npm run build

# 4. Preview the production build locally before deployment
npm run preview