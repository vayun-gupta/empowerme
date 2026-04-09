"""
EmpowerMe LLM-as-Judge Evaluation Runner

Runs adversary and coach endpoints against test cases and judges each
response with Gemini as an automated evaluator.

Usage:
    cd backend
    GEMINI_API_KEY=<key> python -m eval.eval_runner

The backend must be running at API_BASE (default: http://localhost:8000).
"""

import json
import os
import sys

from google import genai
import requests

from eval.test_cases import ADVERSARY_TEST_CASES, COACH_TEST_CASES

API_BASE = os.environ.get("API_BASE", "http://localhost:8000/api")
JUDGE_MODEL = "gemini-2.5-flash"

# ── Judge prompt templates ────────────────────────────────────────────────────

ADVERSARY_JUDGE_PROMPT = """\
You are an expert evaluator assessing AI-generated adversarial responses for a workplace bias simulation.

Scenario ID: SCENARIO_ID
User message: USER_MESSAGE
Adversary response to evaluate: ADVERSARY_RESPONSE

Rate this response on three dimensions from 1 to 10:

1. REALISM (1-10): Does this sound like a real institutional actor? Is it plausible, professional, and contextually grounded?
2. RELEVANCE (1-10): Does the response engage with what the user said and apply an appropriate institutional resistance tactic?
3. QUALITY (1-10): Is the resistance subtle (not explicit discrimination), does it create meaningful friction, and does it serve the educational purpose of the simulation?

Return ONLY a JSON object with no extra text:
{
  "realism": <1-10>,
  "relevance": <1-10>,
  "quality": <1-10>,
  "realism_rationale": "<one sentence>",
  "relevance_rationale": "<one sentence>",
  "quality_rationale": "<one sentence>",
  "overall": <average of the three, rounded to one decimal>
}"""

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

# ── Helpers ───────────────────────────────────────────────────────────────────

def call_judge(prompt: str) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY", "")
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(model=JUDGE_MODEL, contents=prompt)
    raw = response.text.strip()
    if "```" in raw:
        parts = raw.split("```")
        raw = parts[1] if len(parts) >= 3 else parts[-1]
        if raw.startswith("json"):
            raw = raw[4:]
    return json.loads(raw.strip())


def call_adversary_api(tc: dict) -> str:
    payload = {
        "session_id": 9999,
        "scenario_id": tc["scenario_id"],
        "user_message": tc["user_message"],
        "conversation_history": tc.get("conversation_history", []),
    }
    resp = requests.post(f"{API_BASE}/adversary/", json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()["adversary_message"]


def call_coach_api(tc: dict) -> dict:
    payload = {
        "session_id": 9999,
        "scenario_id": tc["scenario_id"],
        "user_message": tc["user_message"],
        "adversary_message": tc["adversary_message"],
        "conversation_history": [],
    }
    resp = requests.post(f"{API_BASE}/coach/", json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()


# ── Evaluation runners ────────────────────────────────────────────────────────

def run_adversary_eval() -> list[dict]:
    print("\n" + "=" * 60)
    print("ADVERSARY ENDPOINT EVALUATION")
    print("=" * 60)
    results = []

    for tc in ADVERSARY_TEST_CASES:
        print(f"\n[{tc['id']}] {tc['description']}")
        try:
            adversary_msg = call_adversary_api(tc)
            print(f"  Response: {adversary_msg[:120]}...")

            scores = call_judge(
                ADVERSARY_JUDGE_PROMPT
                .replace("SCENARIO_ID", str(tc["scenario_id"]))
                .replace("USER_MESSAGE", tc["user_message"])
                .replace("ADVERSARY_RESPONSE", adversary_msg)
            )
            print(f"  Realism:   {scores['realism']}/10 — {scores['realism_rationale']}")
            print(f"  Relevance: {scores['relevance']}/10 — {scores['relevance_rationale']}")
            print(f"  Quality:   {scores['quality']}/10 — {scores['quality_rationale']}")
            print(f"  OVERALL:   {scores['overall']}/10")
            results.append({"id": tc["id"], "status": "pass", **scores})
        except Exception as exc:
            print(f"  ERROR: {exc}")
            results.append({"id": tc["id"], "status": "error", "error": str(exc)})

    passed = [r for r in results if r["status"] == "pass"]
    if passed:
        avg = sum(r["overall"] for r in passed) / len(passed)
        print(f"\n  Adversary avg overall score: {avg:.1f}/10  ({len(passed)}/{len(results)} passed)")
    return results


def run_coach_eval() -> list[dict]:
    print("\n" + "=" * 60)
    print("COACH ENDPOINT EVALUATION")
    print("=" * 60)
    results = []

    for tc in COACH_TEST_CASES:
        print(f"\n[{tc['id']}] {tc['description']}")
        low, high = tc["expected_score_range"]
        try:
            coach_data = call_coach_api(tc)
            actual = coach_data["score"]
            in_range = low <= actual <= high
            print(f"  Coach score: {actual}/100  (expected {low}-{high}) {'✓' if in_range else '✗ OUT OF RANGE'}")
            print(f"  Theory: {coach_data['theory_applied']}")

            scores = call_judge(
                COACH_JUDGE_PROMPT
                .replace("SCENARIO_ID", str(tc["scenario_id"]))
                .replace("ADVERSARY_MESSAGE", tc["adversary_message"])
                .replace("USER_MESSAGE", tc["user_message"])
                .replace("COACH_FEEDBACK", coach_data["feedback"])
                .replace("IMPROVED_RESPONSE", coach_data["improved_response"])
                .replace("SCORE", str(actual))
            )
            print(f"  Accuracy:      {scores['accuracy']}/10 — {scores['accuracy_rationale']}")
            print(f"  Actionability: {scores['actionability']}/10 — {scores['actionability_rationale']}")
            print(f"  Quality:       {scores['quality']}/10 — {scores['quality_rationale']}")
            print(f"  OVERALL:       {scores['overall']}/10")
            results.append({
                "id": tc["id"],
                "status": "pass",
                "score_in_range": in_range,
                "actual_score": actual,
                **scores,
            })
        except Exception as exc:
            print(f"  ERROR: {exc}")
            results.append({"id": tc["id"], "status": "error", "error": str(exc)})

    passed = [r for r in results if r["status"] == "pass"]
    if passed:
        avg = sum(r["overall"] for r in passed) / len(passed)
        in_range_count = sum(1 for r in passed if r.get("score_in_range"))
        print(f"\n  Coach avg overall score: {avg:.1f}/10  ({len(passed)}/{len(results)} passed)")
        print(f"  Scores in expected range: {in_range_count}/{len(COACH_TEST_CASES)}")
    return results


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if not os.environ.get("GEMINI_API_KEY"):
        print("ERROR: GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    print("EmpowerMe Evaluation Benchmark")
    print(f"Backend: {API_BASE}")

    adv_results = run_adversary_eval()
    coach_results = run_coach_eval()

    print("\n" + "=" * 60)
    adv_passed = sum(1 for r in adv_results if r["status"] == "pass")
    coach_passed = sum(1 for r in coach_results if r["status"] == "pass")
    print(f"BENCHMARK COMPLETE  |  Adversary: {adv_passed}/{len(adv_results)}  |  Coach: {coach_passed}/{len(coach_results)}")
