# Polutek OS (The Digital Architect Monorepo)

Professional, production-ready digital architecture powering the Polutek ecosystem. This repository serves as a centralized hub for both public educational content and private research tools.

## 🏗️ Architecture

Polutek OS utilizes a **Middleware-based Multi-tenancy** architecture. A single Next.js 14 codebase dynamically routes traffic based on the incoming hostname, allowing us to serve multiple distinct platforms from a single deployment.

- **Dynamic Routing:** Handled via `middleware.ts` at the Edge.
- **SEO Optimization:** Dynamic `robots.ts` and conditional metadata based on host detection.
- **Deployment:** Optimized for Vercel with Edge Runtime capabilities.

## 📦 Modules

### 1. `detektyw.polutek.pl` (Public Investigative Portal)
The public facing investigative journal for the **Polutek Detective Agency**.
- **Focus:** Digital Noir investigative reports and public disclosure.
- **Tech:** Next.js App Router, Framer Motion, Tailwind CSS.
- **Access:** Publicly accessible but `noindex, nofollow` protected.

### 2. `polutek.pl` (Private Research & Tools)
A restricted environment for investigative research and internal tools.
- **Focus:** Digital Noir aesthetics, investigative feeds, and document storage.
- **Security:** Password protected via client-side gates and middleware exclusions.
- **Access:** Strictly private (`noindex, nofollow`).

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Backend (Storage):** [Supabase](https://supabase.com/)
- **Routing/Edge:** [Vercel Edge Middleware](https://vercel.com/docs/functions/edge-middleware)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## 🚀 Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

---
*Built for the AI Era. Projekt Polutek.*
