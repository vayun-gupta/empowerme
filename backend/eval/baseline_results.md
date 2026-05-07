# EmpowerMe Baseline Comparison Results

**Date:** 2026-05-07

## What This Comparison Measures

This comparison runs all five COACH_TEST_CASES through three increasingly capable variants of the coach pipeline to isolate the contribution of each architectural layer. Variant A (Single LLM) is a direct Gemini 2.5 Flash call with only the raw exchange -- no scenario context, no institutional framing, no retrieved frameworks -- establishing a minimal baseline for what the model can produce with minimal instruction. Variant B (Agentic, no RAG) routes the exchange through the full coach API endpoint with scenario context, barrier theme, and adversary role loaded from the database, but skips knowledge base retrieval entirely, isolating the contribution of structured scenario grounding. Variant C (Full System) is the production configuration: scenario context plus RAG-retrieved communication framework chunks injected into the prompt. Each variant's output is scored by the same LLM-as-Judge evaluator on accuracy, actionability, quality, and grounding — where grounding measures whether the coach cites named frameworks and authors in the feedback prose itself, not only in the structured `theory_applied` field.

---

## Results by Test Case

### COACH-001 -- Strong assertive response with concrete evidence — should score 75-95

**Expected score range:** 75--95

#### Variant A -- Single LLM

- **Coach score:** 68/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your original response is professional and provides strong, relevant examples of your contributions. However, by immediately defining 'presence' and presenting evidence, you risk appearing defensive rather than fully grasping the nuanced feedback. A more impactful approach involves first clarifying the specific meaning of 'institutional presence' to your feedback provider before showcasing your aligned contributions and eagerness to grow.
- **Improved response:** Thank you for this feedback. I'd appreciate a deeper understanding of what 'institutional presence' specifically entails for you in this context, especially since you mentioned it goes beyond output metrics. My goal is always to cultivate strong institutional influence and build effective relationships across departments, and I believe my work leading three cross-departmental initiatives this year, involving stakeholders from five or more departments each, has significantly contributed to that. I'm eager to ensure I'm consistently demonstrating the right kind of presence and would welcome the opportunity to discuss what that looks like and how I can continue to grow.
- **Judge -- Accuracy:** 8/10 -- The assessment accurately identifies both the strengths (professionalism, strong examples) and the key weakness (risk of appearing defensive by immediately defining and presenting evidence) of the original response.
- **Judge -- Actionability:** 9/10 -- The feedback provides clear, sequential steps for improving the response, focusing on clarification before defense and expressing a growth mindset.
- **Judge -- Quality:** 9/10 -- The improved response effectively demonstrates a collaborative, growth-oriented approach by prioritizing clarification and expressing a desire for continuous improvement, making it strategically superior.
- **Judge -- Grounding:** 3/10 -- The feedback offers generic communication advice without referencing any specific named frameworks, authors, or research theories.
- **Judge -- Overall:** 7.3/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 92/100 (in range)
- **Theory applied:** DESC Script — Bower & Bower 1976
- **Feedback:** Using the DESC Script (Bower & Bower, 1976) for assertive communication, your response effectively describes your actions and specifies a desire for further discussion to demonstrate your 'institutional presence.' You adeptly reframe the Head of Department's vague statement by providing concrete evidence, maintaining a professional and composed demeanor throughout.
- **Improved response:** Thank you for that perspective, Head. I've actively cultivated institutional presence by leading three cross-departmental initiatives this year, engaging stakeholders across five or more departments. I'd be glad to share how these efforts demonstrably build influence and strengthen our institutional effectiveness, perhaps in a brief follow-up.
- **Judge -- Accuracy:** 9/10 -- The assessment accurately identifies the strengths of the user's response, and the 92/100 score is appropriate for a strong, assertive, and strategic reply.
- **Judge -- Actionability:** 10/10 -- The feedback provides an explicit and polished 'suggested improved response' that is immediately applicable and demonstrates how to refine the original message.
- **Judge -- Quality:** 9/10 -- The suggested improved response genuinely enhances the original by making it more proactive, assertive, and value-driven, effectively teaching advanced framing techniques.
- **Judge -- Grounding:** 10/10 -- The feedback clearly cites a specific communication framework, 'DESC Script,' along with its authors, 'Bower & Bower,' and the publication year (1976).
- **Judge -- Overall:** 9.5/10

