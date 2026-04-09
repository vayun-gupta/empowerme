# EmpowerMe Evaluation Benchmark Report

**Date:** April 10, 2026

## Project Context

EmpowerMe is a chat-based simulation platform designed to help women in Indian higher education build leadership and negotiation skills. Users engage in role-play conversations with two AI agents: an **Adversary** that portrays an institutional actor (department head, committee chair, HR director) and simulates realistic forms of systemic bias — criteria shifting, procedural delay, credibility questioning, and credit attribution — and a **Coach** that evaluates the user's response on assertiveness, strategic framing, emotional regulation, evidence use, and clarity, then returns a score, structured feedback, an improved response, and an applicable communication theory. The platform is grounded in research on challenges faced by women faculty in Indian academic institutions.

---

## Evaluation Methodology

### LLM-as-Judge

Rather than relying on human annotation for each test run, this benchmark uses a second LLM call (Gemini 2.5 Flash) to score each endpoint response against defined rubric dimensions. This approach allows the evaluation to be run automatically on every deployment or model change, producing quantitative scores with rationales that are fast, repeatable, and legible.

**Why this matters:** New foundation models are released frequently. A quality gate that can be re-run in minutes ensures that upgrading the underlying model (or changing a prompt) does not silently degrade the simulation's educational value before users encounter it.

### Adversary Dimensions (each scored 1–10)

| Dimension | What it measures |
|---|---|
| **Realism** | Does the response sound like a real institutional actor? Is it plausible, professional, and contextually grounded? |
| **Relevance** | Does it engage with what the user said and apply an appropriate resistance tactic? |
| **Quality** | Is the resistance subtle (never explicit discrimination), does it create meaningful friction, and does it serve the simulation's educational purpose? |

### Coach Dimensions (each scored 1–10)

| Dimension | What it measures |
|---|---|
| **Accuracy** | Is the assessment accurate? Is the score fair given the quality of the user's response? |
| **Actionability** | Are the suggestions concrete and immediately applicable? |
| **Quality** | Is the improved response genuinely better? Does it teach a real communication strategy? |

---

## Adversary Endpoint Results

**Summary: 5/5 passed — avg overall score 9.3/10**

---

### ADV-001 — Evaluation reframing: user asserts concrete KPI output

**Scenario:** 1 (Being Taken Seriously in Decision-Making Meetings)

**User message:**
> I've exceeded every KPI by 20% and led the only project that shipped on time this quarter.

**Adversary response (truncated):**
> Your strong performance metrics are certainly noted and appreciated, Assistant Professor. However, for curriculum change...

| Dimension | Score | Rationale |
|---|---|---|
| Realism | 9/10 | Perfectly captures the tone and language of an institutional actor, acknowledging performance while subtly shifting the criteria and introducing bureaucratic barriers specific to an academic setting. |
| Relevance | 9/10 | Directly engages with the user's performance claim but immediately pivots to institutional resistance by introducing process-oriented criteria and hierarchy not in the user's original statement. |
| Quality | 10/10 | Highly subtle — uses process, strategic alignment, and hierarchy to create significant friction without explicit discrimination, effectively serving the simulation's educational purpose. |

**Overall: 9.3/10**

---

### ADV-002 — Evaluation reframing: user requests specific measurable criteria

**Scenario:** 1 (Being Taken Seriously in Decision-Making Meetings)

**Conversation history:**
- Adversary: *"Leadership roles require strong institutional presence."*
- User: *"Can you define what institutional presence means in measurable terms?"*

**User message:**
> I'd like to understand what specific behaviors you're looking for so I can address them directly.

**Adversary response (truncated):**
> Institutional presence isn't solely about a checklist of behaviors; it's more about the intangible impact and influence...

| Dimension | Score | Rationale |
|---|---|---|
| Realism | 10/10 | Perfectly mimics the evasive, jargon-filled language used by institutional actors to discuss subjective concepts without providing actionable metrics. |
| Relevance | 10/10 | Directly counters the request for specific behaviors by reframing the concept as an intangible, implicitly-recognized quality — a classic institutional resistance tactic. |
| Quality | 10/10 | Highly subtle; generates friction by denying clear guidance and perfectly illustrates how vague institutional expectations can perpetuate bias. |

**Overall: 10.0/10**

---

