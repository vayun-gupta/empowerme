"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Message } from "./types";
import {
  createSession,
  sendToAdversary,
  getCoachFeedback,
  getHint,
  CoachFeedback,
  ConversationTurn,
  EscalationState,
} from "@/lib/api";

const OPENING_LINES: Record<number, string> = {
  1: "I wanted to discuss my proposal from last week's meeting — I noticed it was presented without my involvement and I'd like to understand how decisions like that are made.",
  2: "I've exceeded every target this quarter and led the only project that shipped on time. I'd like to understand what criteria are being used for the promotion decision.",
  3: "The budget proposal was submitted three weeks ago and I haven't received a response. I need clarity on the timeline.",
  4: "I'm back and fully committed. I'd like to discuss how my responsibilities and projects will be reinstated.",
  5: "I'd like to formally raise a concern about the way feedback has been communicated to me and understand the process for doing so.",
};

interface ChatBoxProps {
  scenarioId: number;
  adversaryLabel?: string;
  onTurnChange?: (adversaryTurns: number) => void;
  onSessionCreated?: (id: number) => void;
  onCoachUpdate?: (s: { data: CoachFeedback | null; loading: boolean; error: boolean }) => void;
  onEscalationChange?: (s: EscalationState | null) => void;
  registerFeedbackTrigger?: (fn: () => void) => void;
}

