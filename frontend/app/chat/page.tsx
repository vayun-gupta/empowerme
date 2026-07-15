"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import ChatBox from "@/components/chat/ChatBox";
import CoachPanel, { CoachState } from "@/components/chat/CoachPanel";
import ScenarioBriefPanel from "@/components/chat/ScenarioBriefPanel";
import { getScenario, ScenarioData, completeSession, EscalationState } from "@/lib/api";

const MAX_ESCALATION_DOTS = 5;

function ChatContent() {
  const params = useSearchParams();
  const scenarioId = Number(params.get("scenario") ?? "1");

  const router = useRouter();
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [turn, setTurn] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [escalation, setEscalation] = useState<EscalationState | null>(null);
  const [coachState, setCoachState] = useState<CoachState>({
    data: null,
    loading: false,
    error: false,
  });
  const [mobilePanel, setMobilePanel] = useState<"brief" | "coach" | null>(null);
  const [exiting, setExiting] = useState(false);

  const feedbackTriggerRef = useRef<() => void>(() => {});
  const registerFeedbackTrigger = useCallback((fn: () => void) => {
    feedbackTriggerRef.current = fn;
  }, []);
  const requestFeedback = useCallback(() => {
    feedbackTriggerRef.current();
  }, []);

  useEffect(() => {
    getScenario(scenarioId).then(setScenario).catch(console.error);
  }, [scenarioId]);

  const handleSaveExit = async () => {
    if (exiting) return;
    setExiting(true);
    try {
      if (sessionId) await completeSession(sessionId);
    } catch {
      // completion failure should never trap the user in the session
    }
    router.push(sessionId ? `/sessions/${sessionId}` : "/scenarios");
  };

  const escalationLevel = escalation?.escalation_level ?? null;

  const progressSlot = (
    <div className="flex flex-col min-w-0">
      <span className="text-on-surface-variant/80 uppercase tracking-widest text-[10px] font-bold">
        Session Progress
      </span>
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold text-sm truncate">
          {escalationLevel !== null ? `Escalation Level ${escalationLevel}` : `Turn ${turn}`}
        </span>
        {escalationLevel !== null && (
          <div className="flex gap-1">
            {Array.from({ length: MAX_ESCALATION_DOTS }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < Math.min(escalationLevel, MAX_ESCALATION_DOTS)
                    ? "bg-primary"
                    : "bg-outline-variant"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const actionsSlot = (
    <button
      onClick={handleSaveExit}
      disabled={exiting}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-low text-secondary border border-outline-variant font-bold hover:bg-surface-container transition-all active:scale-95 shadow-sm disabled:opacity-60"
    >
      <span className="material-symbols-outlined text-[18px]">
        {exiting ? "progress_activity" : "pause_circle"}
      </span>
      <span className="text-sm hidden sm:inline">{exiting ? "Saving…" : "Save & Exit"}</span>
    </button>
  );

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <TopNav variant="chat" progressSlot={progressSlot} actionsSlot={actionsSlot} />

      {/* Mobile panel toggles */}
      <div className="lg:hidden pt-20 shrink-0 flex gap-2 px-4 py-2 border-b border-outline-variant/30 bg-surface/90">
        <button
          onClick={() => setMobilePanel("brief")}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant text-sm font-semibold text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[16px]">auto_stories</span>
          Brief
        </button>
        <button
          onClick={() => setMobilePanel("coach")}
          className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline-variant text-sm font-semibold text-on-surface-variant"
        >
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          Coach
          {coachState.data && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface" />
          )}
        </button>
      </div>

      <main className="flex-1 lg:pt-20 flex overflow-hidden min-h-0">
        {/* Left: scenario brief */}
        <aside className="hidden lg:block w-80 shrink-0 border-r border-outline-variant/30">
          <ScenarioBriefPanel scenario={scenario} />
        </aside>

        {/* Center: chat */}
        <section className="flex-1 min-w-0 flex flex-col border-r border-outline-variant/10">
          <ChatBox
            scenarioId={scenarioId}
            adversaryLabel={scenario?.adversary_role}
            onTurnChange={setTurn}
            onSessionCreated={setSessionId}
            onCoachUpdate={setCoachState}
            onEscalationChange={setEscalation}
            registerFeedbackTrigger={registerFeedbackTrigger}
          />
        </section>

        {/* Right: coach feedback */}
        <aside className="hidden lg:block w-[340px] xl:w-96 shrink-0">
          <CoachPanel
            coach={coachState}
            onRequestFeedback={requestFeedback}
            canRequest={turn > 0}
            barrierTheme={scenario?.barrier_theme}
          />
        </aside>
      </main>

      {/* Mobile drawers */}
      {mobilePanel && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-surface flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/30 shrink-0">
            <span className="font-bold text-primary text-sm uppercase tracking-widest">
              {mobilePanel === "brief" ? "Scenario Brief" : "Coach Feedback"}
            </span>
            <button
              onClick={() => setMobilePanel(null)}
              aria-label="Close panel"
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            {mobilePanel === "brief" ? (
              <ScenarioBriefPanel scenario={scenario} />
            ) : (
              <CoachPanel
                coach={coachState}
                onRequestFeedback={requestFeedback}
                canRequest={turn > 0}
                barrierTheme={scenario?.barrier_theme}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-background">
          <p className="text-on-surface-variant text-sm">Loading…</p>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
