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
  onTurnChange?: (adversaryTurns: number) => void;
  barrierTheme?: string;
  onSessionCreated?: (id: number) => void;
}

export default function ChatBox({ scenarioId, onTurnChange, barrierTheme, onSessionCreated }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [history, setHistory] = useState<ConversationTurn[]>([]);

  const [coachData, setCoachData] = useState<CoachFeedback | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [showCoachPanel, setShowCoachPanel] = useState(false);
  const [coachError, setCoachError] = useState(false);

  const [hint, setHint] = useState<string | null>(null);
  const [hintLoading, setHintLoading] = useState(false);
  const [hintError, setHintError] = useState(false);

  const [adversaryError, setAdversaryError] = useState<string | null>(null);
  const [escalationState, setEscalationState] = useState<EscalationState | null>(null);

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
    onTurnChange?.(messages.filter((m) => m.role === "agent").length);
  }, [messages, onTurnChange]);

  const callAdversary = async (text: string) => {
    setAdversaryError(null);
    setIsTyping(true);

    const updatedHistory: ConversationTurn[] = [...history, { role: "user", content: text }];

    try {
      const sid = sessionId ?? (await createSession(scenarioId));
      if (!sessionId) setSessionId(sid);

      const response = await sendToAdversary(sid, scenarioId, text, updatedHistory, escalationState);

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: response.adversary_message,
        timestamp: "Delivered just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
      setHistory([...updatedHistory, { role: "adversary", content: response.adversary_message }]);
      setEscalationState(response.escalation_state);
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
    setCoachError(false);
    setShowCoachPanel(true);
    try {
      const feedback = await getCoachFeedback(
        sessionId,
        scenarioId,
        lastUserMsg,
        lastAdversaryMsg,
        history
      );
      setCoachData(feedback);
    } catch (err) {
      console.error("Coach API error:", err);
      setCoachError(true);
    } finally {
      setCoachLoading(false);
    }
  };

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
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col gap-4" id="chat-thread">
        <div className="flex flex-col items-center pb-2">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-[0.2em]">
            Live Session Active
          </span>
        </div>

        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center flex-1 py-12 gap-3 text-center">
            <span className="material-symbols-outlined text-slate-300 text-4xl">forum</span>
            <p className="text-slate-400 text-sm font-medium">Type your opening response to begin.</p>
            <p className="text-slate-300 text-xs">The adversary is in character and will respond.</p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <div className="flex flex-col items-start gap-1.5 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                Adversary Agent
              </p>
              <span className="size-1.5 rounded-full bg-red-400" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none border border-slate-100 border-l-[3px] border-l-red-500 px-5 py-4 shadow-sm w-[80px] h-[52px] flex items-center justify-center">
              <div className="flex gap-1.5 items-center justify-center translate-y-[-2px]">
                <span className="size-1.5 rounded-full bg-slate-300 animate-bounce" />
                <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>
        )}

        {adversaryError && !isTyping && (
          <div className="flex flex-col items-start gap-1.5 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">
                Adversary Agent
              </p>
              <span className="size-1.5 rounded-full bg-red-300" />
            </div>
            <div className="bg-red-50 rounded-2xl rounded-tl-none border border-red-200 border-l-[3px] border-l-red-400 px-5 py-4 shadow-sm space-y-3">
              <p className="text-sm text-red-700 leading-relaxed">The adversary could not respond. Please try again.</p>
              <button
                onClick={() => callAdversary(adversaryError)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 hover:border-red-300 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                Retry
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {/* Get Feedback button — visible after first full exchange */}
      {canGetFeedback && !showCoachPanel && (
        <div className="px-4 md:px-6 pt-3 pb-1">
          <button
            onClick={handleGetFeedback}
            disabled={coachLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 hover:border-amber-300 transition-all disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">
              {coachLoading ? "progress_activity" : "lightbulb"}
            </span>
            {coachLoading ? "Analysing your response…" : "Get Coach Feedback"}
          </button>
        </div>
      )}

      {/* Coach feedback panel */}
      {showCoachPanel && (
        <div className="mx-4 md:mx-6 mb-3 mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 overflow-y-auto max-h-96">
          <div className="flex items-center justify-between px-5 py-3 bg-emerald-100/60 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">psychology</span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Coach Feedback</span>
            </div>
            <button
              onClick={() => { setShowCoachPanel(false); setCoachData(null); }}
              className="text-emerald-500 hover:text-emerald-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {coachLoading && !coachData ? (
            <div className="px-5 py-6 text-center text-emerald-600 text-sm">
              Evaluating your response…
            </div>
          ) : coachError ? (
            <div className="px-5 py-5 flex flex-col items-center gap-3 text-center">
              <span className="material-symbols-outlined text-amber-400 text-2xl">error_outline</span>
              <p className="text-sm text-slate-600">Evaluation could not be completed. Please try again.</p>
              <button
                onClick={handleGetFeedback}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Try again
              </button>
            </div>
          ) : coachData ? (
            <div className="px-5 py-4 space-y-4">
              {/* Adversary tactic */}
              {barrierTheme && (
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Adversary tactic detected</span>
                  <span className="material-symbols-outlined text-[13px] text-slate-400">sensors</span>
                  <span className="ml-auto text-[11px] font-semibold bg-slate-800 text-white px-2.5 py-1 rounded-full">
                    {barrierTheme}
                  </span>
                </div>
              )}
              {/* Score */}
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-emerald-700">{coachData.score}</span>
                  <span className="text-sm text-emerald-500 font-medium">/100</span>
                </div>
                <div className="flex-1 h-2 bg-emerald-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${coachData.score}%` }}
                  />
                </div>
              </div>

              {/* Feedback */}
              <p className="text-sm text-slate-700 leading-relaxed">{coachData.feedback}</p>

              {/* Improved response */}
              <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Stronger response</p>
                <p className="text-sm text-slate-800 leading-relaxed italic">&ldquo;{coachData.improved_response}&rdquo;</p>
              </div>

              {/* Framework applied */}
              {coachData.theory_applied && (
                <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Framework Applied</p>
                  <p className="text-sm text-slate-800 leading-relaxed">{coachData.theory_applied}</p>
                </div>
              )}

              {/* Retrieved frameworks */}
              {coachData.frameworks_used && coachData.frameworks_used.length > 0 && (
                <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Retrieved From Knowledge Base</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">These frameworks were retrieved from an academic knowledge base on assertive communication, bias navigation, and power dynamics.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {coachData.frameworks_used.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Refresh feedback button */}
              <button
                onClick={handleGetFeedback}
                disabled={coachLoading}
                className="w-full text-center text-xs text-emerald-600 hover:text-emerald-800 font-medium pt-1 transition-colors"
              >
                Re-evaluate last exchange
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* Hint callout */}
      {(hint || hintError) && (
        <div className="mx-4 md:mx-6 mb-2 mt-1 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <span className="material-symbols-outlined text-amber-500 text-[20px] shrink-0 mt-0.5">lightbulb</span>
          <p className="flex-1 text-sm text-amber-900 leading-relaxed">
            {hintError ? "Could not get a nudge right now. Try again in a moment." : hint}
          </p>
          <button
            onClick={() => { setHint(null); setHintError(false); }}
            className="text-amber-400 hover:text-amber-700 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <div className="shrink-0 w-full px-4 md:px-6 pb-6 pt-2 bg-gradient-to-t from-white to-white/0">
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
