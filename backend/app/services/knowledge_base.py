import math

KNOWLEDGE_BASE = [
    {
        "theme": "Assertive Communication",
        "theories": "Alberti & Emmons passive/aggressive/assertive taxonomy; Bower & Bower DESC Script (Describe, Express, Specify, Consequences); Rosenberg NVC (Observation, Feeling, Need, Request); Short's rule-based escalation theory",
        "strategies": "Structure responses using DESC script. Use rule-based escalation — start soft, increase directness only if behaviour continues. Frame requests around shared work outcomes not personal grievances. Skipping escalation levels reads as disproportionate.",
        "examples": "When the agenda changes without notice, it limits my preparation time. Could we agree on a 24-hour heads-up? | I have raised this twice now. I need us to agree on a process — the current situation is affecting my contributions.",
        "when_effective": "Moderate-to-high psychological safety; specific behavioural focus; established relationship with the other party.",
        "when_risky": "Across power differentials — responses effective with peers may read as inappropriate directed upward. Levesque 2024: significant knowing-doing gap in real-time delivery.",
    },
    {
        "theme": "Bias and Discrimination",
        "theories": "Eagly & Karau Role Congruity Theory (communal vs agentic role incongruence generates prejudice); Kleinlogel Justification-Suppression Model (discrimination released by situational ambiguity); Ashburn-Nardo CPR Model (detect, decide, act on prejudice — barrier is usually at decide stage); Formanowicz & Hansen subtle linguistic bias cues",
        "strategies": "Use CPR framework — the barrier is usually at decide to act, not detection. Favour low-conflict confrontation (questioning, educational, impact framing) over aggressive approaches. Focus on behaviour and group-level consequences not individual character to reduce backlash.",
        "examples": "I noticed the point I raised was attributed elsewhere — can we clarify who originated that idea? | That comment may have landed differently than intended. Here is what I heard. | When contributions from this group are consistently overlooked, it limits what the whole team can draw on.",
        "when_effective": "Delivered calmly by someone with social capital; behaviour not character framing; moderate psychological safety. Confrontation generates spillover — reduces bias beyond the specific incident (Chaney et al. 2020).",
        "when_risky": "When the confronter is the direct target not an ally; highly ambiguous bias; low-safety environments. Focella et al. 2015: confronters can face increased prejudice directed at them.",
    },
    {
        "theme": "Power Dynamics",
        "theories": "French & Raven five bases of power (reward, coercive, legitimate, referent, expert); Keltner Approach/Inhibition Theory (high power = approach behaviour, low power = inhibition); Kipnis upward influence tactics (rational, soft, hard); Bendersky — organisational hierarchies constrain individual interventions",
        "strategies": "Default to rational tactics (data, logical argument) for upward influence — highest efficacy and lowest risk across supervisor styles. Calibrate to supervisor style: autocratic leaders respond to soft tactics, participative leaders tolerate rational and mildly assertive. Reserve hard tactics for high-stakes with strong evidence — routine use carries reputational risk.",
        "examples": "Based on the data, this approach reduces delivery risk by roughly 30%. Here is the analysis. | I have discussed this with [respected colleague] and they share the concern. | If we adjust the scope here, I can pull the timeline forward by two weeks.",
        "when_effective": "Rational tactics succeed across most supervisor types. Successful upward influence creates a positive cycle — enhances long-term influence and career outcomes (Case et al. 1988).",
        "when_risky": "Tepper et al. 1993 — gendered asymmetry: men using stronger tactics received higher ratings, women using weaker tactics received more mentoring. Hard tactics with autocratic supervisors carry high reputational risk.",
    },
    {
        "theme": "Negotiation and Conflict",
        "theories": "Fisher & Ury Principled Negotiation (separate people from problems, focus interests not positions, generate options, use objective criteria); Thomas-Kilmann five conflict styles; Walton & McKersie distributive vs integrative bargaining; Nicotera & Jameson — face concerns critical when power differences exist",
        "strategies": "Lead with interest exploration before advocating a position — uncover what the other party actually needs. Use objective criteria to anchor proposals (benchmarks, data, precedent) — depersonalises disagreement and gives both parties cover for changing positions. When power asymmetry is high, protect the senior party's ability to change course without appearing wrong.",
        "examples": "We both want this to succeed. What is driving the concern about timeline — resource constraints or external commitments? | Could we use the standard institutional criteria to evaluate this? | Before we commit to either option, it might be worth generating alternatives that address both sets of concerns.",
        "when_effective": "Genuine shared interest and reasonable trust; both parties can disclose underlying needs; senior party has latitude to agree.",
        "when_risky": "McKersie et al. 2008 — interest-based negotiation breaks down when interests genuinely conflict. Openness about needs can be exploited in low-trust contexts.",
    },
    {
        "theme": "Credibility and Impression Management",
        "theories": "Fiske, Cuddy & Glick Stereotype Content Model (warmth x competence); Jones & Pittman five impression management strategies; Reimann et al. 2022 — impression management can backfire by reducing perceived benevolence; Mikkelson et al. — conversational control negatively related to goodwill and trustworthiness",
        "strategies": "Signal competence through evidence presented as contribution not self-promotion — let data speak, position yourself as the person who found it. Lead with shared goals (warmth) before presenting evidence or challenge (competence) — this sequencing reduces challenge being read as threat. Frame challenges as additions not rejections.",
        "examples": "I want us to get this right. The data surfaces a risk we have not yet discussed. | I understand the reasoning here. There is new information that changes the picture. | I would like to add a perspective that might strengthen this plan before we finalise.",
        "when_effective": "Warmth-first framing works reliably across contexts. Evidence-led challenge most effective with established track record of constructive contribution.",
        "when_risky": "Chalmers 2020 — warmth asymmetric for women: penalised disproportionately for its absence, not proportionally rewarded for its presence. Competence without warmth reads as cold; warmth without competence reads as unserious.",
    },
    {
        "theme": "Strategic Communication and Message Control",
        "theories": "Stakeholder Communication Theory: leaders must actively manage information flow to all stakeholder groups or risk losing narrative control; Gender Communication Penalty: women are penalised for the same assertive communication behaviours that are rewarded in men (Galinsky, 2015; Tannen, 2015); Proactive Framing: getting ahead of a story or decision by setting context before opposition forms",
        "strategies": "Name your contributions explicitly before they are attributed to others. Frame requests in terms of institutional benefit, not personal gain. Use structured talking points in high-stakes conversations to prevent reactive responses. Anticipate the gender lens your audience will apply and adjust framing accordingly — without softening the substance.",
        "examples": "Name your contributions explicitly before they are attributed to others. | Frame requests in terms of institutional benefit, not personal gain. | Use structured talking points in high-stakes conversations to prevent reactive responses.",
        "when_effective": "",
        "when_risky": "Silence is not neutral — in institutional settings, silence is read as agreement or weakness. Overcorrecting toward softness to avoid the gender penalty can undermine credibility equally. Source: Managing Your Message, Mimi Gurbst, Harvard Graduate School of Education Women in Education Leadership Programme, 2018.",
    },
    {
        "theme": "Negotiation and Advocacy Under Institutional Bias",
        "theories": "Collaborative Negotiation Framework (Tyler-Wood / Integrated Model of Leadership): negotiation as influence and persuasion, not confrontation — leaders negotiate for tangibles (salary, budget, resources) and intangibles (reputation, credibility, competence); Social Backlash Theory (Bowles, Babcock, Lai): women face penalties for assertive self-advocacy that men do not — requiring strategic framing of personal requests as institutional benefit; Milkman Bias Study (2014): documented pre-negotiation discrimination against women and minorities in academic settings — faculty were 2.6 times more likely to respond to white males than women and minorities",
        "strategies": "Anchor with third-party data (market rates, peer institution benchmarks, external research) to depersonalise the ask. Frame requests as benefiting the team or institution. Use non-threatening but firm language — combine a clear ask with acknowledgement of institutional constraints. Prepare thoroughly and test counterpart claims rather than accepting them at face value. When facing delay or deflection, name the cost of inaction.",
        "examples": "This would allow me to contribute more effectively to X. | Without a decision by X, the consequence will be Y.",
        "when_effective": "",
        "when_risky": "Confrontational framing (even when accurate) triggers backlash and closes doors without advancing the goal. Accepting vague commitments without a concrete timeline or next step is a common failure mode. Source: Negotiation: An Essential Adaptive Leadership Skill, Irma Tyler-Wood; Women and Negotiation: Barriers to Getting to the Table and Leveling the Playing Field, Katie Shonk — Harvard Program on Negotiation, 2014; Harvard Graduate School of Education Women in Education Leadership Programme, 2018.",
    },
]

_cached_embeddings = None  # type: ignore[var-annotated]


def embed_knowledge_base(client) -> list:
    global _cached_embeddings
    if _cached_embeddings is not None:
        return _cached_embeddings

    embedded = []
    for chunk in KNOWLEDGE_BASE:
        text = chunk["theme"] + " " + chunk["strategies"] + " " + chunk["examples"]
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=text,
        )
        embedded.append({**chunk, "embedding": response.embeddings[0].values})

    _cached_embeddings = embedded
    return _cached_embeddings


def cosine_similarity(a: list, b: list) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(x * x for x in b))
    if mag_a == 0.0 or mag_b == 0.0:
        return 0.0
    return dot / (mag_a * mag_b)


def retrieve_relevant_chunks(query: str, client, top_k: int = 2) -> list:
    embedded_chunks = embed_knowledge_base(client)

    query_response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=query,
    )
    query_vec = query_response.embeddings[0].values

    scored = [
        (cosine_similarity(query_vec, chunk["embedding"]), chunk)
        for chunk in embedded_chunks
    ]
    scored.sort(key=lambda x: x[0], reverse=True)

    return [
        {k: v for k, v in chunk.items() if k != "embedding"}
        for _, chunk in scored[:top_k]
    ]
