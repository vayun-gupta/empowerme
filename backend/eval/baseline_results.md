# EmpowerMe Baseline Comparison Results

**Date:** 2026-05-06

## What This Comparison Measures

This comparison runs all five COACH_TEST_CASES through three increasingly capable variants of the coach pipeline to isolate the contribution of each architectural layer. Variant A (Single LLM) is a direct Gemini 2.5 Flash call with only the raw exchange -- no scenario context, no institutional framing, no retrieved frameworks -- establishing a minimal baseline for what the model can produce with minimal instruction. Variant B (Agentic, no RAG) routes the exchange through the full coach API endpoint with scenario context, barrier theme, and adversary role loaded from the database, but skips knowledge base retrieval entirely, isolating the contribution of structured scenario grounding. Variant C (Full System) is the production configuration: scenario context plus RAG-retrieved communication framework chunks injected into the prompt. Each variant's output is scored by the same LLM-as-Judge evaluator on accuracy, actionability, and quality, enabling direct attribution of score gains to each layer of the pipeline.

---

## Results by Test Case

### COACH-001 -- Strong assertive response with concrete evidence — should score 75-95

**Expected score range:** 75--95

#### Variant A -- Single LLM

- **Coach score:** 85/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your original response is strong, effectively using specific examples and a proactive offer for further discussion. However, the phrasing 'If presence means...' could inadvertently be perceived as slightly defensive or argumentative, rather than fully owning your interpretation and demonstrating alignment. A stronger approach clarifies your understanding of the term while directly showcasing your contributions.
- **Improved response:** Thank you for that feedback. My understanding of 'institutional presence' for a leader involves actively building critical relationships and driving influence across the organization, which extends well beyond individual output. This year, I've led three cross-departmental initiatives, each involving stakeholders from five or more departments, with clear strategic impact. I'd welcome the opportunity to discuss these further and understand specific areas where you believe I can continue to strengthen my institutional presence.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the subtle defensive tone of 'If presence means...' while acknowledging the overall strength of the user's initial response, making the score of 85 fair.
- **Judge -- Actionability:** 10/10 -- The feedback is highly actionable, providing a clear explanation of the issue, a strategic alternative, and a concrete example of the improved phrasing.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better as it proactively defines the vague term, avoids defensiveness, and maintains a receptive, growth-oriented posture, teaching critical communication strategies.
- **Judge -- Overall:** 9.7/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 92/100 (in range)
- **Theory applied:** Strategic Self-Presentation — Goffman 1959
- **Feedback:** Your response is highly effective, demonstrating exceptional strategic communication. You adeptly redefined 'institutional presence' in concrete, measurable terms, providing compelling evidence of your leadership without resorting to aggression. This approach successfully reframes the narrative and establishes your credibility.
- **Improved response:** Thank you for that insight. My leadership on three cross-departmental initiatives this year, engaging stakeholders across five or more departments, demonstrates a robust institutional presence built on influence and collaboration. This experience directly informs the data-driven proposals I bring, and I welcome further discussion on their potential impact.
- **Judge -- Accuracy:** 9/10 -- The coach's assessment is accurate, correctly identifying the strengths of the user's response, and the 92/100 score is fair for an already strong reply.
- **Judge -- Actionability:** 9/10 -- The suggested improvement is concrete and immediately applicable, offering subtle yet impactful refinements that enhance the original excellent response.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better, demonstrating key communication strategies like assertive redefinition and connecting past achievements to future impact.
- **Judge -- Overall:** 9.3/10

#### Variant C -- Full System

