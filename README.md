# AI Learning Adventure

A browser-based, gamified AI-literacy learning platform. Learners work through short missions (What is AI?, LLMs, Prompt Engineering, Hallucinations, Bias, RAG, etc.), ask an AI tutor for help, take quizzes, review flashcards, track progress, and earn badges. Admins manage all of that content — missions, quiz questions, flashcards, publish state — without touching code.

## Tech stack

- **Next.js 14 (App Router) + TypeScript** — one app for frontend and backend (API routes)
- **Tailwind CSS v4** — styling, with a custom design-token palette (see `src/app/globals.css`)
- **Framer Motion** — page/mission-map/quiz/badge animations
- **Zustand** — client-side session state, persisted to localStorage
- **better-sqlite3** — file-based SQLite database (`data/app.db`), no external DB server needed
- **Zod** — request validation on every API route
- **Groq API** (optional) — live AI tutor responses, with a full mock/sample fallback when no key is set

> **Note on the data layer:** the original plan was Prisma + SQLite, but Prisma's engine binary download was blocked in the sandbox this was built in. We pivoted to `better-sqlite3` with a small hand-written repository layer (`src/lib/repo.ts`) — same DB, same guarantees (server-side publish/enable checks, idempotent badge awards), just without the ORM. This works normally on a real machine with internet access; if you'd prefer Prisma, swapping it back in is a mechanical change since all DB access goes through `src/lib/repo.ts`.

## Getting started

```bash
npm install
npm run db:seed     # creates data/app.db and loads 8 missions + quizzes + flashcards + badges
npm run dev          # http://localhost:3000
```

For a production-style run:

```bash
npm run build
npm run start
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in as needed:

```bash
cp .env.example .env.local
```

| Variable | Required? | Purpose |
|---|---|---|
| `GROQ_API_KEY` | No | Enables live AI tutor responses via [Groq](https://console.groq.com) (free tier). Without it, the app runs entirely in mock/sample mode — fully demoable either way. |
| `GROQ_MODEL` | No | Defaults to `llama-3.1-8b-instant`. |
| `ADMIN_PASSCODE` | No | Passcode for `/admin`. Defaults to `adventure-admin` — **change this before any real deployment.** |
| `ADMIN_COOKIE_SECRET` | No | Signs the admin session cookie. Defaults to a dev-only value — **change this before any real deployment.** |

## How to use it

### Starting the learning journey
Open `http://localhost:3000`, click **Start your journey** (or **Continue your journey** if you've been here before — progress is remembered locally, no login needed). This takes you to the Mission Map.

### The Mission Map
A constellation-style path of all published missions, grouped by difficulty (Beginner → Basic Understanding → Applied Practice → Responsible Use → Builder Mindset). Missions unlock in order — complete one to unlock the next.

### A mission
Each mission has an objective, short lesson content, a worked example, an inline **AI Tutor** chat panel (ask it to explain simpler, give another example, or hint at the quiz), and links to the mission's quiz and flashcards.

### AI Tutor (inline)
Available inside every mission, scoped to that mission's content. Ask anything — it'll answer using the mission's lesson as context.

### AI Only Mode
A dedicated page (`/ai-tutor`) for free-form Q&A across all AI-literacy topics in the app — not tied to a specific mission. Good for "what should I learn next?" or general questions.

### Taking a quiz
`/missions/[slug]/quiz` — one question at a time (multiple choice, true/false, or scenario-based). After submitting, you get the correct answer, a written explanation, and an AI-generated explanation of *why*. Finishing the quiz marks the mission complete, saves your score, and awards the mission's badge (once — re-completing a mission won't double-award it).

### Reviewing flashcards
`/missions/[slug]/flashcards` — flip cards showing a concept, then its definition/example/common-mistake tip on the back.

### Progress tracking
`/progress` — completion %, average quiz score, badges earned vs. total, and an AI-suggested next mission.

