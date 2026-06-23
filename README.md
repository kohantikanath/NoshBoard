# NoshBoard

A real-time dish management dashboard built with Next.js, Supabase, and Prisma.

## Features

- View all dishes with images and publish status
- Toggle published/unpublished with optimistic UI updates
- **Real-time sync** — changes made directly in the database reflect instantly on the dashboard (via Supabase Realtime)
- Toast notifications for all changes

## Tech Stack

- **Next.js 15** (App Router) — full-stack framework
- **Supabase** — PostgreSQL database + Realtime subscriptions
- **Prisma** — type-safe ORM
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Sonner** — toast notifications

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project at [supabase.com](https://supabase.com).

3. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. Run the database migration and seed:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

5. Enable Supabase Realtime for the `Dish` table:
   - Go to Supabase Dashboard → Database → Replication
   - Enable replication for the `Dish` table

6. Start the dev server:
   ```bash
   npm run dev
   ```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dishes` | Fetch all dishes |
| PATCH | `/api/dishes/:id/toggle` | Toggle isPublished status |
