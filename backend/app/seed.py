from sqlalchemy.orm import Session
from app.models.scenario import ScenarioDB

# Research-grounded scenarios based on Rucha's document.
# All set in Indian higher education — adversary roles are academic institutional
# actors (not generic corporate managers).
SCENARIOS = [
    {
        "title": "Being Taken Seriously in Decision-Making Meetings",
        "barrier_theme": "Idea Appropriation & Credibility Discounting",
        "adversary_role": "Head of Department",
        "context_description": (
            "You are an assistant professor attending a departmental committee meeting where curriculum changes are being discussed. "
            "You raise a well-researched proposal about restructuring the elective offerings based on student feedback data you collected. "
            "The Head of Department briefly acknowledges it, then moves on. Ten minutes later, a senior male colleague presents a nearly "
            "identical idea in vaguer terms — and the committee immediately takes it up for formal discussion. "
            "You are practicing how to reclaim authorship of your idea without escalating the room."
        ),
        "difficulty_level": "Moderate",
        "estimated_minutes": 10,
    },
    {
        "title": "Performance Review and Double Standards",
        "barrier_theme": "Gendered Evaluation & Moving Goalposts",
        "adversary_role": "Appraisal Committee Chairperson",
        "context_description": (
            "Your annual faculty appraisal is underway. You have strong research output — two peer-reviewed publications, "
            "a funded minor research project, and teaching feedback scores consistently above the department average. "
            "The committee, however, focuses on concerns about your 'temperament in collegial settings' and whether you demonstrate "
            "'collaborative spirit' — criteria that were never communicated in the appraisal framework and are not applied to male colleagues "
            "with comparable records. You are practicing how to redirect the evaluation back to objective criteria."
        ),
        "difficulty_level": "Advanced",
        "estimated_minutes": 12,
    },
    {
        "title": "Leadership Aspiration Meets Institutional Opacity",
        "barrier_theme": "Informal Gatekeeping & Delay Deflection",
        "adversary_role": "Dean of Faculty Affairs",
        "context_description": (
            "You have been at the institution for six years, have served on multiple committees, and want to formally express interest "
            "in the upcoming Head of Department selection. When you ask the Dean about the selection process, you discover there is no "
            "written policy — positions are filled through informal consultation among senior faculty. The Dean is friendly but vague, "
            "tells you to 'keep contributing' and that 'the right time will come,' while giving no concrete timeline or criteria. "
            "You are practicing how to push past procedural deflection and extract a concrete next step."
        ),
        "difficulty_level": "Advanced",
        "estimated_minutes": 12,
    },
    {
        "title": "Returning from Maternity Leave",
        "barrier_theme": "Caregiving Penalty & Assumption of Reduced Ambition",
        "adversary_role": "Head of Department",
        "context_description": (
            "You have returned from a six-month maternity leave to find that your course load has been restructured without consultation: "
            "your postgraduate elective — a course you designed and had been teaching for three years — was permanently reassigned to a "
            "junior male colleague while you were away. Your research mentorship responsibilities for two PhD students were also quietly "
            "redistributed. When you raise the issue, your Head of Department explains it was done 'to ease your transition back' and "
            "implies that continuing to push for reinstatement signals you are 'not being realistic' about your current situation. "
            "You are practicing how to assert your professional continuity without accepting the framing."
        ),
        "difficulty_level": "Moderate",
        "estimated_minutes": 10,
    },
    {
        "title": "Speaking Up About Gender Bias",
        "barrier_theme": "Minimization, Tone Policing & Institutional Resistance",
        "adversary_role": "Internal Complaints Committee Chairperson",
        "context_description": (
            "You have submitted a formal written complaint documenting a pattern of differential treatment in your department — "
            "including exclusion from key informal meetings, repeated interruption in official settings, and being assigned heavier "
            "administrative work than male colleagues at the same grade. In your first meeting with the Internal Complaints Committee, "
            "the Chairperson questions whether the incidents you described constitute 'bias' or simply reflect 'workplace dynamics,' "
            "asks whether you considered speaking to the individuals informally first, and suggests that formal complaints can 'damage "
            "departmental harmony.' You are practicing how to hold your ground under institutional minimization without losing composure."
        ),
        "difficulty_level": "Advanced",
        "estimated_minutes": 15,
    },
]


def seed_scenarios(db: Session) -> None:
    existing = db.query(ScenarioDB).count()
    if existing > 0:
        return
    for s in SCENARIOS:
        db.add(ScenarioDB(**s))
    db.commit()