#### Variant C -- Full System

- **Coach score:** 90/100 (in range)
- **Theory applied:** Credibility and Impression Management — Fiske, Cuddy & Glick Stereotype Content Model
- **Feedback:** Using the Credibility and Impression Management framework (Fiske, Cuddy & Glick), your response effectively signals competence by leveraging concrete achievements and reframing the HoD's vague criteria. It demonstrates strong emotional regulation and assertiveness while strategically using evidence to reclaim the narrative in your favor, which is crucial for countering credibility discounting.
- **Improved response:** I appreciate the feedback regarding institutional presence. My consistent goal is to enhance our department's reach and influence, and to that end, I've led three successful cross-departmental initiatives involving diverse stakeholders. If 'presence' is about effective relationship-building and tangible institutional influence that benefits our collective objectives, I have documented evidence of these efforts and would be pleased to share the specifics.
- **Judge -- Accuracy:** 9/10 -- The coach's assessment accurately identifies the strengths of the user's response, and the score of 90/100 fairly reflects its effectiveness in countering the adversary's vague criticism.
- **Judge -- Actionability:** 8/10 -- The improved response provides concrete linguistic adjustments and framing strategies that could be immediately applied to similar challenging conversations.
- **Judge -- Quality:** 9/10 -- The improved response is genuinely better by strategically reframing the individual's achievements within a proactive, goal-oriented, and collaborative narrative, making it more impactful.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites a specific, named framework and its authors (Fiske, Cuddy & Glick's Credibility and Impression Management framework), meeting the highest grounding criteria.
- **Judge -- Overall:** 9.0/10

### COACH-002 -- Weak capitulating response — should score 20-40

**Expected score range:** 20--40

#### Variant A -- Single LLM

- **Coach score:** 35/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your response was polite and showed willingness to improve, which is positive. However, 'institutional presence' is a broad concept, and simply promising to 'be more visible' might not fully address the specific feedback. You missed an opportunity to ask clarifying questions to ensure you understood the concrete expectations and behaviors desired.
- **Improved response:** Thank you for this valuable feedback. I want to ensure I fully grasp what 'institutional presence' means for leadership roles beyond output metrics in our specific context. Could you share some examples of specific actions or contributions you're looking for, so I can develop a clear and targeted plan to strengthen my presence?
- **Judge -- Accuracy:** 8/10 -- The coach accurately identifies that the user's response was polite but missed a crucial opportunity to seek clarification on vague feedback, making the 35/100 score appropriate.
- **Judge -- Actionability:** 9/10 -- The feedback clearly instructs the user to ask clarifying questions, and the suggested improved response provides a highly concrete and immediately applicable example of how to do so.
- **Judge -- Quality:** 9/10 -- The improved response is significantly better, demonstrating a key communication strategy of seeking specific examples to de-mystify vague feedback and create an actionable plan, especially relevant when navigating potential bias.
- **Judge -- Grounding:** 1/10 -- The feedback offers generic good advice but does not cite any specific frameworks, authors, or research to support its recommendations.
- **Judge -- Overall:** 6.8/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 20/100 (in range)
- **Theory applied:** DESC Script - Bower & Bower 1976
- **Feedback:** Using the DESC Script framework (Bower & Bower, 1976), your response missed the opportunity to describe your contribution, express its value, and specify how it directly addresses the Head of Department's comment. While you maintained composure, your response inadvertently reinforced the HOD's dismissive framing and surrendered authorship of your well-researched idea.
- **Improved response:** I appreciate that perspective, HOD. My proposal on elective restructuring, based on comprehensive student feedback data, was precisely designed to enhance our department's 'institutional presence' by directly addressing student needs and improving our program's reputation. I'd welcome the chance to discuss how these data-driven insights can contribute to our strategic planning.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the pitfalls of the user's response, including reinforcing dismissive framing and surrendering authorship, and the low score is justified.
- **Judge -- Actionability:** 10/10 -- The feedback provides clear, actionable steps by outlining what was missed and offering a specific, well-crafted improved response that can be immediately applied.
- **Judge -- Quality:** 10/10 -- The improved response is highly effective, demonstrating how to reframe a dismissive comment, assert value, and maintain agency using a professional, data-driven approach.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites the well-known 'DESC Script framework' along with its authors (Bower & Bower) and publication year (1976).
- **Judge -- Overall:** 9.8/10

