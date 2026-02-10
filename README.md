# Polutek OS: The Digital Architect Monorepo

Welcome to the **Polutek OS** repository. This is a production-ready system designed for the era of AI-driven development, focusing on high-performance, multi-tenant architecture and "Digital Noir" aesthetics.

## 🏗️ Architecture

This repository uses a single-project Next.js App Router setup that powers multiple frontends via **Vercel Edge Middleware Multi-tenancy**. Depending on the incoming host header, the middleware rewrites requests to specific internal routes, allowing for a seamless multi-domain experience within a unified codebase.

## 📦 Modules

- **`ai.polutek.pl`**: The Public AI Course Platform.
  - **Purpose**: A high-conversion landing page and educational portal for the "Architect Protocol".
  - **Focus**: Vibe Coding, Cursor AI, Bolt, and SaaS building.
  - **SEO**: Fully indexed to maximize organic reach and viral potential.

- **`polutek.pl` (Main Domain)**: Private Research & Investigative Tools.
  - **Purpose**: A secure, password-protected portal for deep-dive investigations and exclusive content.
  - **Security**: Hardened via `PasswordProtect` components and SHA-256 verification.
  - **Stealth**: Configured with `noindex, nofollow` to remain invisible to search engine crawlers.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Framer Motion for high-end animations.
- **Routing**: [Vercel Edge Middleware](https://vercel.com/docs/functions/edge-middleware) for multi-tenant path rewriting.
- **Backend/Data**: [Supabase](https://supabase.com/) (PostgreSQL + Auth).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics).

## 🚀 Deployment

The system is optimized for deployment on **Vercel**, leveraging edge functions for instantaneous routing and dynamic SEO metadata generation.

---
*Built with Vibe Coding by Project Polutek (2026).*
