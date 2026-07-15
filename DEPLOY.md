# EmpowerMe — Deployment Guide

## Architecture

| Piece    | Host                 | Notes                                        |
| -------- | -------------------- | -------------------------------------------- |
| Frontend | Vercel               | Next.js 14; project already linked (`frontend/.vercel`) |
| Backend  | Render (free tier)   | FastAPI via `render.yaml` Blueprint at repo root |
| Database | Neon (free Postgres) | Persistent — session history survives Render restarts |

## Environment variables

### Backend (Render dashboard)

| Var                 | Required | Example / notes                                          |
| ------------------- | -------- | --------------------------------------------------------- |
| `GEMINI_API_KEY`    | Yes      | Gemini key for adversary/coach/hint/judge agents           |
| `DATABASE_URL`      | Yes*     | Neon URL, e.g. `postgresql://user:pass@host/db?sslmode=require`. Without it the backend falls back to ephemeral SQLite (data wiped on every restart). `postgres://` prefix is auto-normalized. |
| `CORS_ORIGINS`      | Yes      | Comma-separated, e.g. `https://empowerme.vercel.app`       |
| `CORS_ORIGIN_REGEX` | No       | e.g. `https://empowerme-.*\.vercel\.app` for preview deploys |
| `PYTHON_VERSION`    | Set in render.yaml | `3.11.9`                                        |

### Frontend (Vercel)

| Var                   | Required | Notes                                                     |
| --------------------- | -------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | The Render backend URL, e.g. `https://empowerme-api.onrender.com`. **Baked at build time** — changing it requires a redeploy. |

## First-time deployment

1. **Neon**: create a free project at neon.tech → copy the connection string
   (keep `?sslmode=require`).
2. **Render**: dashboard → New → Blueprint → select this GitHub repo. Render reads
   `render.yaml` and creates the `empowerme-api` web service. Enter `GEMINI_API_KEY`,
   `DATABASE_URL` (Neon), and a placeholder `CORS_ORIGINS` when prompted. Deploy, then
   verify `https://<service>.onrender.com/api/scenarios/` returns the 5 seeded scenarios.
3. **Vercel**: from `frontend/`:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL production   # paste the Render URL
   vercel --prod
   ```
4. **Wire CORS**: back in Render, set `CORS_ORIGINS` to the Vercel production domain
   (env change triggers an auto-redeploy).
5. **Smoke test** on the production URL: scenarios load → run a chat exchange
   (adversary + coach + hint) → Save & Exit → session review renders → dashboard updates.

## Redeploying

- **Backend**: push to `main` — Render auto-deploys. Schema tweaks in `_MIGRATIONS`
  (backend/app/main.py) run idempotently at boot.
- **Frontend**: push to `main` (if git integration is on) or `vercel --prod`.

## Known limitations (free tiers)

- Render free tier sleeps after ~15 min idle; the first request takes 30–60 s to wake.
  The scenarios/dashboard loading states mention this.
- Neon autosuspends compute but resumes in ~1 s; data is never lost.
- LLM endpoints (`/api/adversary/`, `/api/coach/`, `/api/hint/`) add a few seconds of
  Gemini latency on top of any cold start.