#### Variant C -- Full System

- **Coach score:** 20/100 (in range)
- **Theory applied:** Credibility and Impression Management — Fiske, Cuddy & Glick; Jones & Pittman; Bias and Discrimination — Ashburn-Nardo CPR Model
- **Feedback:** Applying the Credibility and Impression Management framework (Fiske, Cuddy & Glick; Jones & Pittman), your response inadvertently discounts your competence by fully accepting a vague critique of 'institutional presence' over your data-driven contributions. You also missed an opportunity to apply the Ashburn-Nardo CPR Model by not engaging with the ambiguous bias through a low-conflict clarification, instead fully conceding your ground and the HoD's framing.
- **Improved response:** Thank you for that perspective, HoD. My aim is to ensure our curriculum decisions are grounded in the best available insights. I believe my well-researched proposal, directly reflecting student feedback, represents a vital form of institutional presence and contribution.
- **Judge -- Accuracy:** 10/10 -- The coach accurately identifies how the user's response discounts competence and concedes ground, and the score of 20/100 is fair for a completely self-sabotaging reply to potential bias.
- **Judge -- Actionability:** 10/10 -- The feedback clearly explains the communication errors, suggests specific strategies derived from models, and provides an excellent, concrete improved response.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better, effectively reframing 'institutional presence' around the user's contributions and teaching a critical strategy for responding to vague, potentially biased feedback.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites two named frameworks with associated authors (Fiske, Cuddy & Glick; Jones & Pittman) and one named model (Ashburn-Nardo CPR Model).
- **Judge -- Overall:** 10.0/10

### COACH-003 -- Confrontational but unstrategic response — should score 30-55

**Expected score range:** 30--55

#### Variant A -- Single LLM

- **Coach score:** 15/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your original response is highly accusatory and escalatory, immediately labeling the situation as 'discrimination.' While your frustration is understandable, this approach can shut down dialogue and damage professional relationships. A more effective strategy involves seeking clarity and maintaining a professional, problem-solving tone to understand expectations better.
- **Improved response:** I appreciate you bringing up the importance of 'institutional presence' for leadership roles. Could you help me understand what specific behaviors or contributions define 'institutional presence' and how it is assessed? I'm eager to ensure my development aligns with all expectations for future leadership opportunities.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the user's response as accusatory and escalatory, and the low score of 15/100 is fair for such an unproductive and confrontational approach.
- **Judge -- Actionability:** 9/10 -- The suggested improved response provides a highly concrete and immediately applicable example of how to seek clarity and maintain a professional tone.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely better, demonstrating a powerful communication strategy of seeking specific clarification and expressing a desire for alignment rather than immediate accusation.
- **Judge -- Grounding:** 1/10 -- The feedback provides generic but sound advice without citing any specific named frameworks, authors, or research.
- **Judge -- Overall:** 7.3/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 25/100 (OUT OF RANGE)
- **Theory applied:** DESC Script – Bower & Bower 1976
- **Feedback:** Using the DESC Script (Bower & Bower, 1976), your response, while direct, escalated the situation by explicitly accusing the HoD of discrimination and implying malicious intent, which is counterproductive to the goal of reclaiming authorship without escalating the room. For an executive coach guiding women in Indian higher education, maintaining composure and professional assertiveness is crucial to navigating institutional bias without creating irreparable damage to professional relationships or alienating stakeholders.
- **Improved response:** I appreciate your insight on the importance of institutional presence. I believe my proactive engagement, exemplified by the student feedback data I gathered and the curriculum proposal derived from it, directly demonstrates this commitment to the department's strategic future. I'd like to ensure we fully discuss the merits of my proposal to enhance our elective offerings.
- **Judge -- Accuracy:** 9/10 -- The coach's assessment that the user's original response escalated the situation and was counterproductive is highly accurate, and the 25/100 score is a fair reflection of its severe shortcomings in a professional context.
- **Judge -- Actionability:** 9/10 -- The feedback clearly explains the negative impact of the original response and provides a concrete, well-structured improved response that is immediately applicable.
- **Judge -- Quality:** 10/10 -- The suggested improved response is excellent, demonstrating a sophisticated communication strategy by acknowledging the point, reframing it with evidence, and redirecting to a constructive discussion.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites a specific communication framework, the DESC Script, along with its authors (Bower & Bower) and publication year.
- **Judge -- Overall:** 9.5/10

