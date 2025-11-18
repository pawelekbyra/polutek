# Ting Tong Next

## Project Overview

This project is a modern, mobile-first social media application inspired by TikTok, built with Next.js. It features a vertical video feed with prefetching, a real-time comment and notification system, robust user authentication, and a scalable, centralized data architecture. The application is designed for seamless deployment on Vercel, leveraging its powerful ecosystem of serverless functions, edge network, and integrated services.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn
- A PostgreSQL database (e.g., from [Vercel Postgres](https://vercel.com/postgres))
- An [Ably](https://ably.com/) account for real-time messaging
- VAPID keys for push notifications

### Installation & Setup

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install Dependencies**:
    ```bash
    cd ting-tong-next
    yarn install
    ```
3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root of the project and add the following variables:
    ```env
    # Database
    DATABASE_URL="your-postgres-database-url"

    # Authentication
    JWT_SECRET="your-strong-jwt-secret"

    # Real-Time Notifications (Ably)
    ABLY_API_KEY="your-ably-api-key"
    NEXT_PUBLIC_ABLY_API_KEY="your-ably-public-api-key"

    # Push Notifications
    NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"
    VAPID_PRIVATE_KEY="your-vapid-private-key"
    VAPID_SUBJECT="mailto:your-email@example.com"
    ```
4.  **Run Database Migrations**:
    Apply the database schema:
    ```bash
    npx prisma migrate dev
    ```

### Running the Development Server

To start the development server, run:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Key Functionalities

-   **Vertical Video Feed**: A TikTok-style, infinitely scrollable video feed with prefetching and lazy loading for optimal performance.
-   **Real-Time Notification System**: A robust notification system powered by Ably for real-time updates and Web Push for native notifications. Includes a modern, slide-in notification panel.
-   **Interactive Commenting System**: Users can comment on videos, reply to other comments, and vote on comments, with all interactions updated in real-time.
-   **User Authentication**: A secure, JWT-based authentication system with session management and password recovery.
-   **Centralized Data Layer**: A clean, scalable, and type-safe data architecture with a centralized data access layer, powered by Prisma.
-   **User Roles**: A role-based access control system with three roles: `ADMIN`, `PATRON`, and `TWÓRCA`.
-   **Admin Panel**: A dedicated admin panel for managing users and application content.

## Technology Stack & Architecture

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database & ORM**: [Vercel Postgres](https://vercel.com/postgres) & [Prisma](https://www.prisma.io/)
-   **Real-Time Messaging**: [Ably](https://ably.com/)
-   **Push Notifications**: [Web Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
-   **Rate Limiting**: [Upstash Redis](https://upstash.com/redis) via [Vercel KV](https://vercel.com/kv)
-   **File Storage**: [Vercel Blob](https://vercel.com/blob)
-   **Authentication**: [JWT (jose)](https://github.com/panva/jose)
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Critical Analysis & Future Work

This project has evolved significantly, addressing many of the initial critical issues. The architecture is now more robust, secure, and scalable. However, there are still areas for future improvement.

### Implemented & Solved

-   **Centralized Data Layer**: The database logic has been fully refactored into a centralized, type-safe data access layer under `lib/db/`, eliminating all direct Prisma calls from the API and server actions.
-   **Real-Time & Push Notifications**: A complete notification system has been implemented, providing both in-app real-time updates and native push notifications.
-   **Rate Limiting**: A rate limiting solution using Vercel KV has been implemented to protect against spam and abuse.
-   **Secure Password Handling**: All password handling now uses `bcrypt` for secure hashing.

### Recommendations for Future Work

-   **Video Transcoding**: The application still serves raw video files. Implementing a video transcoding pipeline (e.g., using Mux or AWS Elemental MediaConvert) to generate HLS/DASH streams remains a top priority for performance and scalability.
-   **Comprehensive Test Coverage**: The project still lacks automated tests. Adding a testing framework (e.g., Jest and React Testing Library for unit/integration tests, and Playwright for E2E tests) is crucial for long-term stability and maintainability.
-   **Enhanced Admin Panel**: The admin panel is functional but could be expanded with features like user search, pagination, content moderation, and analytics.
-   **Optimistic UI Updates**: While the real-time system is fast, implementing optimistic UI updates for actions like commenting and liking would further improve the user experience.
-   **Complete Internationalization (i18n)**: The application has a foundation for i18n, but translations should be completed and expanded across the entire UI.
-   **Code Cleanup**: There are still some unused files and commented-out code that should be removed to improve code quality.