- **Coach score:** 88/100 (in range)
- **Theory applied:** Credibility and Impression Management — Fiske, Cuddy & Glick Stereotype Content Model
- **Feedback:** Your response effectively leveraged concrete achievements to challenge a vague accusation, demonstrating strong competence and professionalism. You strategically reframed 'institutional presence' in a way that highlighted your strengths, but a slightly more explicit connection to shared institutional goals could further enhance perceived warmth and collaborative intent.
- **Improved response:** I appreciate the feedback on what constitutes effective leadership presence, which is vital for our institutional success. I interpret 'presence' as the ability to build critical relationships and drive cross-functional initiatives. Having led three successful cross-departmental projects this year involving numerous stakeholders, I've demonstrated exactly that, and I'd be happy to share the specifics of their impact.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identified the user's strengths in leveraging achievements and reframing, while pinpointing a subtle but valid area for improvement, making the 88/100 score fair.
- **Judge -- Actionability:** 9/10 -- The suggestion to 'explicitly connect to shared institutional goals' is concrete and immediately applicable for enhancing perceived warmth and collaborative intent.
- **Judge -- Quality:** 9/10 -- The improved response genuinely enhances the original by clearly incorporating the shared institutional goals upfront, making it more collaborative while maintaining its assertiveness and teaching a valuable framing strategy.
- **Judge -- Overall:** 9.0/10

### COACH-002 -- Weak capitulating response — should score 20-40

**Expected score range:** 20--40

#### Variant A -- Single LLM

- **Coach score:** 35/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your current response is polite but misses a critical opportunity for clarity. By assuming 'institutional presence' means 'visibility' without further inquiry, you risk misinterpreting the feedback and dedicating effort to the wrong areas. Stronger responses engage with vague feedback by asking clarifying questions to ensure mutual understanding and actionable next steps.
- **Improved response:** Thank you for this valuable feedback. I want to make sure I understand 'institutional presence' clearly to focus my efforts effectively. Could you provide some examples of what that looks like in practice, or perhaps point to specific behaviors that contribute to it here?
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the user's error in assuming meaning and missing a critical opportunity for clarification, and the score reflects this strategic misstep.
- **Judge -- Actionability:** 10/10 -- The feedback explicitly advises asking clarifying questions and provides a highly specific, ready-to-use improved response demonstrating this strategy.
- **Judge -- Quality:** 10/10 -- The improved response offers a genuinely superior approach, teaching the crucial professional strategy of clarifying vague feedback to ensure understanding and prevent misdirection.
- **Judge -- Overall:** 9.7/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 35/100 (in range)
- **Theory applied:** DESC Script — Bower & Bower 1976
- **Feedback:** Your response maintained excellent emotional regulation, which is a significant strength in high-stakes situations. However, it inadvertently conceded ground by accepting the premise that your contribution lacked 'institutional presence,' missing an opportunity to strategically reframe your data-driven work as a form of proactive leadership and assert authorship.
- **Improved response:** Thank you for that perspective. My intention in presenting the data-driven proposal, developed from extensive student feedback, was precisely to demonstrate a proactive and evidence-based institutional presence in curriculum innovation. I believe these specific insights are vital for our department's future offerings, and I'd like to ensure they are formally incorporated into the discussion.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the user's strength (emotional regulation) while critically pinpointing the major flaw of conceding ground and missing the chance to reframe, and the 35/100 score appropriately reflects this poor outcome.
- **Judge -- Actionability:** 9/10 -- The feedback clearly articulates the necessary strategic shift ('reframe... assert authorship') and provides an exemplary improved response that immediately demonstrates how to apply this strategy.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely superior, effectively reframing the biased criticism with evidence, asserting authorship, and guiding the conversation toward concrete next steps, teaching a critical communication strategy.
- **Judge -- Overall:** 9.3/10

#### Variant C -- Full System

**ERROR:** HTTPConnectionPool(host='localhost', port=8000): Read timed out. (read timeout=30)


### COACH-003 -- Confrontational but unstrategic response — should score 30-55

**Expected score range:** 30--55

#### Variant A -- Single LLM

