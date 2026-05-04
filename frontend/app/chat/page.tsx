"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChatBox from "@/components/chat/ChatBox";
import { getScenario, ScenarioData } from "@/lib/api";

function ChatContent() {
  const params = useSearchParams();
  const scenarioId = Number(params.get("scenario") ?? "1");

  const [scenario, setScenario] = useState<ScenarioData | null>(null);

  useEffect(() => {
    getScenario(scenarioId).then(setScenario).catch(console.error);
  }, [scenarioId]);

  return (
    <div className="h-screen bg-slate-50 flex justify-center w-full overflow-hidden">
      <div className="relative flex h-full flex-col w-full max-w-5xl mx-auto px-6 py-8 bg-slate-50 shadow-sm border-x border-slate-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div className="h-full bg-primary w-[65%]" />
        </div>

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
          <Link href="/scenarios" className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200 hover:bg-white">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </Link>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 bg-slate-50 w-full relative z-30 min-h-0 pt-4">
          <aside className="hidden lg:block border-r border-slate-200 pr-4 overflow-y-auto">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-3 sticky top-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Scenario</p>
              <h3 className="text-base font-bold text-slate-900">
                {scenario?.title ?? "—"}
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
          </aside>

          <ChatBox scenarioId={scenarioId} />
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
