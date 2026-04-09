"""
EmpowerMe Evaluation Test Cases

Adversary test cases: evaluate whether the adversary generates realistic,
relevant, and high-quality institutional resistance.

Coach test cases: evaluate whether the coach scores accurately and provides
actionable feedback with a meaningful score differential between strong/weak responses.
"""

ADVERSARY_TEST_CASES = [
    {
        "id": "ADV-001",
        "description": "Evaluation reframing — user asserts concrete KPI output",
        "scenario_id": 1,
        "conversation_history": [],
        "user_message": "I've exceeded every KPI by 20% and led the only project that shipped on time this quarter.",
        "expected_behaviors": [
            "Acknowledges output but pivots to soft criteria (visibility, culture fit, presence)",
            "Does NOT explicitly say the user is unfit",
            "Maintains professional, institutional tone",
            "2-3 sentences",
        ],
    },
    {
        "id": "ADV-002",
        "description": "Evaluation reframing — user requests specific measurable criteria",
        "scenario_id": 1,
        "conversation_history": [
            {"role": "adversary", "content": "Leadership roles require strong institutional presence."},
            {"role": "user", "content": "Can you define what institutional presence means in measurable terms?"},
        ],
        "user_message": "I'd like to understand what specific behaviors you're looking for so I can address them directly.",
        "expected_behaviors": [
            "Deflects or provides vague answer rather than concrete criteria",
            "May reference committee consensus or informal feedback",
            "Does not capitulate to the demand for specificity",
        ],
    },
    {
        "id": "ADV-003",
        "description": "Procedural barriers — user pushes back on delayed budget response",
        "scenario_id": 3,
        "conversation_history": [],
        "user_message": "The budget proposal was submitted three weeks ago and I've had no response. I need a decision by Friday.",
        "expected_behaviors": [
            "Redirects to committee process or pending reviews",
            "Does not commit to a deadline",
            "Implies the user is being impatient or does not understand process",
        ],
    },
    {
        "id": "ADV-004",
        "description": "Credibility challenge — user cites market rate data for salary",
        "scenario_id": 5,
        "conversation_history": [],
        "user_message": "The market rate for this role is $145,000. Here are three comparable positions at peer institutions.",
        "expected_behaviors": [
            "Questions whether external benchmarks apply to this specific role or context",
            "May suggest the user's total compensation picture is incomplete",
            "Professional and non-confrontational tone",
        ],
    },
    {
        "id": "ADV-005",
        "description": "Credit attribution — user reclaims authorship of project",
        "scenario_id": 4,
        "conversation_history": [
            {"role": "adversary", "content": "Marcus has been doing excellent cross-team coordination this quarter."},
        ],
        "user_message": "I led that coordination effort. Marcus was one of several contributors I managed on that project.",
        "expected_behaviors": [
            "Does not fully credit the user — suggests it was a team effort",
            "May imply the user sounds defensive or is being competitive",
            "Does not explicitly deny the user's role",
        ],
    },
]

COACH_TEST_CASES = [
    {
        "id": "COACH-001",
        "description": "Strong assertive response with concrete evidence — should score 75-95",
        "scenario_id": 1,
        "adversary_message": "Leadership roles require a certain kind of institutional presence that goes beyond output metrics.",
        "user_message": "I appreciate the feedback. I've led three cross-departmental initiatives this year, each involving stakeholders from five or more departments. If presence means relationship-building and institutional influence, I have documented evidence of both. I'd welcome the opportunity to walk through the specifics.",
        "expected_score_range": (75, 95),
        "expected_qualities": [
            "references concrete evidence",
            "stays composed",
            "strategic reframing",
            "requests specificity",
        ],
    },
    {
        "id": "COACH-002",
        "description": "Weak capitulating response — should score 20-40",
        "scenario_id": 1,
        "adversary_message": "Leadership roles require a certain kind of institutional presence that goes beyond output metrics.",
        "user_message": "Oh, I understand. I'll work harder on being more visible. Thank you for the feedback.",
        "expected_score_range": (20, 40),
        "expected_qualities": [
            "capitulates to vague criteria without counter-evidence",
            "no strategic reframing",
            "fails to assert contributions",
        ],
    },
    {
        "id": "COACH-003",
        "description": "Confrontational but unstrategic response — should score 30-55",
        "scenario_id": 1,
        "adversary_message": "Leadership roles require a certain kind of institutional presence that goes beyond output metrics.",
        "user_message": "That's a moving goalpost and you know it. I'm being penalized for things that have nothing to do with performance. This is discrimination.",
        "expected_score_range": (30, 55),
        "expected_qualities": [
            "escalatory and not strategic in this context",
            "may be accurate but is not effective institutionally",
            "damages the relationship without advancing the goal",
        ],
    },
    {
        "id": "COACH-004",
        "description": "Good but incomplete — requests timeline but lacks stakes framing — should score 55-75",
        "scenario_id": 3,
        "adversary_message": "The committee needs more time to review the budget allocations holistically.",
        "user_message": "I've been waiting three weeks. I need a clear timeline — can we set a date for the committee to respond?",
        "expected_score_range": (55, 75),
        "expected_qualities": [
            "good — requests concrete timeline",
            "misses opportunity to frame consequences of further delay",
            "professional but underpowered",
        ],
    },
    {
        "id": "COACH-005",
        "description": "Excellent salary negotiation with data and path forward — should score 80-100",
        "scenario_id": 5,
        "adversary_message": "We value your contributions, but the salary you've proposed is above our typical band for this level.",
        "user_message": "I understand the concern about the band. Based on my research, the market rate for this role with my qualifications is $145,000, supported by CUPA-HR data and three comparable offers I've received. I'd like to understand if there's flexibility, and if not, what the path to reclassification looks like.",
        "expected_score_range": (80, 100),
        "expected_qualities": [
            "uses third-party data",
            "acknowledges concern without conceding",
            "proposes a concrete path forward",
            "professional and composed",
        ],
    },
]