- **Coach score:** 25/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your response is highly confrontational and escalates the conversation prematurely. While your frustration with 'moving goalposts' is understandable, accusing someone of 'discrimination' without clear evidence and in an informal discussion can shut down dialogue, make the other party defensive, and complicate resolution. It's more effective to seek clarification and maintain a professional tone.
- **Improved response:** I appreciate you bringing up the importance of 'institutional presence.' Could you please elaborate on what specific behaviors or contributions define this quality within our organization, and how it aligns with the previously established performance expectations for leadership roles? I'd like to understand how I can effectively demonstrate growth in this area.
- **Judge -- Accuracy:** 9/10 -- The coach's assessment of the user's confrontational response is accurate, and the low score of 25/100 for that response is fair given its counterproductive nature.
- **Judge -- Actionability:** 10/10 -- The feedback clearly identifies the problem and provides a concrete, immediately applicable improved response that demonstrates the recommended communication strategy.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better, teaching a vital communication strategy of de-escalation, seeking clarification, and framing inquiry as a desire for growth when facing subjective feedback.
- **Judge -- Overall:** 9.7/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 45/100 (in range)
- **Theory applied:** DESC Script – Bower & Bower (1976)
- **Feedback:** Your response directly confronts the HoD's vague statement and articulates your feeling of being unfairly treated, which shows courage. However, the language is highly accusatory and emotional, which risks escalating the situation rather than re-centering your credibility and idea. Focus on strategic framing and leveraging your data without direct confrontation.
- **Improved response:** I understand the importance of institutional presence, and my comprehensive work on student feedback and the elective restructuring proposal was precisely an effort to enhance our department's academic standing and student experience. I believe these data-driven insights are crucial for making informed curriculum decisions, and I'd like to elaborate on them now, especially given their alignment with the points Professor [Senior Colleague] just raised.
- **Judge -- Accuracy:** 9/10 -- The assessment accurately identifies the pros and cons of the user's original response, and the score of 45/100 is fair given its confrontational and escalating nature.
- **Judge -- Actionability:** 9/10 -- The suggestions to focus on strategic framing and leveraging data without direct confrontation are clear, and the improved response provides a concrete, immediately applicable example.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better, demonstrating effective strategies like acknowledging, reframing, leveraging data, and using social proof to de-escalate and re-center the conversation on performance.
- **Judge -- Overall:** 9.3/10

#### Variant C -- Full System

- **Coach score:** 35/100 (in range)
- **Theory applied:** Role Congruity Theory - Eagly & Karau 2002; DESC Script - Bower & Bower 1976
- **Feedback:** Your response clearly articulated your frustration and identified the systemic issue, but its aggressive tone and direct accusation risked escalating the situation. Focusing on objective contributions and collaborative outcomes, rather than individual character or direct confrontation, would be more effective.
- **Improved response:** I appreciate your point about institutional presence. My understanding is that demonstrating leadership also involves developing well-researched, data-backed proposals, such as the elective restructuring idea I presented earlier. I'm keen to ensure all contributions are evaluated fairly based on their merit and potential impact.
- **Judge -- Accuracy:** 8/10 -- The coach accurately identified both the user's correct identification of a systemic issue and the counterproductive aggressive tone and direct accusation, making the 35/100 score fair.
- **Judge -- Actionability:** 9/10 -- The feedback provides a clear strategic direction to focus on objective contributions and the suggested improved response offers a concrete, immediately applicable example of how to implement this strategy.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better as it effectively reframes the conversation around objective contributions and fair evaluation, demonstrating a sophisticated de-escalation and advocacy strategy.
- **Judge -- Overall:** 9.0/10

### COACH-004 -- Good but incomplete — requests timeline but lacks stakes framing — should score 55-75

**Expected score range:** 55--75

#### Variant A -- Single LLM

