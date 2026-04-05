import streamlit as st
import google.generativeai as genai
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
import json

# ─── PAGE CONFIG ───────────────────────────────────
st.set_page_config(
    page_title="EmpowerMe — Prompt Tester",
    page_icon="⚡",
    layout="wide"
)

st.title("⚡ EmpowerMe Adversary Prompt Tester")
st.caption("Pick a prompt, test it against a user message, rate the response, save feedback.")

# ─── GOOGLE SHEETS CONNECTION ──────────────────────
@st.cache_resource
def get_sheet():
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
    ]
    # credentials from Streamlit secrets
    creds_dict = st.secrets["gcp_service_account"]
    creds = Credentials.from_service_account_info(creds_dict, scopes=scopes)
    client = gspread.authorize(creds)
    sheet = client.open_by_key(st.secrets["sheet_id"])
    return sheet

@st.cache_data(ttl=60)
def load_prompts():
    sheet = get_sheet()
    ws = sheet.worksheet("Prompts")
    data = ws.get_all_records()
    return data

def save_feedback(row):
    sheet = get_sheet()
    ws = sheet.worksheet("Feedback")
    ws.append_row(row)

# ─── GEMINI SETUP ──────────────────────────────────
genai.configure(api_key=st.secrets["gemini_api_key"])

def call_gemini(system_prompt, scenario_context, conversation_history, user_message):
    model = genai.GenerativeModel("gemini-2.5-flash")

    full_prompt = f"""{system_prompt}

Scenario context: {scenario_context}

Conversation so far:
{conversation_history}

User just said: {user_message}

Respond as the adversary. 2-3 sentences. Professional tone."""

    response = model.generate_content(full_prompt)
    return response.text

# ─── LOAD PROMPTS ──────────────────────────────────
prompts = load_prompts()

if not prompts:
    st.error("No prompts found in the Google Sheet. Add some to the Prompts tab.")
    st.stop()

# ─── SIDEBAR — PROMPT SELECTOR ─────────────────────
st.sidebar.header("Select Prompt")

prompt_names = [f"{p['prompt_id']} — {p['name']} (v{p['version']})" for p in prompts]
selected_idx = st.sidebar.selectbox("Prompt", range(len(prompt_names)), format_func=lambda i: prompt_names[i])
selected_prompt = prompts[selected_idx]

st.sidebar.divider()
st.sidebar.subheader("Prompt Details")
st.sidebar.write(f"**Barrier Tactic:** {selected_prompt['barrier_tactic']}")
st.sidebar.write(f"**Status:** {selected_prompt['status']}")
st.sidebar.write(f"**Scenario:** {selected_prompt['scenario_context']}")

with st.sidebar.expander("View Full System Prompt"):
    st.code(selected_prompt['system_prompt'], language=None)

# ─── MAIN AREA ─────────────────────────────────────
col1, col2 = st.columns([3, 2])

with col1:
    st.subheader("Conversation")

    # session state for conversation history
    if "history" not in st.session_state:
        st.session_state.history = []
    if "last_prompt_id" not in st.session_state:
        st.session_state.last_prompt_id = selected_prompt["prompt_id"]

    # reset conversation if prompt changes
    if st.session_state.last_prompt_id != selected_prompt["prompt_id"]:
        st.session_state.history = []
        st.session_state.last_prompt_id = selected_prompt["prompt_id"]

    # display conversation
    for turn in st.session_state.history:
        if turn["role"] == "user":
            st.chat_message("user").write(turn["content"])
        else:
            st.chat_message("assistant", avatar="⚡").write(turn["content"])

    # input
    user_message = st.chat_input("Type your message to the adversary...")

    if user_message:
        st.session_state.history.append({"role": "user", "content": user_message})

        history_text = "\n".join([
            f"{'User' if t['role'] == 'user' else 'Adversary'}: {t['content']}"
            for t in st.session_state.history[:-1]
        ])

        with st.spinner("Adversary responding..."):
            reply = call_gemini(
                selected_prompt["system_prompt"],
                selected_prompt["scenario_context"],
                history_text,
                user_message
            )

        st.session_state.history.append({"role": "assistant", "content": reply})
        st.rerun()

    if st.button("🔄 Reset Conversation"):
        st.session_state.history = []
        st.rerun()

with col2:
    st.subheader("Rate This Response")

    if st.session_state.history and st.session_state.history[-1]["role"] == "assistant":
        last_adversary = st.session_state.history[-1]["content"]
        last_user = st.session_state.history[-2]["content"] if len(st.session_state.history) >= 2 else ""

        st.info(f"**Rating response to:** {last_user[:80]}...")

        realism = st.slider("Realism — Does it feel like a real institutional actor?", 1, 5, 3)
        friction = st.slider("Friction — Is the resistance subtle enough?", 1, 5, 3)
        notes = st.text_area("Notes — What worked or didn't?", placeholder="e.g. Too direct, not institutional enough. Try softer deflection.")

        if st.button("💾 Save Feedback", type="primary"):
            row = [
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                selected_prompt["prompt_id"],
                selected_prompt["name"],
                f"v{selected_prompt['version']}",
                last_user,
                last_adversary,
                realism,
                friction,
                notes,
                selected_prompt["barrier_tactic"]
            ]
            save_feedback(row)
            st.success("Feedback saved to Google Sheet ✅")

    else:
        st.info("Start a conversation on the left, then rate the adversary's response here.")

    st.divider()
    st.subheader("Export Best Prompt")
    st.caption("When a prompt is ready for production, export it to prompts.json")

    if st.button("📤 Copy prompt JSON"):
        export = {
            "prompt_id": selected_prompt["prompt_id"],
            "name": selected_prompt["name"],
            "version": selected_prompt["version"],
            "system_prompt": selected_prompt["system_prompt"],
            "barrier_tactic": selected_prompt["barrier_tactic"],
            "scenario_context": selected_prompt["scenario_context"]
        }
        st.code(json.dumps(export, indent=2), language="json")
        st.caption("Copy this into your prompts.json file in GitHub")