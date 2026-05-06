"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatBox from "@/components/chat/ChatBox";
import { getScenario, ScenarioData, completeSession } from "@/lib/api";

function ChatContent() {
  const params = useSearchParams();
  const scenarioId = Number(params.get("scenario") ?? "1");

  const router = useRouter();
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [turn, setTurn] = useState(0);
  const [briefOpen, setBriefOpen] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const handleExit = (destination: string) => {
    if (sessionId) completeSession(sessionId).catch(() => {});
    router.push(destination);
  };

  useEffect(() => {
    getScenario(scenarioId).then(setScenario).catch(console.error);
  }, [scenarioId]);

  return (
    <div className="h-screen bg-slate-50 flex justify-center w-full overflow-hidden">
      <div className="relative flex h-full flex-col w-full max-w-5xl mx-auto px-6 py-8 bg-slate-50 shadow-sm border-x border-slate-200 overflow-hidden">
        <header className="flex items-center bg-slate-50/90 backdrop-blur-md p-4 pt-6 justify-between shrink-0 border-b border-slate-200 relative z-40">
          <div className="flex items-center gap-3">
            <div className="text-slate-700 flex size-9 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
              <span className="material-symbols-outlined">shield_person</span>
            </div>
            <div>
              <h2 className="text-slate-900 text-sm font-bold leading-tight tracking-tight uppercase">
                EmpowerMe Simulation
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                {scenario?.title ?? "Loading scenario…"}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Turn {turn} of 8
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExit("/dashboard")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-white text-sm font-medium transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">pause</span>
              Pause
            </button>
            <button
              onClick={() => handleExit("/scenarios")}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200 hover:bg-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 bg-slate-50 w-full relative z-30 min-h-0 pt-4">
          <aside className="hidden lg:block border-r border-slate-200 pr-4 overflow-y-auto">
            <div className="space-y-3 sticky top-8">
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Scenario</p>
                <h3 className="text-base font-bold text-slate-900">
                  {scenario?.title ?? "Loading..."}
                </h3>
                {scenario && (
                  <>
                    <p className="text-xs text-slate-600 leading-relaxed">{scenario.barrier_theme}</p>
                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Speaking with</p>
                      <p className="text-xs font-semibold text-slate-700">{scenario.adversary_role}</p>
                    </div>
                  </>
                )}
              </div>

              {scenario && (
                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setBriefOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Scenario Brief</p>
                    <span
                      className="material-symbols-outlined text-[16px] text-slate-400 transition-transform duration-200"
                      style={{ transform: briefOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      expand_more
                    </span>
                  </button>
                  {briefOpen && (
                    <div className="px-4 pb-4 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed pt-3">
                        {scenario.context_description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          <ChatBox scenarioId={scenarioId} onTurnChange={setTurn} barrierTheme={scenario?.barrier_theme} onSessionCreated={setSessionId} />
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
