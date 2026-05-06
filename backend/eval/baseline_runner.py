"""
EmpowerMe Baseline Comparison Runner

Compares three coaching variants for all COACH_TEST_CASES:
  Variant A -- Single LLM: direct Gemini 2.5 Flash call, no scenario context, no RAG
  Variant B -- Agentic (no RAG): coach endpoint with use_rag=False
  Variant C -- Full system: coach endpoint with RAG retrieval (default)

Usage:
    cd backend
    GEMINI_API_KEY=<key> python -m eval.baseline_runner

The backend must be running at API_BASE (default: http://localhost:8000).
"""

import json
import os
import pathlib
import sys
from datetime import date

from google import genai
import requests

from eval.eval_runner import COACH_JUDGE_PROMPT, call_judge
from eval.test_cases import COACH_TEST_CASES

API_BASE = os.environ.get("API_BASE", "http://localhost:8000/api")
COACH_MODEL = "gemini-2.5-flash"
RESULTS_PATH = pathlib.Path(__file__).parent / "baseline_results.md"

SINGLE_LLM_PROMPT = """\
You are a workplace communication coach. Review this exchange and provide feedback.

Adversary message: {adversary_message}
User's response: {user_message}

Return a JSON object with these exact fields:
- feedback: 2-3 sentence coaching assessment
- improved_response: a stronger version of the user's response
- score: integer 0-100 reflecting response quality
- theory_applied: write 'None -- no framework applied'"""


# ── Variant runners ────────────────────────────────────────────────────────────