export default function ChatBox({
  scenarioId,
  adversaryLabel,
  onTurnChange,
  onSessionCreated,
  onCoachUpdate,
  onEscalationChange,
  registerFeedbackTrigger,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [history, setHistory] = useState<ConversationTurn[]>([]);

  const [coachData, setCoachData] = useState<CoachFeedback | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);

  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintError, setHintError] = useState(false);

  const [adversaryError, setAdversaryError] = useState<string | null>(null);
  const [escalationState, setEscalationState] = useState<EscalationState | null>(null);
  const [lastCoachScore, setLastCoachScore] = useState<number | null>(null);
  const [retrievedThemes, setRetrievedThemes] = useState<string[]>([]);
  const [lastImprovedResponse, setLastImprovedResponse] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    createSession(scenarioId).then((id) => {
      setSessionId(id);
      onSessionCreated?.(id);
    }).catch(console.error);
  }, [scenarioId]);

  useEffect(() => {
    // Turn counter deliberately counts only adversary turns — "coach" pills are excluded.
    onTurnChange?.(messages.filter((m) => m.role === "agent").length);
  }, [messages, onTurnChange]);

  const callAdversary = async (text: string) => {
    setAdversaryError(null);
    setIsTyping(true);

    const updatedHistory: ConversationTurn[] = [...history, { role: "user", content: text }];

    try {
      const sid = sessionId ?? (await createSession(scenarioId));
      if (!sessionId) setSessionId(sid);

      const response = await sendToAdversary(sid, scenarioId, text, updatedHistory, escalationState, lastCoachScore);

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: response.adversary_message,
        timestamp: "Delivered just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
      setHistory([...updatedHistory, { role: "adversary", content: response.adversary_message }]);
      setEscalationState(response.escalation_state);
      onEscalationChange?.(response.escalation_state);
    } catch (err) {
      console.error("Adversary API error:", err);
      setAdversaryError(text);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: "Sent just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    await callAdversary(text);
  };

  const handleGetFeedback = async () => {
    const lastUserMsg = [...history].reverse().find((h) => h.role === "user")?.content ?? "";
    const lastAdversaryMsg = [...history].reverse().find((h) => h.role === "adversary")?.content ?? "";
    if (!lastUserMsg || !lastAdversaryMsg || !sessionId) return;

    setCoachLoading(true);
    onCoachUpdate?.({ data: null, loading: true, error: false });
    try {
      const feedback = await getCoachFeedback(
        sessionId,
        scenarioId,
        lastUserMsg,
        lastAdversaryMsg,
        history,
        retrievedThemes,
        lastImprovedResponse
      );
      setCoachData(feedback);
      setLastCoachScore(feedback.score);
      setRetrievedThemes((prev) => [...prev, ...feedback.frameworks_used]);
      setLastImprovedResponse(feedback.improved_response);
      onCoachUpdate?.({ data: feedback, loading: false, error: false });
      const coachMsg: Message = {
        id: `coach-${Date.now()}`,
        role: "coach",
        content: feedback.feedback,
        timestamp: "Coach insight",
        coachScore: feedback.score,
      };
      setMessages((prev) => [...prev, coachMsg]);
    } catch (err) {
      console.error("Coach API error:", err);
      onCoachUpdate?.({ data: null, loading: false, error: true });
    } finally {
      setCoachLoading(false);
    }
  };

  // Let the page (right sidebar / mobile drawer) trigger feedback without owning the logic.
  useEffect(() => {
    registerFeedbackTrigger?.(handleGetFeedback);
  });

  const fetchHint = async (draft: string) => {
    setHintLoading(true);
    setHintError(false);
    try {
      const res = await getHint(scenarioId, history, draft || undefined);
      setHint(res.hint);
    } catch (err) {
      console.error("Hint error:", err);
      setHintError(true);
    } finally {
      setHintLoading(false);
    }
  };

  useEffect(() => {
    if (!hintError) return;
    const timer = setTimeout(() => setHintError(false), 4000);
    return () => clearTimeout(timer);
  }, [hintError]);

  const canGetFeedback =
    history.some((h) => h.role === "user") &&
    history.some((h) => h.role === "adversary");

  return (
    <div className="flex flex-col h-full w-full min-w-0 bg-background relative">
      <main
        className="flex-1 overflow-y-auto chat-scroll px-4 md:px-8 py-6 flex flex-col gap-5 max-w-3xl mx-auto w-full"
        id="chat-thread"
      >
        <div className="flex flex-col items-center pb-1">
          <span className="text-[10px] font-bold text-primary bg-primary-fixed/60 px-3 py-1 rounded-full border border-primary/20 uppercase tracking-[0.2em]">
            Live Session Active
          </span>
        </div>

        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center flex-1 py-12 gap-3 text-center">
            <span className="material-symbols-outlined text-primary/30 text-4xl">forum</span>
            <p className="text-on-surface-variant text-sm font-medium">
              Type your opening response to begin.
            </p>
            <p className="text-on-surface-variant/60 text-xs">
              The adversary is in character and will respond.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} adversaryLabel={adversaryLabel} />
        ))}

        {isTyping && (
          <div className="flex flex-col items-start gap-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-full bg-secondary-container text-secondary flex items-center justify-center border border-secondary/20">
                <span className="material-symbols-outlined text-[16px]">person</span>
              </div>
              <span className="text-on-surface-variant font-bold text-[13px]">
                {adversaryLabel ?? "Adversary"}
              </span>
            </div>
            <div className="adversary-bubble px-6 py-4 rounded-3xl shadow-sm w-[84px] h-[52px] flex items-center justify-center">
              <div className="flex gap-1.5 items-center justify-center">
                <span className="size-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="size-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>
        )}

        {adversaryError && !isTyping && (
          <div className="flex flex-col items-start gap-2 animate-in fade-in duration-300">
            <div className="bg-error-container rounded-3xl rounded-bl-none border border-error/20 px-6 py-4 shadow-sm space-y-3">
              <p className="text-sm text-on-error-container leading-relaxed">
                The adversary could not respond. Please try again.
              </p>
              <button
                onClick={() => callAdversary(adversaryError)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-error/30 text-error text-xs font-semibold hover:bg-error/5 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Inline "Get Coach Feedback" prompt — until the first evaluation exists */}
        {canGetFeedback && !coachData && !coachLoading && !isTyping && (
          <button
            onClick={handleGetFeedback}
            className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary-fixed/40 text-primary text-sm font-bold hover:bg-primary-fixed transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Get Coach Feedback
          </button>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Hint callout */}
      {(hint || hintError) && (
        <div className="mx-4 md:mx-8 mb-2 max-w-3xl lg:mx-auto w-auto lg:w-full flex items-start gap-3 coach-insight-pill rounded-2xl px-4 py-3">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
            psychology
          </span>
          <p className="flex-1 text-sm text-on-surface leading-relaxed">
            {hintError ? "Could not get a tip right now. Try again in a moment." : hint}
          </p>
          <button
            onClick={() => { setHint(null); setHintError(false); }}
            aria-label="Dismiss tip"
            className="text-on-surface-variant hover:text-primary transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <div className="shrink-0 w-full px-4 md:px-8 pb-5 pt-2 max-w-3xl mx-auto bg-gradient-to-t from-background via-background/95 to-transparent">
        <ChatInput
          onSend={handleSend}
          isTyping={isTyping}
          onHint={fetchHint}
          canHint={history.some((h) => h.role === "adversary")}
          hintLoading={hintLoading}
          initialValue={OPENING_LINES[scenarioId] ?? ""}
        />
      </div>
    </div>
  );
}
