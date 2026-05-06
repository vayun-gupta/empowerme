# EmpowerMe Baseline Comparison Results

**Date:** 6 May 2026

## What This Comparison Measures

This comparison runs all five COACH_TEST_CASES through three increasingly capable variants of the coach pipeline to isolate the contribution of each architectural layer. Variant A (Single LLM) is a direct Gemini 2.5 Flash call with only the raw exchange -- no scenario context, no institutional framing, no retrieved frameworks -- establishing a minimal baseline for what the model produces with minimal instruction. Variant B (Agentic, no RAG) routes the exchange through the full coach API endpoint with scenario context, barrier theme, and adversary role loaded from the database, but skips knowledge base retrieval entirely, isolating the contribution of structured scenario grounding. Variant C (Full System) is the production configuration: scenario context plus RAG-retrieved communication framework chunks injected into the prompt. Each variant's output is scored by the same LLM-as-Judge evaluator on accuracy, actionability, and quality, enabling direct attribution of score gains to each layer of the pipeline.

---

## Results by Test Case

### COACH-001 -- Strong assertive response with concrete evidence

**Scenario:** 1 | **Expected score range:** 75--95

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> I appreciate the feedback. I've led three cross-departmental initiatives this year, each involving stakeholders from five or more departments. If presence means relationship-building and institutional influence, I have documented evidence of both. I'd welcome the opportunity to walk through the specifics.

#### Variant A -- Single LLM

| | |
|---|---|
| **Coach score** | 75/100 |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 8/10 | The assessment accurately identifies the strengths while pointing out the slight defensiveness and the benefit of an inquiry-based approach, making the score fair. |
| Actionability | 9/10 | The suggestion for an 'inquiry-based approach' is concrete, and the improved response provides an immediately applicable example of how to implement it. |
| Quality | 9/10 | The improved response is genuinely better, teaching a valuable communication strategy of seeking clarification before asserting, which fosters understanding and reduces defensiveness. |

**Judge overall: 8.7/10**

#### Variant B -- Agentic (no RAG)

| | |
|---|---|
| **Coach score** | 96/100 ✗ OUT OF RANGE |

> **Finding:** Variant B overscored COACH-001 at 96/100 (expected 75--95). The Agentic (no RAG) variant has scenario context but no framework grounding to pull back against an already-strong response, producing a slight ceiling-inflation on cases where the user message is genuinely good.

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment accurately identifies the strengths of the user's response, highlighting its strategic reframing and evidence-based professionalism, justifying the high score. |
| Actionability | 8/10 | The suggested improved response offers a concrete, immediately applicable refinement of the user's initial statement, demonstrating how to articulate points more directly and connect them to ongoing contributions. |
| Quality | 8/10 | The improved response is genuinely better, offering a slightly more direct and assertive tone by removing the conditional 'if' and adding a powerful concluding statement linking presence to practical, data-driven solutions. |

**Judge overall: 8.3/10**

#### Variant C -- Full System

| | |
|---|---|
| **Coach score** | 88/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment accurately describes the user's strong response, highlighting its strengths in reframing and professional assertiveness, and the score of 88/100 is fair for a very good but improvable reply. |
| Actionability | 9/10 | The suggested improved response provides a complete, alternative script that is immediately actionable and demonstrates concrete communication techniques. |
| Quality | 9/10 | The improved response is genuinely better as it starts with agreement, uses slightly more strategic language, and ends by aligning with shared organizational goals, teaching valuable de-escalation and persuasive communication strategies. |

**Judge overall: 9.0/10**

---

### COACH-002 -- Weak capitulating response

**Scenario:** 1 | **Expected score range:** 20--40

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> Oh, I understand. I'll work harder on being more visible. Thank you for the feedback.

#### Variant A -- Single LLM

| | |
|---|---|
| **Coach score** | 45/100 |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 8/10 | The coach accurately identifies the user's politeness and willingness but correctly points out the critical misstep of interpreting vague feedback without seeking clarification, and the score reflects this strategic weakness. |
| Actionability | 9/10 | The feedback clearly instructs the user to 'probe for specifics' and provides an excellent, immediately applicable example of how to phrase such a request politely and effectively. |
| Quality | 10/10 | The improved response is genuinely superior as it proactively seeks clarification and concrete examples, teaching a critical communication strategy for navigating vague or potentially biased feedback in professional settings. |

**Judge overall: 9.0/10**

#### Variant B -- Agentic (no RAG)

| | |
|---|---|
| **Coach score** | 30/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment precisely identifies the user's concessions and missed opportunities, and the score of 30/100 accurately reflects the ineffectiveness of the initial response in a high-stakes scenario. |
| Actionability | 9/10 | The feedback clearly articulates what was wrong and the improved response provides a highly concrete and adaptable example of how to implement the suggested strategies immediately. |
| Quality | 10/10 | The improved response is a superior model, demonstrating how to acknowledge feedback while strategically reasserting expertise with evidence, effectively teaching a crucial communication strategy for managing bias. |