### ADV-003 — Procedural barriers: user pushes back on delayed budget response

**Scenario:** 3 (Leadership Aspiration Meets Institutional Opacity)

**User message:**
> The budget proposal was submitted three weeks ago and I've had no response. I need a decision by Friday.

**Adversary response (truncated):**
> Thank you for the reminder on your budget proposal. These significant allocations often require a broader strategic revi...

| Dimension | Score | Rationale |
|---|---|---|
| Realism | 9/10 | Employs realistic corporate jargon and professional language to justify delays — a common institutional tactic. |
| Relevance | 9/10 | Directly acknowledges the proposal and urgency, applying a relevant tactic of bureaucratic process delay. |
| Quality | 9/10 | Subtle and procedural; effectively creates friction and indefinitely delays a decision without overt discrimination. |

**Overall: 9.0/10**

---

### ADV-004 — Credibility challenge: user cites market rate data for salary

**Scenario:** 5 (Speaking Up About Gender Bias)

**User message:**
> The market rate for this role is $145,000. Here are three comparable positions at peer institutions.

**Adversary response (truncated):**
> "We appreciate you presenting these figures. However, our university's compensation structure is guided by a specific se...

| Dimension | Score | Rationale |
|---|---|---|
| Realism | 9/10 | Perfectly mirrors the polite but firm deflection used by large institutions when presented with external compensation benchmarks. |
| Relevance | 9/10 | Directly addresses the market rate data by counter-arguing with internal policies and budgetary constraints — a common resistance tactic. |
| Quality | 9/10 | Subtly creates significant friction by dismissing the user's premise with a seemingly neutral justification, without being explicitly discriminatory. |

**Overall: 9.0/10**

---

### ADV-005 — Credit attribution: user reclaims authorship of project

**Scenario:** 4 (Returning from Maternity Leave)

**Conversation history:**
- Adversary: *"Marcus has been doing excellent cross-team coordination this quarter."*

**User message:**
> I led that coordination effort. Marcus was one of several contributors I managed on that project.

**Adversary response (truncated):**
> Of course, we recognize your past contributions to those efforts. The current context often demands a different kind of...

| Dimension | Score | Rationale |
|---|---|---|
| Realism | 9/10 | Uses plausible corporate jargon to acknowledge past contributions while subtly introducing new, vaguely defined criteria (like 'on-site presence') to explain a current decision. |
| Relevance | 9/10 | Directly engages with the user's assertion of past leadership by acknowledging it, then dismisses its relevance for the current context by introducing new requirements. |
| Quality | 9/10 | Highly subtle; avoids explicit discrimination, creates friction by de-emphasizing past achievements in favour of new criteria, and effectively serves the simulation's purpose. |

**Overall: 9.0/10**

---

## Coach Endpoint Results

**Summary: 5/5 completed — 4/5 scores in expected range — avg judge score 7.5/10**

---

### COACH-001 — Strong assertive response with concrete evidence

**Scenario:** 1 | **Expected score range:** 75–95

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> I appreciate the feedback. I've led three cross-departmental initiatives this year, each involving stakeholders from five or more departments. If presence means relationship-building and institutional influence, I have documented evidence of both. I'd welcome the opportunity to walk through the specifics.

| | |
|---|---|
| **Coach score** | 92/100 ✓ |
| **Theory applied** | Strategic Framing |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | Accurately praises the user's strong, evidence-based reframing and strategic re-engagement, aligning with the high score given. |
| Actionability | 8/10 | The improved response offers concrete, immediately applicable wording that strengthens the link between the user's experience and their actual proposal. |
| Quality | 9/10 | Subtly enhances the original by explicitly linking experience and additional data (student feedback) directly to the proposed restructuring, teaching a powerful re-engagement strategy. |

**Judge overall: 8.7/10**

---

### COACH-002 — Weak capitulating response

**Scenario:** 1 | **Expected score range:** 20–40

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> Oh, I understand. I'll work harder on being more visible. Thank you for the feedback.

| | |
|---|---|
| **Coach score** | 20/100 ✓ |
| **Theory applied** | Reframing |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | Accurately identifies the user's strategic misstep of accepting vague criticism; low score is justified for a response that completely cedes ground. |
| Actionability | 10/10 | Clearly explains what went wrong and provides a concrete improved response demonstrating a direct, immediately applicable communication strategy. |
| Quality | 10/10 | The improved response is genuinely superior, teaching the strategy of acknowledging feedback while reasserting value and redirecting to tangible contributions. |

