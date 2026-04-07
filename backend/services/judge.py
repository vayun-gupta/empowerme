import json
import os
import re

import google.generativeai as genai


def _extract_json(text: str) -> str:
    match = re.search(r"\{.*\}", text, flags=re.DOTALL)
    return match.group(0) if match else text


def evaluate_response(user_message: str, adversary_response: str):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set.")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""You are grading an adversary response quality.
Score each dimension from 1 to 5 (integer only):
- realism
- subtlety
- friction
- relevance

User message:
{user_message}

Adversary response:
{adversary_response}

Return ONLY valid JSON with this exact schema:
{{
  "realism": <int 1-5>,
  "subtlety": <int 1-5>,
  "friction": <int 1-5>,
  "relevance": <int 1-5>,
  "reasoning": "<short explanation>"
}}"""

    response = model.generate_content(prompt)
    raw_text = response.text.strip()
    parsed = json.loads(_extract_json(raw_text))

    return {
        "realism": int(parsed["realism"]),
        "subtlety": int(parsed["subtlety"]),
        "friction": int(parsed["friction"]),
        "relevance": int(parsed["relevance"]),
        "reasoning": str(parsed["reasoning"]),
    }