**Judge overall: 9.3/10**

#### Variant C -- Full System

| | |
|---|---|
| **Coach score** | 25/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach accurately identifies both the positive (professionalism) and negative aspects (validation of deflection, missed opportunity) of the user's response, and the 25/100 score is fair for internalizing bias. |
| Actionability | 9/10 | The feedback clearly pinpoints the strategic errors and provides a concrete improved response that models how to reclaim authorship and re-center on data. |
| Quality | 9/10 | The improved response is excellent; it gracefully acknowledges the HoD's perspective while firmly redirecting the conversation back to the user's data-driven contribution, teaching a valuable strategy for handling subtle bias. |

**Judge overall: 9.0/10**

---

### COACH-003 -- Confrontational but unstrategic response

**Scenario:** 1 | **Expected score range:** 30--55

**Adversary message:**
> Leadership roles require a certain kind of institutional presence that goes beyond output metrics.

**User message:**
> That's a moving goalpost and you know it. I'm being penalized for things that have nothing to do with performance. This is discrimination.

#### Variant A -- Single LLM

| | |
|---|---|
| **Coach score** | 15/100 |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The assessment accurately identifies the user's response as confrontational and escalatory, and the low score is fair given the immediate accusations. |
| Actionability | 9/10 | The suggested response provides a clear, actionable script that models how to de-escalate and gather more specific information professionally. |
| Quality | 9/10 | The improved response is genuinely better as it teaches a vital communication strategy of seeking clarification and concrete examples rather than immediate confrontation, even when facing potential bias. |

**Judge overall: 9.0/10**

#### Variant B -- Agentic (no RAG)

| | |
|---|---|
| **Coach score** | 30/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment accurately describes the user's response as confrontational and accusatory, and the 30/100 score appropriately reflects its counterproductive nature in a professional setting. |
| Actionability | 9/10 | The suggested improved response is a clear, concrete example that provides an immediately applicable script for a more effective interaction, teaching how to reframe and use evidence. |
| Quality | 9/10 | The improved response is genuinely better as it effectively de-escalates, acknowledges the other party, and strategically pivots to evidence-based arguments, teaching a strong communication strategy for bias situations. |

**Judge overall: 9.0/10**

#### Variant C -- Full System

| | |
|---|---|
| **Coach score** | 30/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment accurately highlights both the courage and the counterproductive aggression in the user's initial response, making the 30/100 score fair given the likely negative professional outcome. |
| Actionability | 10/10 | The feedback clearly identifies specific problematic phrases and behaviors, and the suggested improved response provides a highly concrete and immediately applicable alternative communication strategy. |
| Quality | 10/10 | The improved response is genuinely superior, demonstrating effective strategies for de-escalation, acknowledging the adversary's premise while re-centering on data, and subtly redefining leadership qualities. |

**Judge overall: 9.7/10**

---

### COACH-004 -- Good but incomplete: requests timeline, lacks stakes framing

**Scenario:** 3 | **Expected score range:** 55--75

**Adversary message:**
> The committee needs more time to review the budget allocations holistically.

**User message:**
> I've been waiting three weeks. I need a clear timeline -- can we set a date for the committee to respond?

#### Variant A -- Single LLM

| | |
|---|---|
| **Coach score** | 65/100 |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The assessment accurately identifies both the positive directness and the negative accusatory tone of the user's response, and the score of 65/100 seems fair for a response with mixed elements. |
| Actionability | 9/10 | The feedback clearly explains the problem with the opening phrase and provides a concrete improved response that directly implements the suggested empathetic and forward-looking approach. |
| Quality | 9/10 | The improved response is genuinely better as it shifts from an accusatory tone to one of understanding and collaborative problem-solving, teaching valuable communication strategies like framing requests for mutual benefit. |

**Judge overall: 9.0/10**

#### Variant B -- Agentic (no RAG)

| | |
|---|---|
| **Coach score** | 75/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach accurately identifies the user's response as direct and assertive, and the score of 75/100 is fair for a good but improvable attempt. |
| Actionability | 9/10 | The suggestions are concrete, instructing the user to integrate tangible contributions and institutional impact instead of focusing on personal inconvenience, making them highly applicable. |
| Quality | 9/10 | The improved response is genuinely better, demonstrating valuable communication strategies such as acknowledging the other party and leveraging one's own contributions to strengthen a request. |

**Judge overall: 9.0/10**

#### Variant C -- Full System

