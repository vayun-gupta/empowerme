"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getScenario, ScenarioData } from "@/lib/api";

const DIFFICULTY_BADGE: Record<string, string> = {
  Advanced: "border-rose-200 text-rose-700 bg-rose-50",
  Moderate:  "border-amber-200 text-amber-700 bg-amber-50",
  Beginner:  "border-emerald-200 text-emerald-700 bg-emerald-50",
};

function PreviewContent() {
  const params = useSearchParams();
  const scenarioId = Number(params.get("scenario") ?? "1");

  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScenario(scenarioId)
      .then(setScenario)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [scenarioId]);

  if (loading || !scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Loading scenario…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center overflow-y-auto w-full bg-slate-50">
      <div className="relative flex min-h-screen flex-col w-full max-w-5xl mx-auto px-6 py-8 overflow-hidden bg-slate-50">

        <header className="pt-12 px-6 flex justify-between items-start z-10 w-full mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-tighter">EmpowerMe</span>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${DIFFICULTY_BADGE[scenario.difficulty_level] ?? "border-slate-200 text-slate-600 bg-slate-50"}`}>
                <span className="text-[10px] font-bold uppercase">{scenario.difficulty_level}</span>
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">EmpowerMe Simulation</h1>
          </div>
          <Link href="/scenarios" className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-colors">
            <span className="material-symbols-outlined text-xl">close</span>
          </Link>
        </header>

        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-50" />
        </div>

        <main className="relative z-10 flex-1 overflow-y-auto px-0 md:px-6 pt-4 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

            {/* Left column */}
            <div className="space-y-8 lg:col-span-2">

              {/* Scenario brief */}
              <section className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-blue-600">hub</span>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Scenario</h2>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-900 border-b border-slate-100 pb-4">{scenario.title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-6">{scenario.context_description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 block mb-1 uppercase tracking-tighter">You are speaking with</span>
                    <span className="text-xs font-semibold text-slate-900">{scenario.adversary_role}</span>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100">
                    <span className="text-[10px] text-orange-600/70 block mb-1 uppercase tracking-tighter">Resistance tactic</span>
                    <span className="text-xs font-semibold text-orange-700">{scenario.barrier_theme}</span>
                  </div>
                </div>
              </section>

              {/* What the coach measures — Task 5 CTA */}
              <section className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600">psychology</span>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">What You&apos;re Practicing</h2>
                </div>
                <p className="text-slate-600 text-[14px] leading-relaxed">
                  The <span className="font-semibold text-slate-900">Adversary</span> will play the role of{" "}
                  <span className="font-semibold text-slate-900">{scenario.adversary_role}</span> and use{" "}
                  <span className="font-semibold text-slate-900">{scenario.barrier_theme}</span> to create friction.
                  Your goal is to hold your position, reframe the narrative, and advance your objective without escalating.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: "security", label: "Assertiveness", desc: "Hold your ground without aggression" },
                    { icon: "frame_reload", label: "Strategic Framing", desc: "Reframe the narrative in your favour" },
                    { icon: "database", label: "Evidence Use", desc: "Reference concrete achievements & data" },
                  ].map(({ icon, label, desc }) => (
                    <div key={label} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-blue-500">{icon}</span>
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">{label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">{desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-4 leading-relaxed">
                  After each exchange, the <span className="font-semibold text-slate-700">Coach</span> will score your response 0–100, show you a stronger version, and name the communication strategy you should apply.
                </p>
              </section>
            </div>

            {/* Right column */}
            <div className="space-y-6 lg:col-span-1">
              <section className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Estimated time</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{scenario.estimated_minutes ?? 10}–{(scenario.estimated_minutes ?? 10) + 2} minutes · You can stop at any time.</p>
                  </div>
                </div>
              </section>

              <section className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Ready to begin?</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The {scenario.adversary_role} is in character. Type your first response to start the simulation.
                  </p>
                </div>
                <a
                  href={`/chat?scenario=${scenario.scenario_id}`}
                  className="w-full py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[2px] text-white transition-all"
                >
                  <span className="text-[15px] font-medium tracking-wide">Start Simulation</span>
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </a>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <span className="material-symbols-outlined text-amber-500 text-[16px]">info</span>
                  <p className="text-[11px] text-amber-700 leading-snug">There are no right or wrong openers — the coach scores every response.</p>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
