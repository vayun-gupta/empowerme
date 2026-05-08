const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ConversationTurn {
  role: "user" | "adversary";
  content: string;
}

export interface EscalationState {
  tactic: string;
  escalation_level: number;
  tactics_used: string[];
}

export interface AdversaryResponse {
  adversary_message: string;
  session_id: number;
  message_id: number;
  escalation_state: EscalationState;
}

export interface CoachResponse {
  score: number;
  feedback: string;
  improved_response: string;
  theory_applied: string;
  strengths: string[];
  areas_for_improvement: string[];
}

export interface ScenarioData {
  scenario_id: number;
  title: string;
  barrier_theme: string;
  adversary_role: string;
  context_description: string;
  difficulty_level: string;
  estimated_minutes: number | null;
}

export async function createSession(scenario_id: number): Promise<number> {
  const res = await fetch(`${API_BASE}/api/sessions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario_id, user_id: 1 }),
  });
  if (!res.ok) throw new Error("Failed to create session");
  const data = await res.json();
  return data.session_id;
}

export async function completeSession(session_id: number): Promise<void> {
  await fetch(`${API_BASE}/api/sessions/${session_id}/complete`, { method: "PATCH" });
}

export async function sendToAdversary(
  sessionId: number,
  scenarioId: number,
  userMessage: string,
  history: ConversationTurn[],
  escalationState?: EscalationState | null,
  lastCoachScore?: number | null
): Promise<AdversaryResponse> {
  const res = await fetch(`${API_BASE}/api/adversary/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      scenario_id: scenarioId,
      user_message: userMessage,
      conversation_history: history,
      escalation_state: escalationState ?? null,
      last_coach_score: lastCoachScore ?? null,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Adversary request failed");
  }
  return res.json();
}

export async function getScenarios(): Promise<ScenarioData[]> {
  const res = await fetch(`${API_BASE}/api/scenarios/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch scenarios");
  return res.json();
}

export async function getScenario(id: number): Promise<ScenarioData> {
  const res = await fetch(`${API_BASE}/api/scenarios/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch scenario ${id}`);
  return res.json();
}

export interface RecentSession {
  session_id: number;
  scenario_title: string;
  completed_at: string;
  score: number | null;
}

export interface DashboardData {
  total_sessions: number;
  completed_sessions: number;
  average_score: number | null;
  streak_days: number;
  recent_sessions: RecentSession[];
}

export async function getDashboard(): Promise<DashboardData> {
  const res = await fetch(`${API_BASE}/api/dashboard/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export interface CoachFeedback {
  score: number;
  feedback: string;
  improved_response: string;
  theory_applied: string;
  strengths: string[];
  areas_for_improvement: string[];
  frameworks_used: string[];
}

export interface MessageItem {
  sender: "user" | "adversary";
  content: string;
  timestamp: string;
}

export interface JudgeScores {
  accuracy: number;
  actionability: number;
  quality: number;
  overall: number;
  accuracy_rationale: string;
  actionability_rationale: string;
  quality_rationale: string;
}

export interface CoachAnalysis {
  score: number;
  feedback: string;
  improved_response: string;
  theory_applied: string;
  strengths: string[];
  areas_for_improvement: string[];
  frameworks_used: string[];
  judge: JudgeScores | null;
}

export interface SessionDetail {
  session_id: number;
  scenario_id: number;
  scenario_title: string;
  adversary_role: string;
  barrier_theme: string;
  started_at: string;
  completed_at: string | null;
  messages: MessageItem[];
  coach: CoachAnalysis | null;
}

export async function getSessionDetail(sessionId: number): Promise<SessionDetail> {
  const res = await fetch(`${API_BASE}/api/sessions/${sessionId}/detail`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch session ${sessionId}`);
  return res.json();
}

export interface HintData {
  hint: string;
}

export async function getHint(
  scenarioId: number,
  history: ConversationTurn[],
  userDraft?: string
): Promise<HintData> {
  const res = await fetch(`${API_BASE}/api/hint/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      scenario_id: scenarioId,
      history,
      user_draft: userDraft || null,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Hint request failed");
  }
  return res.json();
}

export async function getCoachFeedback(
  sessionId: number,
  scenarioId: number,
  userMessage: string,
  adversaryMessage: string,
  conversationHistory: ConversationTurn[]
): Promise<CoachFeedback> {
  const res = await fetch(`${API_BASE}/api/coach/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      scenario_id: scenarioId,
      user_message: userMessage,
      adversary_message: adversaryMessage,
      conversation_history: conversationHistory,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Coach request failed");
  }
  return res.json();
}