**Judge overall: 9.7/10**

---

### COACH-003 — Confrontational but unstrategic response

**Scenario:** 1 | **Expected score range:** 30–55

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> That's a moving goalpost and you know it. I'm being penalized for things that have nothing to do with performance. This is discrimination.

| | |
|---|---|
| **Coach score** | 30/100 ✓ |
| **Theory applied** | Reframing |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | Accurately highlights the risks of the confrontational response; score fairly reflects its strategic ineffectiveness in a professional setting. |
| Actionability | 9/10 | Clearly explains the pitfalls of the original and provides a concrete, adaptable example of how to reframe the conversation constructively. |
| Quality | 9/10 | Models a sophisticated strategy that acknowledges the adversary's point while pivoting to concrete evidence of value, effectively de-escalating and reframing. |

**Judge overall: 9.0/10**

---

### COACH-004 — Good but incomplete: requests timeline, lacks stakes framing ⚠️

**Scenario:** 3 | **Expected score range:** 55–75

**Adversary message:**
> The committee needs more time to review the budget allocations holistically.

**User message:**
> I've been waiting three weeks. I need a clear timeline — can we set a date for the committee to respond?

| | |
|---|---|
| **Coach score** | 76/100 ✗ (1 point outside range) |
| **Theory applied** | Strategic Framing and Call to Action |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 2/10 | The coaching fundamentally misunderstands the original scenario — the suggested improved response shifts from budget allocations to a HoD position entirely. |
| Actionability | 2/10 | The suggested improved response is completely off-topic, rendering the advice useless for the user's actual situation. |
| Quality | 1/10 | Despite incorporating valid general communication strategies, the improved response fails catastrophically by addressing a different scenario, undermining any teaching value. |

**Judge overall: 1.7/10**

> **Note — eval framework catching a real hallucination:** COACH-004 is the one failure in this run. The coach scored the user's response 76 (just 1 point outside the expected 55–75 range), but the LLM judge correctly identified that the coach's *improved response* addressed the wrong scenario entirely — it substituted a HoD appointment discussion for the budget allocation scenario that was actually presented. The judge's 1.7/10 quality score flags this as a meaningful failure, not a minor drift. This is the eval framework functioning correctly as a quality gate: the score deviation alone (76 vs. max 75) would have been easy to dismiss; the judge's reasoning reveals a real contextual hallucination in the coach output.

---

### COACH-005 — Excellent salary negotiation with data and path forward

**Scenario:** 5 | **Expected score range:** 80–100

**Adversary message:**
> We value your contributions, but the salary you've proposed is above our typical band for this level.

**User message:**
> I understand the concern about the band. Based on my research, the market rate for this role with my qualifications is $145,000, supported by CUPA-HR data and three comparable offers I've received. I'd like to understand if there's flexibility, and if not, what the path to reclassification looks like.

| | |
|---|---|
| **Coach score** | 96/100 ✓ |
| **Theory applied** | Principled Negotiation |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | Accurately recognizes the user's highly effective, data-driven response; high score is well-justified. |
| Actionability | 8/10 | Provides concrete, subtle refinements such as an appreciative opening and more proactive phrasing for solutions. |
| Quality | 8/10 | Genuinely enhances the original by framing value with a more collaborative and appreciative tone — a valuable communication strategy. |

**Judge overall: 8.3/10**

---

## Known Gaps and Next Steps

### 1. COACH-004 Hallucination — Improved Response Addressed Wrong Scenario
The coach's `improved_response` field substituted a Head of Department appointment discussion for the budget allocation scenario. Root cause is likely context window sensitivity when multiple scenarios share similar language. Mitigation: add scenario ID and title explicitly to the coach prompt; add an eval assertion that checks whether key terms from the scenario appear in the improved response.

### 2. Coach Feedback Not Persisted to DB
The `strengths` and `areas_for_improvement` arrays returned in the coach response are never written to the database. If they were, they would create a multi-valued dependency on `feedback_id` — violating 2NF/3NF. The correct fix is a `coach_feedback_attributes` junction table with columns `(feedback_id, attribute_type ENUM('strength','improvement'), value TEXT)`. Deferred to a future sprint once the feedback history feature is scoped.

