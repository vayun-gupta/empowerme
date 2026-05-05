import os
from google import genai

HINT_PROMPT = (
    "You are a supportive communication coach observing a leadership simulation.\n\n"
    "Scenario barrier: BARRIER_THEME\n"
    "Person they're navigating: ADVERSARY_ROLE\n\n"
    "Recent conversation:\n"
    "HISTORY"
    "DRAFT_SECTION\n\n"
    "Give ONE short tactical nudge (1-2 sentences). Be warm and specific to what's "
    "happening in this conversation. Do NOT give generic advice. Do NOT write their "
    "response for them. Guide their thinking only. "
    "Return ONLY the nudge text itself — no preamble, no label, no formatting."
)


def get_hint(scenario, history, user_draft=None) -> str:
    last_6 = history[-6:]
    history_str = ""
    for turn in last_6:
        label = "You" if turn.role == "user" else "Adversary"
        history_str += f"{label}: {turn.content}\n"
    draft_section = f'\nThey\'re drafting: "{user_draft}"' if user_draft else ""
    prompt = (
        HINT_PROMPT
        .replace("BARRIER_THEME", scenario.barrier_theme)
        .replace("ADVERSARY_ROLE", scenario.adversary_role)
        .replace("HISTORY", history_str)
        .replace("DRAFT_SECTION", draft_section)
    )
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set")
    client = genai.Client(api_key=api_key)
    result = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    return result.text.strip()