def _parse_json(raw: str) -> dict:
    text = raw.strip()
    if "```" in text:
        parts = text.split("```")
        text = parts[1] if len(parts) >= 3 else parts[-1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


def run_variant_a(tc: dict) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY", "")
    client = genai.Client(api_key=api_key)
    prompt = SINGLE_LLM_PROMPT.format(
        adversary_message=tc["adversary_message"],
        user_message=tc["user_message"],
    )
    response = client.models.generate_content(model=COACH_MODEL, contents=prompt)
    return _parse_json(response.text)


def run_variant_b(tc: dict) -> dict:
    payload = {
        "session_id": 9999,
        "scenario_id": tc["scenario_id"],
        "user_message": tc["user_message"],
        "adversary_message": tc["adversary_message"],
        "conversation_history": [],
        "use_rag": False,
    }
    resp = requests.post(f"{API_BASE}/coach/", json=payload, timeout=60)
    resp.raise_for_status()
    return resp.json()


def run_variant_c(tc: dict) -> dict:
    payload = {
        "session_id": 9999,
        "scenario_id": tc["scenario_id"],
        "user_message": tc["user_message"],
        "adversary_message": tc["adversary_message"],
        "conversation_history": [],
    }
    resp = requests.post(f"{API_BASE}/coach/", json=payload, timeout=60)
    resp.raise_for_status()
    return resp.json()


def judge_coach(tc: dict, coach_data: dict) -> dict:
    prompt = (
        COACH_JUDGE_PROMPT
        .replace("SCENARIO_ID", str(tc["scenario_id"]))
        .replace("ADVERSARY_MESSAGE", tc["adversary_message"])
        .replace("USER_MESSAGE", tc["user_message"])
        .replace("COACH_FEEDBACK", coach_data.get("feedback", ""))
        .replace("IMPROVED_RESPONSE", coach_data.get("improved_response", ""))
        .replace("SCORE", str(coach_data.get("score", 0)))
    )
    return call_judge(prompt)


# ── Main runner ────────────────────────────────────────────────────────────────

def run_baseline() -> list[dict]:
    print("\n" + "=" * 60)
    print("BASELINE COMPARISON -- COACH VARIANTS")
    print("=" * 60)

    all_results = []

    variants = [
        ("a", "A -- Single LLM", run_variant_a, False),
        ("b", "B -- Agentic (no RAG)", run_variant_b, True),
        ("c", "C -- Full system", run_variant_c, True),
    ]

    for tc in COACH_TEST_CASES:
        print(f"\n[{tc['id']}] {tc['description']}")
        low, high = tc["expected_score_range"]
        case_result = {
            "id": tc["id"],
            "description": tc["description"],
            "scenario_id": tc["scenario_id"],
            "expected_score_range": (low, high),
        }

        for vkey, vlabel, run_fn, show_range in variants:
            print(f"\n  Variant {vlabel}:")
            try:
                coach_data = run_fn(tc)
                actual_score = coach_data.get("score", 0)
                in_range = low <= actual_score <= high

                if show_range:
                    flag = "✓" if in_range else "✗ OUT OF RANGE"
                    print(f"    Coach score: {actual_score}/100  (expected {low}-{high}) {flag}")
                else:
                    print(f"    Coach score: {actual_score}/100")

                judge_scores = judge_coach(tc, coach_data)
                print(f"    Accuracy:      {judge_scores['accuracy']}/10 -- {judge_scores['accuracy_rationale']}")
                print(f"    Actionability: {judge_scores['actionability']}/10 -- {judge_scores['actionability_rationale']}")
                print(f"    Quality:       {judge_scores['quality']}/10 -- {judge_scores['quality_rationale']}")
                print(f"    OVERALL:       {judge_scores['overall']}/10")

                case_result[vkey] = {
                    "status": "pass",
                    "actual_score": actual_score,
                    "score_in_range": in_range if show_range else None,
                    "feedback": coach_data.get("feedback", ""),
                    "improved_response": coach_data.get("improved_response", ""),
                    "theory_applied": coach_data.get("theory_applied", ""),
                    **judge_scores,
                }
            except Exception as exc:
                print(f"    ERROR: {exc}")
                case_result[vkey] = {"status": "error", "error": str(exc)}

        all_results.append(case_result)

    return all_results


# ── Summary and output ─────────────────────────────────────────────────────────

def _collect_averages(all_results: list[dict]) -> dict[str, dict[str, float]]:
    dims = ["accuracy", "actionability", "quality", "overall"]
    buckets: dict[str, dict[str, list]] = {
        v: {d: [] for d in dims} for v in ["a", "b", "c"]
    }
    for r in all_results:
        for v in ["a", "b", "c"]:
            if r.get(v, {}).get("status") == "pass":
                for d in dims:
                    if d in r[v]:
                        buckets[v][d].append(r[v][d])
    return {
        v: {
            d: (sum(buckets[v][d]) / len(buckets[v][d])) if buckets[v][d] else 0.0
            for d in dims
        }
        for v in ["a", "b", "c"]
    }


def print_summary_table(all_results: list[dict]) -> None:
    print("\n")
    print("  BASELINE COMPARISON SUMMARY")
    print("  " + "═" * 58)
    print(f"  {'ID':<12}  {'Single LLM':>12}  {'Agentic (no RAG)':>18}  {'Full system':>12}")

    a_scores, b_scores, c_scores = [], [], []
    for r in all_results:
        a, b, c = r.get("a", {}), r.get("b", {}), r.get("c", {})
        a_val = f"{a['overall']}" if a.get("status") == "pass" else "ERR"
        b_val = f"{b['overall']}" if b.get("status") == "pass" else "ERR"
        c_val = f"{c['overall']}" if c.get("status") == "pass" else "ERR"
        print(f"  {r['id']:<12}  {a_val:>12}  {b_val:>18}  {c_val:>12}")
        if a.get("status") == "pass":
            a_scores.append(a["overall"])
        if b.get("status") == "pass":
            b_scores.append(b["overall"])
        if c.get("status") == "pass":
            c_scores.append(c["overall"])

    print("  " + "-" * 58)
    a_avg = f"{sum(a_scores)/len(a_scores):.1f}" if a_scores else "N/A"
    b_avg = f"{sum(b_scores)/len(b_scores):.1f}" if b_scores else "N/A"
    c_avg = f"{sum(c_scores)/len(c_scores):.1f}" if c_scores else "N/A"
    print(f"  {'Average':<12}  {a_avg:>12}  {b_avg:>18}  {c_avg:>12}")


def interpret_results(all_results: list[dict]) -> str:
    mean = _collect_averages(all_results)
    names = {"a": "Single LLM", "b": "Agentic (no RAG)", "c": "Full System"}

    best_overall = max(["a", "b", "c"], key=lambda v: mean[v]["overall"])
    best_accuracy = max(["a", "b", "c"], key=lambda v: mean[v]["accuracy"])
    best_actionability = max(["a", "b", "c"], key=lambda v: mean[v]["actionability"])
    best_quality = max(["a", "b", "c"], key=lambda v: mean[v]["quality"])

    para = (
        f"The {names[best_overall]} variant (Variant {best_overall.upper()}) achieved the highest "
        f"average judge score overall ({mean[best_overall]['overall']:.1f}/10), compared to "
        f"{mean['a']['overall']:.1f}/10 for Single LLM, "
        f"{mean['b']['overall']:.1f}/10 for Agentic (no RAG), "
        f"and {mean['c']['overall']:.1f}/10 for Full System. "
    )

    if best_accuracy == best_overall:
        para += (
            "The same variant also led on accuracy, suggesting that the combination of scenario "
            "context and RAG grounding together produces the most calibrated score assignment. "
        )
    elif best_accuracy == "b":
        para += (
            f"On accuracy, {names['b']} (Variant B) scored highest ({mean['b']['accuracy']:.1f}/10), "
            "indicating that scenario context alone may anchor coach scores more reliably than "
            "injecting retrieved framework chunks. "
        )
    elif best_accuracy == "a":
        para += (
            f"On accuracy, {names['a']} (Variant A) scored highest ({mean['a']['accuracy']:.1f}/10), "
            "suggesting the minimal prompt produces less opinionated scores that the judge finds "
            "more proportionate to the exchange. "
        )
    else:
        para += (
            f"On accuracy, {names[best_accuracy]} (Variant {best_accuracy.upper()}) led "
            f"({mean[best_accuracy]['accuracy']:.1f}/10). "
        )

    if best_actionability == "c":
        para += (
            "Actionability was highest for the Full System variant, consistent with the expectation "
            "that named framework citations ground suggestions in specific, teachable strategies. "
        )
    elif best_actionability == "b":
        para += (
            "Actionability was highest for Agentic (no RAG), suggesting that institutional "
            "scenario context is the primary driver of concrete suggestions rather than the "
            "retrieved knowledge base chunks. "
        )
    else:
        para += (
            "Actionability was highest for the Single LLM variant, which may reflect that a "
            "simple prompt with no institutional framing produces more direct, generically "
            "applicable suggestions. "
        )

    if best_quality == "c":
        para += (
            "Quality of improved responses was highest with the Full System, confirming that "
            "RAG-retrieved frameworks produce genuinely better model responses grounded in "
            "named communication strategies."
        )
    elif best_quality == "b":
        para += (
            "Quality of improved responses was highest without RAG injection, suggesting that "
            "the retrieved framework chunks may add noise when scenario context already "
            "constrains the model's response space effectively."
        )
    else:
        para += (
            "Quality of improved responses was highest for the vanilla Single LLM prompt, "
            "which warrants further investigation into whether the full institutional framing "
            "constrains the model too narrowly when generating alternative responses."
        )

    return para


def generate_markdown(all_results: list[dict], today: str) -> str:
    lines: list[str] = []

    lines.append("# EmpowerMe Baseline Comparison Results\n\n")
    lines.append(f"**Date:** {today}\n\n")

    lines.append("## What This Comparison Measures\n\n")
    lines.append(
        "This comparison runs all five COACH_TEST_CASES through three increasingly capable "
        "variants of the coach pipeline to isolate the contribution of each architectural layer. "
        "Variant A (Single LLM) is a direct Gemini 2.5 Flash call with only the raw exchange -- "
        "no scenario context, no institutional framing, no retrieved frameworks -- establishing a "
        "minimal baseline for what the model can produce with minimal instruction. "
        "Variant B (Agentic, no RAG) routes the exchange through the full coach API endpoint with "
        "scenario context, barrier theme, and adversary role loaded from the database, but skips "
        "knowledge base retrieval entirely, isolating the contribution of structured scenario "
        "grounding. Variant C (Full System) is the production configuration: scenario context plus "
        "RAG-retrieved communication framework chunks injected into the prompt. "
        "Each variant's output is scored by the same LLM-as-Judge evaluator on accuracy, "
        "actionability, and quality, enabling direct attribution of score gains to each "
        "layer of the pipeline.\n\n"
    )

    lines.append("---\n\n")
    lines.append("## Results by Test Case\n\n")

    for r in all_results:
        low, high = r["expected_score_range"]
        lines.append(f"### {r['id']} -- {r['description']}\n\n")
        lines.append(f"**Expected score range:** {low}--{high}\n\n")

        for vkey, vlabel in [
            ("a", "Variant A -- Single LLM"),
            ("b", "Variant B -- Agentic (no RAG)"),
            ("c", "Variant C -- Full System"),
        ]:
            v = r.get(vkey, {})
            lines.append(f"#### {vlabel}\n\n")
            if v.get("status") == "error":
                lines.append(f"**ERROR:** {v.get('error', 'unknown')}\n\n")
            else:
                score_line = f"- **Coach score:** {v['actual_score']}/100"
                if vkey in ("b", "c"):
                    score_line += " (in range)" if v.get("score_in_range") else " (OUT OF RANGE)"
                lines.append(score_line + "\n")
                lines.append(f"- **Theory applied:** {v.get('theory_applied', '')}\n")
                lines.append(f"- **Feedback:** {v.get('feedback', '')}\n")
                lines.append(f"- **Improved response:** {v.get('improved_response', '')}\n")
                lines.append(f"- **Judge -- Accuracy:** {v.get('accuracy', 'N/A')}/10 -- {v.get('accuracy_rationale', '')}\n")
                lines.append(f"- **Judge -- Actionability:** {v.get('actionability', 'N/A')}/10 -- {v.get('actionability_rationale', '')}\n")
                lines.append(f"- **Judge -- Quality:** {v.get('quality', 'N/A')}/10 -- {v.get('quality_rationale', '')}\n")
                lines.append(f"- **Judge -- Overall:** {v.get('overall', 'N/A')}/10\n")
            lines.append("\n")

    lines.append("---\n\n")
    lines.append("## Summary Comparison Table\n\n")
    lines.append("| ID | Single LLM | Agentic (no RAG) | Full System |\n")
    lines.append("|---|---|---|---|\n")

    a_scores, b_scores, c_scores = [], [], []
    for r in all_results:
        a, b, c = r.get("a", {}), r.get("b", {}), r.get("c", {})
        a_val = f"{a['overall']}/10" if a.get("status") == "pass" else "ERROR"
        b_val = f"{b['overall']}/10" if b.get("status") == "pass" else "ERROR"
        c_val = f"{c['overall']}/10" if c.get("status") == "pass" else "ERROR"
        lines.append(f"| {r['id']} | {a_val} | {b_val} | {c_val} |\n")
        if a.get("status") == "pass":
            a_scores.append(a["overall"])
        if b.get("status") == "pass":
            b_scores.append(b["overall"])
        if c.get("status") == "pass":
            c_scores.append(c["overall"])

    a_avg = f"{sum(a_scores)/len(a_scores):.1f}/10" if a_scores else "N/A"
    b_avg = f"{sum(b_scores)/len(b_scores):.1f}/10" if b_scores else "N/A"
    c_avg = f"{sum(c_scores)/len(c_scores):.1f}/10" if c_scores else "N/A"
    lines.append(f"| **Average** | **{a_avg}** | **{b_avg}** | **{c_avg}** |\n")

    lines.append("\n---\n\n")
    lines.append("## Interpretation\n\n")
    lines.append(interpret_results(all_results) + "\n")

    return "".join(lines)


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if not os.environ.get("GEMINI_API_KEY"):
        print("ERROR: GEMINI_API_KEY environment variable is not set.")
        sys.exit(1)

    print("EmpowerMe Baseline Comparison")
    print(f"Backend: {API_BASE}")

    all_results = run_baseline()
    print_summary_table(all_results)

    today = date.today().isoformat()
    md = generate_markdown(all_results, today)
    RESULTS_PATH.write_text(md, encoding="utf-8")
    print(f"\nFull results saved to {RESULTS_PATH}")