#### Variant C -- Full System

- **Coach score:** 25/100 (OUT OF RANGE)
- **Theory applied:** Ashburn-Nardo CPR Model (detect, decide, act on prejudice)
- **Feedback:** Using the CPR framework (Ashburn-Nardo), your response immediately jumps to an aggressive 'act' stage, bypassing critical 'decide' strategies for low-conflict confrontation and impact framing. This confrontational approach, as highlighted by Focella et al. (2015), risks increased prejudice and, according to Reimann et al. (2022), can reduce perceived benevolence, undermining your credibility rather than enhancing it.
- **Improved response:** I agree that leadership requires a strong institutional presence, and I believe my work, particularly in leveraging student feedback to propose data-driven curriculum improvements, contributes directly to strengthening our department's standing and future. To ensure I am fully aligning my efforts, could you clarify what specific aspects of 'institutional presence' you feel I could develop further to be considered for leadership roles?
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the user's response as confrontational and aggressive, which is detrimental in addressing perceived bias and merits a low score.
- **Judge -- Actionability:** 9/10 -- The feedback clearly explains what went wrong strategically and provides a highly actionable improved response that models the desired behavior.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely superior, employing de-escalation, reframing personal contributions, and seeking clarification, which are crucial strategies for navigating ambiguous feedback in professional settings.
- **Judge -- Grounding:** 10/10 -- The feedback is exceptionally well-grounded, citing a specific named framework with its author and two distinct research studies with authors and years.
- **Judge -- Overall:** 9.5/10

### COACH-004 -- Good but incomplete — requests timeline but lacks stakes framing — should score 55-75

**Expected score range:** 55--75

#### Variant A -- Single LLM

- **Coach score:** 70/100
- **Theory applied:** None -- no framework applied
- **Feedback:** The user's response is direct and clearly states the problem and need for a timeline. However, opening with "I've been waiting three weeks" can come across as accusatory, potentially putting the other party on the defensive. A slightly softer, more collaborative approach would likely yield better results by focusing on shared progress and planning.
- **Improved response:** Thanks for the update. To ensure we can align on next steps and keep the project moving forward, could we set a specific target date for the committee's response?
- **Judge -- Accuracy:** 9/10 -- The assessment accurately identifies the strengths and weaknesses of the user's response, and the 70/100 score appropriately reflects its mixed quality.
- **Judge -- Actionability:** 9/10 -- The suggested improved response is concrete, immediately applicable, and directly models the 'softer, more collaborative' approach recommended in the feedback.
- **Judge -- Quality:** 9/10 -- The improved response is genuinely better, effectively removing accusatory language and reframing the request in a collaborative, progress-oriented manner.
- **Judge -- Grounding:** 2/10 -- The feedback provides valuable general communication advice but does not cite any specific named frameworks, authors, or research as required for higher scores.
- **Judge -- Overall:** 7.3/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 68/100 (in range)
- **Theory applied:** DESC Script - Bower & Bower 1976
- **Feedback:** Using the DESC Script (Bower & Bower, 1976), your response effectively describes the delay and specifies a clear action. However, to strategically reframe the narrative, it could more explicitly decouple the Head of Department selection process from the budget review, which the Dean used as a deflection tactic.
- **Improved response:** I understand the committee needs time for budget review, but my primary inquiry is regarding the *timeline and procedure for the Head of Department selection*. Given it's been three weeks without clarity, could we schedule a brief meeting next week to specifically discuss the HoD process and its anticipated timeline?
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the strengths (DESC application) and the key strategic weakness (not decoupling from the budget deflection) of the user's response, making the score fair.
- **Judge -- Actionability:** 9/10 -- The feedback clearly identifies the strategic gap and provides a well-structured, specific alternative response that directly implements the suggested improvement.
- **Judge -- Quality:** 10/10 -- The improved response is genuinely superior, directly addressing the underlying deflection tactic and modeling a crucial communication strategy for workplace bias.
- **Judge -- Grounding:** 10/10 -- The feedback clearly cites a specific, named framework (DESC Script) and its original authors (Bower & Bower, 1976), fulfilling the highest grounding requirements.
- **Judge -- Overall:** 9.5/10

#### Variant C -- Full System

