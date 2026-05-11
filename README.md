# Infinite Wellness — AI Health & Fitness Platform

A production-ready Next.js 14 wellness SaaS built with Supabase, OpenAI, and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Auth & Database**: Supabase (PostgreSQL + Row Level Security)
- **AI**: OpenAI GPT-4o (chat coach, photo scanner, workout generator)
- **Charts**: Recharts
- **Animations**: Framer Motion

## Quick Start

### 1. Clone and install
```bash
cd infinite-wellness
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase and OpenAI credentials
```

### 3. Set up Supabase
- Create a project at supabase.com
- Run the SQL in `src/lib/supabase/schema.sql` in the Supabase SQL editor
- Copy your project URL and anon key to `.env.local`

### 4. Run the dev server
```bash
npm run dev
# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/login          # Login page
│   ├── (auth)/signup         # Signup page
│   ├── (app)/dashboard       # Main dashboard
│   ├── (app)/workout         # Workout planner
│   ├── (app)/nutrition       # Calorie & macro tracker
│   ├── (app)/coach           # AI chat coach
│   ├── (app)/progress        # Progress charts
│   ├── blog/                 # Blog listing & posts
│   ├── legal/                # Privacy, Terms, Disclaimer
│   ├── settings/             # User profile settings
│   └── api/                  # API routes
│       ├── chat/             # AI coach endpoint
│       ├── nutrition/        # Food analysis + calorie calc
│       └── workout/          # Workout generator
├── components/
│   ├── layout/               # Navbar, Footer, App shell
│   └── sections/             # Hero, Features, Testimonials, Pricing
├── lib/
│   ├── supabase/             # Client, server, schema
│   ├── openai/               # OpenAI client + prompts
│   ├── utils/                # Calculations, formatting, cn
│   └── hooks/                # useUser hook
└── types/                    # All TypeScript types
```

## Features

| Feature | Status |
|---|---|
| Landing page | ✅ Complete |
| Auth (email + Google) | ✅ Complete |
| Dashboard with calorie ring | ✅ Complete |
| Nutrition tracker + food log | ✅ Complete |
| AI photo food scanner | ✅ Complete (requires OpenAI) |
| Workout planner + generator | ✅ Complete |
| AI Coach chat (streaming) | ✅ Complete |
| Progress charts (Recharts) | ✅ Complete |
| Blog with posts | ✅ Complete |
| Legal pages | ✅ Complete |
| Settings / Profile | ✅ Complete |
| Calorie calculator API | ✅ Complete |
| Supabase schema + RLS | ✅ Complete |
| Stripe payments | 🔜 Placeholder ready |
| Mobile app | 🔜 React Native (Phase 2) |

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=       # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Your Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=      # Your Supabase service role key
OPENAI_API_KEY=                 # Your OpenAI API key (optional for dev)
OPENAI_MODEL=gpt-4o             # Model to use
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Note**: The app works without an OpenAI API key in development — it returns intelligent mock responses so you can build and test the full UI without API costs.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in your Vercel project settings.

### Docker
```bash
docker build -t infinite-wellness .
docker run -p 3000:3000 infinite-wellness
```
