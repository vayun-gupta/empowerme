import json
import os

from google import genai
from sqlalchemy.orm import Session

from app.models.feedback import CoachFeedbackDB

COACH_JUDGE_PROMPT = """\
You are an expert evaluator assessing AI-generated coaching feedback for a workplace bias simulation.

Scenario ID: SCENARIO_ID
Adversary message: ADVERSARY_MESSAGE
User's response: USER_MESSAGE
Coach feedback: COACH_FEEDBACK
Suggested improved response: IMPROVED_RESPONSE
Score given by coach: SCORE/100

Rate this coaching feedback on three dimensions from 1 to 10:

1. ACCURACY (1-10): Is the assessment accurate? Is the score fair given the quality of the user's response?
2. ACTIONABILITY (1-10): Are the suggestions concrete and immediately applicable?
3. QUALITY (1-10): Is the improved_response genuinely better? Does it teach a real communication strategy?

Return ONLY a JSON object with no extra text:
{
  "accuracy": <1-10>,
  "actionability": <1-10>,
  "quality": <1-10>,
  "accuracy_rationale": "<one sentence>",
  "actionability_rationale": "<one sentence>",
  "quality_rationale": "<one sentence>",
  "overall": <average of the three, rounded to one decimal>
}"""


def run_judge(
    feedback_row: CoachFeedbackDB,
    scenario_id: int,
    adversary_message: str,
    user_message: str,
    db: Session,
) -> dict | None:
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        return None

    try:
        client = genai.Client(api_key=api_key)
        prompt = (
            COACH_JUDGE_PROMPT
            .replace("SCENARIO_ID", str(scenario_id))
            .replace("ADVERSARY_MESSAGE", adversary_message)
            .replace("USER_MESSAGE", user_message)
            .replace("COACH_FEEDBACK", feedback_row.suggestion or "")
            .replace("IMPROVED_RESPONSE", feedback_row.improved_response or "")
            .replace("SCORE", str(feedback_row.overall_score or 0))
        )

        response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
        raw = response.text.strip()
        if "```" in raw:
            parts = raw.split("```")
            raw = parts[1] if len(parts) >= 3 else parts[-1]
            if raw.startswith("json"):
                raw = raw[4:]
        scores = json.loads(raw.strip())

        feedback_row.judge_accuracy = scores.get("accuracy")
        feedback_row.judge_actionability = scores.get("actionability")
        feedback_row.judge_quality = scores.get("quality")
        feedback_row.judge_overall = str(scores.get("overall", ""))
        feedback_row.judge_accuracy_rationale = scores.get("accuracy_rationale", "")
        feedback_row.judge_actionability_rationale = scores.get("actionability_rationale", "")
        feedback_row.judge_quality_rationale = scores.get("quality_rationale", "")
        db.commit()

        return scores
    except Exception:
        return None