### 3. Authentication Deferred (MVP Scope)
All endpoints use `user_id=1` hardcoded. The `UserDB` table exists and all FK columns are in place — the schema is auth-ready. Adding JWT-based auth is a one-sprint addition when the MVP phase is complete.

### 4. `SCENARIO_ID` Hardcoded in `ChatBox.tsx`
The frontend passes a fixed scenario ID. The correct fix is to read it from the URL via `useSearchParams()` (Next.js) so that each scenario routes to the correct simulation. Tracked for the next frontend sprint.

### 5. Theory Grounding for Coach
The coach currently names communication theories ad hoc. A literature-backed mapping is in progress with 4 candidate frameworks identified:

| Theory | Application |
|---|---|
| Role Congruity Theory | Explains credibility challenges faced by women in authority roles |
| Expectation States Theory | Frames status-based dismissal in group settings |
| Nonviolent Communication | Structures assertive, de-escalatory responses |
| Impression Management | Guides strategic self-presentation in evaluation contexts |

Next step: map each of the 5 scenarios to 1–2 primary theories and hardcode the expected `theory_applied` values in test cases for stricter coach evaluation.

---

## Full Raw Results

```
============================================================
ADVERSARY ENDPOINT EVALUATION
============================================================

[ADV-001] Evaluation reframing — user asserts concrete KPI output
  Response: Your strong performance metrics are certainly noted and appreciated, Assistant Professor. However, for curriculum change...
  Realism:   9/10 — The response perfectly captures the tone and language of an institutional actor, acknowledging performance while subtly shifting the criteria and introducing bureaucratic barriers specific to an academic setting.
  Relevance: 9/10 — It directly engages with the user's performance claim but immediately pivots to an institutional resistance tactic by introducing new, process-oriented criteria and hierarchy that weren't part of the user's original statement.
  Quality:   10/10 — The resistance is highly subtle, using process, strategic alignment, and hierarchy to create significant friction without explicit discrimination, effectively serving the simulation's educational purpose.
  OVERALL:   9.3/10

[ADV-002] Evaluation reframing — user requests specific measurable criteria
  Response: Institutional presence isn't solely about a checklist of behaviors; it's more about the intangible impact and influence ...
  Realism:   10/10 — The response perfectly mimics the evasive, jargon-filled language often used by institutional actors to discuss subjective concepts like 'presence' without providing actionable metrics.
  Relevance: 10/10 — The response directly counters the user's request for specific behaviors by reframing the concept as an intangible and implicitly recognized quality, a common institutional resistance tactic.
  Quality:   10/10 — The response is highly subtle, effectively generating friction by denying clear guidance, and perfectly serves the simulation's purpose of illustrating how vague institutional expectations can perpetuate bias.
  OVERALL:   10.0/10

[ADV-003] Procedural barriers — user pushes back on delayed budget response
  Response: Thank you for the reminder on your budget proposal. These significant allocations often require a broader strategic revi...
  Realism:   9/10 — The response employs realistic corporate jargon and professional language to justify delays, which is a common institutional tactic.
  Relevance: 9/10 — It directly acknowledges the budget proposal and the user's urgency, applying a relevant institutional tactic of delaying by bureaucratic process.
  Quality:   9/10 — The resistance is subtle and procedural, effectively creating friction and indefinitely delaying a decision without any overt discrimination.
  OVERALL:   9.0/10

[ADV-004] Credibility challenge — user cites market rate data for salary
  Response: "We appreciate you presenting these figures. However, our university's compensation structure is guided by a specific se...
  Realism:   9/10 — The response perfectly mirrors the polite but firm deflection often used by large institutions, particularly universities, when presented with external compensation benchmarks.
  Relevance: 9/10 — The response directly addresses the user's market rate data by counter-arguing with an appeal to internal policies and budgetary constraints, a common institutional resistance tactic.
  Quality:   9/10 — It subtly creates significant friction by dismissing the user's premise with a seemingly neutral justification, providing a realistic challenge without being explicitly discriminatory.
  OVERALL:   9.0/10

[ADV-005] Credit attribution — user reclaims authorship of project
  Response: Of course, we recognize your past contributions to those efforts. The current context often demands a different kind of ...
  Realism:   9/10 — The response uses plausible corporate jargon to acknowledge past contributions while subtly introducing new, vaguely defined criteria (like 'on-site presence') to explain a current decision, which is very common in institutional communication.
  Relevance: 9/10 — It directly engages with the user's assertion of past leadership by acknowledging it, then effectively dismisses its relevance for the current context by introducing new, paramount requirements.
  Quality:   9/10 — The resistance is highly subtle, avoids explicit discrimination, creates significant friction by de-emphasizing past achievements for new criteria, and effectively serves the simulation's purpose of identifying nuanced bias.
  OVERALL:   9.0/10

  Adversary avg overall score: 9.3/10  (5/5 passed)

============================================================
COACH ENDPOINT EVALUATION
============================================================

[COACH-001] Strong assertive response with concrete evidence — should score 75-95
  Coach score: 92/100  (expected 75-95) ✓
  Theory: Strategic Framing
  Accuracy:      9/10 — The coach's assessment accurately praises the user's strong, evidence-based reframing and strategic re-engagement, aligning with the high score given.
  Actionability: 8/10 — The improved response offers concrete, immediately applicable wording that strengthens the link between the user's experience and their actual proposal.
  Quality:       9/10 — The improved response subtly enhances the user's original by explicitly linking their experience and additional data (student feedback) directly to their proposed restructuring, teaching a powerful strategy for re-engagement.
  OVERALL:       8.7/10

[COACH-002] Weak capitulating response — should score 20-40
  Coach score: 20/100  (expected 20-40) ✓
  Theory: Reframing
  Accuracy:      9/10 — The assessment accurately identifies the user's strategic misstep of accepting vague criticism and a low score is justified for a response that completely cedes ground.
  Actionability: 10/10 — The feedback clearly explains what went wrong and provides a concrete improved response that demonstrates a direct, immediately applicable communication strategy.
  Quality:       10/10 — The improved response is genuinely superior, teaching a crucial strategy of acknowledging feedback while subtly reasserting one's value and redirecting the conversation back to tangible contributions.
  OVERALL:       9.7/10

[COACH-003] Confrontational but unstrategic response — should score 30-55
  Coach score: 30/100  (expected 30-55) ✓
  Theory: Reframing
  Accuracy:      9/10 — The assessment accurately highlights the risks of the user's confrontational response and the score fairly reflects its strategic ineffectiveness in a professional setting.
  Actionability: 9/10 — The feedback clearly explains the pitfalls of the original response and provides a concrete, adaptable example of how to reframe the conversation constructively.
  Quality:       9/10 — The improved response models a sophisticated communication strategy that acknowledges the adversary's point while pivoting to concrete evidence of one's value, effectively de-escalating and reframing the discussion.
  OVERALL:       9.0/10

[COACH-004] Good but incomplete — requests timeline but lacks stakes framing — should score 55-75
  Coach score: 76/100  (expected 55-75) ✗ OUT OF RANGE
  Theory: Strategic Framing and Call to Action
  Accuracy:      2/10 — The coaching fundamentally misunderstands the original scenario, as evidenced by the suggested improved response shifting from 'budget allocations' to a 'HoD position'.
  Actionability: 2/10 — The suggested improved response is completely off-topic, rendering the advice and its implementation useless for the user's actual situation regarding budget allocations.
  Quality:       1/10 — Despite incorporating valid general communication strategies, the improved response fails catastrophically by addressing a completely different scenario than the one presented, undermining any teaching value.
  OVERALL:       1.7/10

[COACH-005] Excellent salary negotiation with data and path forward — should score 80-100
  Coach score: 96/100  (expected 80-100) ✓
  Theory: Principled Negotiation
  Accuracy:      9/10 — The coach accurately recognizes the user's highly effective and data-driven response, and the high score is well-justified given its quality.
  Actionability: 8/10 — The improved response provides concrete, albeit subtle, actionable refinements such as adding an appreciative opening and slightly more proactive phrasing for solutions.
  Quality:       8/10 — The improved response genuinely enhances the original by demonstrating how to frame value with a more collaborative and appreciative tone, which is a valuable communication strategy.
  OVERALL:       8.3/10

  Coach avg overall score: 7.5/10  (5/5 passed)
  Scores in expected range: 4/5

============================================================
BENCHMARK COMPLETE  |  Adversary: 5/5  |  Coach: 5/5
```