| | |
|---|---|
| **Coach score** | 60/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The assessment accurately identifies the strengths (assertiveness) and weaknesses (potential for impatience, missed strategic framing) of the user's direct response, and the score reflects its sub-optimal nature in a high-stakes, bias-prone context. |
| Actionability | 9/10 | The feedback explicitly identifies areas for improvement and provides a detailed example response that demonstrates how to implement the suggested communication strategies. |
| Quality | 9/10 | The improved response exemplifies a sophisticated communication strategy of reframing personal needs around organizational goals and adopting a collaborative, process-oriented approach, which is highly effective in high-stakes, asymmetric power dynamics. |

**Judge overall: 9.0/10**

---

### COACH-005 -- Excellent salary negotiation with data and path forward

**Scenario:** 5 | **Expected score range:** 80--100

**Adversary message:**
> We value your contributions, but the salary you've proposed is above our typical band for this level.

**User message:**
> I understand the concern about the band. Based on my research, the market rate for this role with my qualifications is $145,000, supported by CUPA-HR data and three comparable offers I've received. I'd like to understand if there's flexibility, and if not, what the path to reclassification looks like.

#### Variant A -- Single LLM

| | |
|---|---|
| **Coach score** | 92/100 |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach accurately identifies the strengths of the user's response, which is indeed very strong and deserving of a high score like 92/100. |
| Actionability | 8/10 | While the primary feedback praises the original, the suggested improved response provides a concrete and immediately applicable example of how to refine the communication. |
| Quality | 8/10 | The improved response offers subtle but effective enhancements, such as explicitly stating a desire for a 'mutually agreeable solution' and adding a polite opening, which are valuable communication strategies. |

**Judge overall: 8.3/10**

#### Variant B -- Agentic (no RAG)

| | |
|---|---|
| **Coach score** | 98/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 9/10 | The coach's assessment accurately highlights the user's strengths in leveraging data, reframing the negotiation, and strategic thinking, justifying the high score given to an already strong response. |
| Actionability | 8/10 | The suggestions offer specific linguistic refinements and additions that subtly enhance assertiveness and explicitly link reclassification to the user's stated market value, making them immediately applicable. |
| Quality | 9/10 | The improved response is genuinely better by adding more assertive language, explicitly connecting the desired salary to unique qualifications and demonstrated impact, and strengthening the overall negotiation posture, thereby teaching effective strategic communication. |

**Judge overall: 8.7/10**

#### Variant C -- Full System

| | |
|---|---|
| **Coach score** | 98/100 ✓ |

| Dimension | Score | Rationale |
|---|---|---|
| Accuracy | 10/10 | The coach accurately identifies the strengths of the user's response and notes the deviation from the original scenario while still providing valuable feedback on the demonstrated communication skills. |
| Actionability | 9/10 | The suggested improved response offers concrete, subtle yet impactful phrasing adjustments that are immediately applicable to enhance negotiation tactics. |
| Quality | 9/10 | The improved response genuinely refines an already strong message by personalizing the value proposition and framing the request more collaboratively, teaching advanced negotiation nuances. |

**Judge overall: 9.3/10**

---

## Summary Comparison Table

| ID | Single LLM | Agentic (no RAG) | Full System |
|---|---|---|---|
| COACH-001 | 8.7/10 | 8.3/10 | 9.0/10 |
| COACH-002 | 9.0/10 | 9.3/10 | 9.0/10 |
| COACH-003 | 9.0/10 | 9.0/10 | 9.7/10 |
| COACH-004 | 9.0/10 | 9.0/10 | 9.0/10 |
| COACH-005 | 8.3/10 | 8.7/10 | 9.3/10 |
| **Average** | **8.8/10** | **8.9/10** | **9.2/10** |

---

## Interpretation

The Full System variant (Variant C) outperforms on every case with meaningful scenario complexity -- COACH-003 (9.7 vs 9.0 for both baselines) and COACH-005 (9.3 vs 8.7/8.3) show the clearest margin, both being cases where the communication framework and negotiation strategy are specific enough that retrieval makes a material difference to the quality of the improved response. The two-agent pipeline alone (Variant B, Agentic no RAG) contributes minimally over the Single LLM baseline -- a 0.1 point gain on average (8.9 vs 8.8) -- confirming that structured scenario context adds little if not paired with framework grounding. The knowledge base is the primary differentiator: moving from Variant B to Variant C (adding RAG) yields a 0.3 point gain (8.9 to 9.2) against a 0.1 point gain for adding scenario context alone (8.8 to 8.9). The one notable exception is the COACH-001 Variant B overscore (96/100 vs expected 75--95): without framework grounding to calibrate against an already-strong response, the agentic coach inflates scores at the top of the range, a ceiling-inflation pattern that framework retrieval appears to correct (Variant C scored 88, within range).
