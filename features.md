# EmpowerMe — Feature Overview

EmpowerMe is a leadership simulation platform that helps women in Indian higher education practice navigating institutional bias and workplace power dynamics through AI-driven conversation and coaching.

---

## 1. Role-Based Scenario Selection

Users select their institutional role (Faculty, Staff, Grad Student, UG Student) to filter scenarios relevant to their position. Each scenario exposes a different resistance tactic — criteria shifting, credibility questioning, procedural delay, or deflection — matched to the adversary role and barrier theme stored in the scenario record.

![Role and Scenario Selection](screenshots/scenario-selection.gif)

The featured scenario card and "More Practice Modules" grid are both driven by the same `/api/scenarios/` endpoint. Filtering is entirely client-side: a `ROLE_SCENARIO_MAP` constant maps each role to an allowlist of scenario IDs, and the component derives `featured` and `rest` from a single filtered array.

---

## 2. Adversary Simulation

A Gemini 2.5 Flash model plays an institutional adversary in character throughout the conversation, responding to each user message with realistic, professionally-toned institutional resistance.

![Adversary Simulation](screenshots/adversary-simulation.gif)

The adversary prompt is built fresh on every turn and includes the scenario context, the specific barrier theme (resistance tactic), and the full conversation history. The model is instructed to stay in character, use subtle rather than explicit discrimination, and keep responses to 2-3 sentences. Both the user message and adversary reply are persisted to the `messages` table after each successful turn. If the adversary API call fails, a distinct red-tinted error box appears in the chat thread with a retry button that re-fires the same API call without adding a duplicate user bubble.

---

## 3. In-Session Hint ("Get a Nudge")

After the adversary has responded at least once, users can request a one-sentence tactical nudge without revealing a full suggested reply.

![Get a Nudge](screenshots/hint.gif)

The hint prompt receives the last 6 conversation turns and, optionally, the user's current draft text. The model is instructed to give one warm, specific nudge and not to write the response for the user. This keeps the hint in coaching territory rather than answer-giving territory. The nudge appears as an amber callout above the input box and auto-dismisses on close. If the hint request fails, an error variant of the same callout appears and auto-clears after 4 seconds.

---

## 4. Coach Analysis with RAG and Framework Citations

After any full exchange, users can request structured coaching feedback scored 0-100, with a narrative evaluation, a stronger model response, and citations to specific communication frameworks.

![Coach Analysis](screenshots/coach-feedback.gif)

**RAG retrieval:** The knowledge base contains five hand-authored chunks covering assertive communication, bias and discrimination, power dynamics, negotiation, and credibility management. Each chunk includes theories (with authors and dates), strategies, example responses, and risk notes. At coach request time, the query (`scenario title + barrier theme + adversary message + user message`) is embedded with `gemini-embedding-001` and compared against pre-embedded chunk vectors using cosine similarity. The top 2 chunks by similarity are injected into the coach prompt. Embeddings are cached in memory after the first call to avoid redundant API calls.

**Prompt grounding:** The coach prompt instructs the model to cite the specific framework and author in the `theory_applied` field (e.g., "DESC Script -- Bower & Bower 1976") and to ground the improved response in the retrieved frameworks. The framework theme names surface in the UI as blue pills labelled "Retrieved From Knowledge Base."

**Two-agent pipeline:** The adversary and coach are separate Gemini calls with separate prompts and separate roles. The adversary is instructed to resist; the coach is instructed to evaluate and teach. This separation prevents role bleed and allows independent tuning of each agent's behaviour.

---

## 5. LLM-as-Judge Evaluation

Each coach response is independently evaluated by a second Gemini 2.5 Flash call that scores the coaching output itself on three dimensions: Accuracy (is the score fair?), Actionability (are the suggestions concrete?), and Quality (is the improved response genuinely better?).

![LLM-as-Judge](screenshots/judge-scores.gif)

The judge prompt receives the adversary message, the user's response, the coach feedback, the improved response, and the score, and returns per-dimension scores out of 10 with one-sentence rationales and an overall average. Scores are persisted to 7 nullable columns added to the `coach_feedback` table. Evaluation is lazy: the judge runs on the first `GET /sessions/{id}/detail` request if judge columns are null, then cached in the DB. Subsequent requests return the stored scores. This means the overhead falls on the reviewer path, not the live session path.

---

## 6. Session Detail Page

After completing a session, users can review the full conversation transcript alongside the coach analysis and the LLM-as-Judge scores in one scrollable page.

![Session Detail](screenshots/session-detail.gif)

The page fetches from `/api/sessions/{id}/detail`, which joins the session, scenario, messages, and coach feedback rows in a single query and builds the response in one pass. The judge evaluation is triggered here if not yet run. The page is linked from the Growth Dashboard's recent sessions list and from the "Practice Again" CTA, which pre-fills the scenario parameter on the preview page.

---

## 7. Score Progress Chart on Growth Dashboard

The Growth Dashboard shows a line chart of coach scores over time across completed sessions.

![Score Progress Chart](screenshots/score-chart.gif)

The chart is built with Recharts (`LineChart`, `ResponsiveContainer`) and loaded client-side via `next/dynamic` with `ssr: false` to avoid hydration issues with canvas-based charting. Data comes from the `recent_sessions` array in the `/api/dashboard/` response, filtered to sessions with non-null scores, reversed to chronological order, and mapped to `{ date, score }` points. The chart requires at least 2 data points to render; below that threshold it shows a prompt to complete more sessions.