### Content management (admin)
Go to `/admin`, enter the passcode (`ADMIN_PASSCODE`, default `adventure-admin`). From there you can:
- **Add/edit/delete missions** — title, level, objective, lesson content, example, sort order
- **Toggle Published/Draft** and **Enabled/Disabled** independently — unpublished or disabled content is never reachable by learners, even via a direct URL (enforced server-side, not just hidden in the UI)
- **Preview as learner** (eye icon) — opens the mission as a learner would see it; works even while a mission is still a draft, via the admin session
- **Manage quiz questions & flashcards** per mission (the link icon) — add/edit/delete/enable/disable each item
- Log out via the button in the top right

Nothing an admin creates or edits goes live to learners until you explicitly set it to **Published**.

### How the AI fallback/mock mode works
Every AI-touching request (`/api/tutor`) goes through a single provider function (`src/lib/ai/provider.ts`) that:
1. Tries a live call to Groq, with an 8-second timeout.
2. On **any** failure — no API key, timeout, rate limit (HTTP 429), network error, malformed response — it falls back to a deterministic, topic-aware **mock response**, always labeled with a visible "Sample response" tag in the UI.

This means the app is fully demoable with zero configuration, and never shows a broken screen if the AI provider is slow or unavailable.

## Seed content

`npm run db:seed` loads 8 missions across all 5 difficulty levels, each with 5 quiz questions, 3 flashcards, and 1 badge — defined in `src/lib/seed-data.ts`. Edit that file and re-run the seed script to change the starting content, or use the admin UI once the app is running. Re-seeding clears and reloads mission/quiz/flashcard/badge tables but leaves any existing learner progress and earned badges untouched.

Missions included: What is AI?, What is Generative AI?, What is an LLM?, Prompt Engineering Basics, Tokens and Context, Hallucinations, Bias and Responsible AI, Retrieval-Augmented Generation.

## Project structure

```
src/
  app/
    page.tsx                    # landing page
    missions/page.tsx           # mission map
    missions/[slug]/page.tsx    # mission detail + inline tutor
    missions/[slug]/quiz/       # quiz flow
    missions/[slug]/flashcards/ # flashcard review
    progress/page.tsx           # progress dashboard
    ai-tutor/page.tsx           # AI Only Mode
    admin/                      # content management (passcode-gated)
    api/                        # all backend routes (learner-facing + admin + tutor)
  components/                   # mission map, tutor panel, quiz flow, flashcard deck, badge grid, nav, ui primitives
  lib/
    db.ts, schema.sql, repo.ts  # SQLite connection + typed data access layer
    seed-data.ts                # curriculum content
    types.ts                    # shared types
    ai/provider.ts, mock-responses.ts  # AI abstraction + fallback
    store/session.ts            # Zustand session store
    admin-auth.ts               # passcode session helper
scripts/seed.ts                 # seed script
```

## Known limitations & assumptions

- **No authentication for learners** (by design, per the brief) — progress is tied to a browser-generated session id in localStorage. Clearing browser storage or switching browsers starts a fresh journey.
- **Admin auth is a single shared passcode**, not per-user accounts — appropriate for an MVP/workshop context, not a multi-admin production deployment.
- **SQLite is file-based** — fine for local use, a single demo deployment, or Vercel's ephemeral filesystem for short-lived previews. For a persistent multi-instance production deployment, swap in a hosted Postgres/MySQL (the repository layer in `src/lib/repo.ts` is the only place that would need to change).
- **Fonts use system font stacks**, not next/font/google — this was a deliberate choice to keep the build fully offline-reliable in the sandbox this was built in. On a machine with normal internet access, swapping in `next/font/google` (e.g. Fraunces for display, Inter for body) is a drop-in change in `layout.tsx` / `globals.css`.
- **AI tutor quality depends on whether `GROQ_API_KEY` is set.** Without it, responses are pre-written, topic-aware samples — accurate for the seeded curriculum, but not dynamic.
- Quiz questions currently support MCQ, true/false, and scenario-based (single correct answer) formats — no partial-credit or multi-select question types yet.