- **Coach score:** 68/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your response effectively communicates the need for a timeline and urgency, which is crucial for managing expectations. However, starting with 'I've been waiting three weeks' can sound slightly accusatory, potentially putting the other party on the defensive. A more collaborative and solution-oriented approach would acknowledge their stated need while still firmly requesting a clear resolution.
- **Improved response:** I understand the committee needs time for a holistic review of the budget allocations. Given that this has been pending for three weeks, could we establish a specific target date for their response, or at least a date for an update on their progress?
- **Judge -- Accuracy:** 9/10 -- The assessment accurately identifies both the strength of clarity and the weakness of accusatory tone in the user's response, and the 68/100 score reflects this balance fairly.
- **Judge -- Actionability:** 9/10 -- The feedback provides clear guidance on why the original response is problematic and concrete steps ('acknowledge their stated need,' 'more collaborative') that are directly applied in the suggested improvement.
- **Judge -- Quality:** 9/10 -- The improved response is genuinely better, demonstrating how to lead with empathy, frame facts neutrally, and make a firm request collaboratively, teaching a valuable communication strategy.
- **Judge -- Overall:** 9.0/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 75/100 (in range)
- **Theory applied:** DESC Script — Bower & Bower 1976
- **Feedback:** Your response was assertive and direct in requesting a timeline, effectively pushing back on the current deflection. However, it missed an opportunity to explicitly re-anchor the conversation to the Head of Department role and clarify which 'committee' she was seeking a response from, given the context of an informal selection process.
- **Improved response:** I appreciate the update on budget allocations. My primary focus remains the upcoming Head of Department selection, and I'm keen to understand the timeline and process for formally expressing my interest. Can we schedule a brief meeting next week to discuss the specific next steps for my consideration for this role?
- **Judge -- Accuracy:** 9/10 -- The assessment accurately praises the user's assertiveness while correctly identifying the critical missed opportunity to re-anchor the conversation to the specific, implied context of the Head of Department role, making the 75/100 score fair.
- **Judge -- Actionability:** 10/10 -- The suggestions are highly concrete, explicitly outlining the need to re-anchor the conversation and providing a clear, actionable improved response that can be immediately applied.
- **Judge -- Quality:** 10/10 -- The improved response is significantly better, demonstrating effective strategies such as acknowledging the deflecting information, re-anchoring to the specific goal, and proposing concrete next steps, thereby teaching valuable communication skills.
- **Judge -- Overall:** 9.7/10

#### Variant C -- Full System

- **Coach score:** 60/100 (in range)
- **Theory applied:** Fisher & Ury Principled Negotiation
- **Feedback:** Your response was commendably clear and direct in asking for a timeline, which is vital for pushing past vague deflections. However, framing it around 'I've been waiting three weeks' could inadvertently shift focus to personal impatience rather than the need for transparent institutional processes, allowing the Dean to continue with unanchored responses.
- **Improved response:** I understand the committee's need for a holistic budget review. To effectively plan my contributions and future role, could we schedule a brief meeting next week to clarify the formal process and objective criteria for the HOD selection?
- **Judge -- Accuracy:** 6/10 -- The assessment accurately pinpoints strengths and a potential flaw in the user's response, though the 60/100 score appears slightly harsh for its directness.
- **Judge -- Actionability:** 2/10 -- The suggested improved response entirely shifts the topic from budget allocations to HOD selection, making it unactionable and irrelevant for this specific scenario.
- **Judge -- Quality:** 3/10 -- The improved response is not genuinely better for the scenario because it incorrectly changes the topic, significantly detracting from the quality of the communication strategy being taught.
- **Judge -- Overall:** 3.7/10

### COACH-005 -- Excellent salary negotiation with data and path forward — should score 80-100

**Expected score range:** 80--100

#### Variant A -- Single LLM

