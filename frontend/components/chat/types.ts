export interface Message {
  id: string;
  role: "agent" | "user";
  content: string;
  timestamp: string;
}
