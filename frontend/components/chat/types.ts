export interface Message {
  id: string;
  // "coach" renders as an inline insight pill; it must never be "agent",
  // which is what the turn counter filters on.
  role: "agent" | "user" | "coach";
  content: string;
  timestamp: string;
  coachScore?: number;
}
