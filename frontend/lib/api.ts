const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface ConversationTurn {
  role: "user" | "adversary";
  content: string;
}

export interface AdversaryResponse {
  adversary_message: string;
  session_id: number;
  message_id: number;
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

export async function sendToAdversary(
  sessionId: number,
  scenarioId: number,
  userMessage: string,
  history: ConversationTurn[]
): Promise<AdversaryResponse> {
  const res = await fetch(`${API_BASE}/api/adversary/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: sessionId,
      scenario_id: scenarioId,
      user_message: userMessage,
      conversation_history: history,
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