- **Coach score:** 80/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your response is strong, effectively using data (market rate, CUPA-HR, comparable offers) to justify your salary and proactively exploring alternative solutions like reclassification. It demonstrates both assertiveness and a willingness to collaborate. For future exchanges, you could slightly enhance the collaborative tone and explicitly link your unique value to the organization's needs.
- **Improved response:** I appreciate you sharing the typical salary band, and I value the recognition of my contributions. My research indicates a market rate of $145,000 for this role with my qualifications, substantiated by CUPA-HR data and three recent comparable offers. Given the specific expertise and value I bring, I'm keen to explore if there's flexibility within the current structure to meet this market rate. If not, I'm eager to understand the process for reclassification or any other pathways that could align my compensation with my market value and the impact I can bring to this role.
- **Judge -- Accuracy:** 8/10 -- The coach accurately identifies the strengths of the user's response regarding data use and proactivity, and the score of 80/100 is fair for a strong but not entirely perfect initial attempt.
- **Judge -- Actionability:** 7/10 -- The suggestions to enhance collaborative tone and explicitly link value are clear, and the improved response effectively models how to apply them.
- **Judge -- Quality:** 9/10 -- The improved response is genuinely better, effectively demonstrating how to integrate a more collaborative tone and explicitly link personal value to organizational impact, thereby teaching a valuable communication strategy.
- **Judge -- Overall:** 8.0/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 97/100 (in range)
- **Theory applied:** DESC Script — Bower & Bower 1976
- **Feedback:** This is an exceptionally strong response. You effectively countered institutional minimization of your value with objective data, maintained a professional demeanor, and strategically opened a dialogue for solutions. Your directness combined with evidence is highly effective in navigating this resistance.
- **Improved response:** I understand the concern about the band. My research, however, firmly establishes the market rate for this role at $145,000, a figure strongly supported by CUPA-HR data and three comparable offers that reflect my qualifications and experience. Can we discuss the flexibility within your budget or, alternatively, the specific path for reclassification?
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the user's strong points, and the high score is well-deserved given the response's effectiveness in countering the adversary's minimization with data and professionalism.
- **Judge -- Actionability:** 7/10 -- While the improved response provides a concrete alternative, the coaching feedback primarily praises the original without offering explicit, actionable steps or principles for how to improve, beyond showing a slightly refined version.
- **Judge -- Quality:** 8/10 -- The suggested improved response offers subtle yet effective refinements, enhancing assertiveness and directness in its phrasing, which are valuable communication strategies for professional negotiation.
- **Judge -- Overall:** 8.0/10

#### Variant C -- Full System

- **Coach score:** 90/100 (in range)
- **Theory applied:** CPR Model — Ashburn-Nardo
- **Feedback:** This improved response effectively counters minimization by re-asserting the factual pattern of bias and reframing the complaint as a necessary step towards genuine departmental harmony and equity. It demonstrates composure and strategic framing, shifting the focus from individual 'dynamics' to systemic issues that require resolution.
- **Improved response:** I appreciate the committee's perspective, yet the documented pattern of exclusion, interruption, and workload disparity clearly constitutes differential treatment consistent with gender bias. Informal avenues proved inadequate for these systemic issues. My intention is to ensure genuine departmental harmony and equity, which necessitates addressing and resolving these biases, not dismissing them as mere dynamics.
- **Judge -- Accuracy:** 1/10 -- The coach's feedback and suggested improved response are completely mismatched to the given scenario and the user's actual response, addressing a different topic (gender bias complaint vs. salary negotiation).
- **Judge -- Actionability:** 1/10 -- The suggested improved response is for an entirely different scenario, rendering it completely unactionable for the user's salary negotiation context.
- **Judge -- Quality:** 1/10 -- The suggested improved response addresses a completely different topic (gender bias complaint) than the user's salary negotiation, thus it's not better for this scenario nor does it teach a relevant strategy.
- **Judge -- Overall:** 1.0/10

---

## Summary Comparison Table

| ID | Single LLM | Agentic (no RAG) | Full System |
|---|---|---|---|
| COACH-001 | 9.7/10 | 9.3/10 | 9.0/10 |
| COACH-002 | 9.7/10 | 9.3/10 | ERROR |
| COACH-003 | 9.7/10 | 9.3/10 | 9.0/10 |
| COACH-004 | 9.0/10 | 9.7/10 | 3.7/10 |
| COACH-005 | 8.0/10 | 8.0/10 | 1.0/10 |
| **Average** | **9.2/10** | **9.1/10** | **5.7/10** |

---

## Interpretation

The Single LLM variant (Variant A) achieved the highest average judge score overall (9.2/10), compared to 9.2/10 for Single LLM, 9.1/10 for Agentic (no RAG), and 5.7/10 for Full System. On accuracy, Agentic (no RAG) (Variant B) scored highest (9.0/10), indicating that scenario context alone may anchor coach scores more reliably than injecting retrieved framework chunks. Actionability was highest for the Single LLM variant, which may reflect that a simple prompt with no institutional framing produces more direct, generically applicable suggestions. Quality of improved responses was highest for the vanilla Single LLM prompt, which warrants further investigation into whether the full institutional framing constrains the model too narrowly when generating alternative responses.