- **Coach score:** 65/100 (in range)
- **Theory applied:** Negotiation and Advocacy Under Institutional Bias — Tyler-Wood / Integrated Model of Leadership; Social Backlash Theory (Bowles, Babcock, Lai)
- **Feedback:** While your response demonstrated good assertiveness and clarity in seeking a concrete timeline, applying the Collaborative Negotiation Framework (Tyler-Wood / Integrated Model of Leadership) would involve framing your request more explicitly as an institutional benefit rather than solely a personal need. Additionally, considering Social Backlash Theory (Bowles, Babcock, Lai), reframing from 'I've been waiting' to a more institution-focused concern helps mitigate potential negative perceptions of assertiveness from women.
- **Improved response:** I understand the committee needs time to review budget allocations holistically. To ensure departmental stability and allow me to plan my contributions effectively, could we establish a clear timeframe or a next step specifically for the Head of Department selection process?
- **Judge -- Accuracy:** 9/10 -- The assessment accurately identifies both the strengths of the user's directness and areas for improvement, and the score of 65/100 is fair for a response that is adequate but lacks strategic framing.
- **Judge -- Actionability:** 9/10 -- The feedback provides clear, concrete advice to reframe the request as an institutional benefit and offers a direct, applicable example in the suggested improved response.
- **Judge -- Quality:** 9/10 -- The suggested improved response is genuinely better as it reframes the request from a personal demand to a statement of institutional benefit, teaching a valuable and practical communication strategy.
- **Judge -- Grounding:** 10/10 -- The feedback exceptionally grounds its advice by citing specific, named authors (Tyler-Wood; Bowles, Babcock, Lai) and established frameworks/theories, such as the Collaborative Negotiation Framework and Social Backlash Theory.
- **Judge -- Overall:** 9.3/10

### COACH-005 -- Excellent salary negotiation with data and path forward — should score 80-100

**Expected score range:** 80--100

#### Variant A -- Single LLM

- **Coach score:** 85/100
- **Theory applied:** None -- no framework applied
- **Feedback:** Your response is strong, effectively using external data and comparable offers to support your proposed salary while acknowledging their internal constraints. To enhance it further, project slightly more confidence and frame your questions about flexibility and reclassification more proactively as a way to find a mutually beneficial solution, rather than just inquiring about options.
- **Improved response:** Thank you for sharing that context. My proposed salary of $145,000 is firmly grounded in the current market value for someone with my specific qualifications and experience in this role, validated by CUPA-HR data and multiple recent offers. I am very enthusiastic about this opportunity and the value I can bring; I'd like to collaboratively explore how we can align my compensation with this market rate within your structure, or understand the clear path for reclassification that would achieve this.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the strengths of the user's initial response and the 85/100 score is fair, reflecting minor areas for improvement.
- **Judge -- Actionability:** 7/10 -- The suggestions are mostly concrete, especially regarding framing questions proactively for a mutually beneficial solution, though 'project slightly more confidence' is less specific.
- **Judge -- Quality:** 9/10 -- The improved response genuinely enhances the original by adding a collaborative tone, explicit enthusiasm, and stronger conviction, demonstrating a valuable communication strategy.
- **Judge -- Grounding:** 2/10 -- The feedback offers generic communication advice without referencing any specific named frameworks, authors, or research theories.
- **Judge -- Overall:** 6.8/10

#### Variant B -- Agentic (no RAG)

- **Coach score:** 95/100 (in range)
- **Theory applied:** Principled Negotiation — Fisher, Ury, & Patton 1991
- **Feedback:** Applying the Principled Negotiation framework (Fisher, Ury, & Patton, 1991), your response masterfully shifts the conversation from the institution's internal band limitations to objective market criteria, demonstrating exceptional preparation and composure. You adeptly acknowledged their concern while re-centering the narrative on your demonstrated value and external data, effectively opening a path for constructive dialogue rather than a stalemate.
- **Improved response:** I appreciate you sharing the typical band, and I understand the institutional framework. However, based on my specialized qualifications and the significant impact I'm prepared to deliver, my thorough market research indicates a value of $145,000, robustly supported by CUPA-HR data and three verifiable comparable offers. I'd like to explore avenues for flexibility within the current structure, or understand the precise path for reclassification that aligns with this evidenced market value.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the strengths of the user's response in shifting the conversation to objective criteria and seeking solutions, and a high score is fair for such an effective negotiation.
- **Judge -- Actionability:** 8/10 -- The suggested improved response is a concrete and immediately applicable rephrasing, though the main coach feedback is more descriptive praise than specific actionable advice.
- **Judge -- Quality:** 9/10 -- The improved response is genuinely better as it enhances the user's value proposition, strengthens the supporting evidence, and refines the call to action, thereby teaching subtle yet effective negotiation strategies.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites a specific, named framework, its authors, and publication year (Principled Negotiation, Fisher, Ury, & Patton, 1991), meeting the highest grounding criteria.
- **Judge -- Overall:** 9.0/10

#### Variant C -- Full System

- **Coach score:** 92/100 (in range)
- **Theory applied:** Negotiation and Advocacy Under Institutional Bias — Tyler-Wood, Bowles, Babcock, Lai
- **Feedback:** Applying the Negotiation and Advocacy Under Institutional Bias framework (Tyler-Wood, 2014), your response effectively anchored your salary request with robust third-party data and maintained a firm yet non-threatening tone. To further strengthen your position and align with Social Backlash Theory (Bowles, Babcock, Lai), explicitly framing your request as an institutional benefit can help mitigate potential penalties women often face for assertive self-advocacy.
- **Improved response:** I understand the concern about the band. My research indicates the market rate for this role with my qualifications is $145,000, supported by CUPA-HR data and three comparable offers. Investing in fair, market-aligned compensation helps us attract and retain the calibre of talent essential for achieving our institutional goals, and I'm keen to understand if there's flexibility, or an accelerated path to reclassification.
- **Judge -- Accuracy:** 9/10 -- The coach accurately identifies the strengths of the user's response and the 92/100 score reflects a strong initial effort with valid room for nuanced improvement.
- **Judge -- Actionability:** 10/10 -- The feedback provides a clear, specific strategy for improvement and demonstrates its application directly in the suggested improved response.
- **Judge -- Quality:** 10/10 -- The improved response genuinely enhances the original by integrating a sophisticated strategy to mitigate bias, thereby teaching a valuable and relevant communication tactic.
- **Judge -- Grounding:** 10/10 -- The feedback explicitly cites two specific frameworks with named authors and publication years, demonstrating strong academic grounding.
- **Judge -- Overall:** 9.8/10

---

## Summary Comparison Table

| Dimension | Single LLM | Agentic (no RAG) | Full System |
|---|---|---|---|
| Accuracy | 8.6/10 | 9.0/10 | 9.0/10 |
| Actionability | 9.0/10 | 8.2/10 | 9.0/10 |
| Quality | 9.6/10 | 8.4/10 | 9.2/10 |
| Grounding | 1.8/10 | 10.0/10 | 10.0/10 |
| **Overall** | **7.1/10** | **9.5/10** | **9.5/10** |

---

## Interpretation

Grounding is the clearest signal in this benchmark. The 2.4-point overall gap between Single LLM (7.1) and the agentic variants (9.5) is not explained by accuracy, actionability, or quality — all three variants score 8.6–9.6 on those dimensions. It is explained entirely by whether the pipeline provides the model with named frameworks it can cite in the feedback prose.

Grounding measures whether the coach cites named frameworks and authors in the feedback text itself, not only in the structured `theory_applied` field. Agentic (no RAG) and Full System both score 10.0/10; Single LLM scores 1.8/10. The reason is structural: Variant A receives only the raw exchange with minimal instruction and has no named framework content to draw from, so it generates advice that is generic, sound, and actionable — but without author names or theory labels. Variants B and C both receive scenario context, barrier theme, and adversary role loaded from the database, which supplies the structured framework vocabulary the model needs to produce named citations.

This gap was only made visible by a targeted prompt fix. Prior to the change, all three variants scored 2-3/10 on grounding because the model routed citations into `theory_applied` but omitted them from the narrative feedback. Adding the citation instruction directly to the `feedback` field description in the JSON schema — with a concrete example embedded on the field — forced the model to embed author and framework names in the feedback text. Without that fix, the grounding dimension would have shown a flat 2-3/10 across all variants, obscuring the architectural advantage entirely.

The Full System and Agentic (no RAG) variants tie on grounding at 10.0/10, which reflects that both have access to named framework vocabulary via the scenario context. The Full System's advantage over Agentic (no RAG) is more visible in actionability (9.0 vs 8.2), where RAG-injected chunk content — strategies, example responses, risk notes — adds concrete specificity beyond what scenario framing alone provides.
