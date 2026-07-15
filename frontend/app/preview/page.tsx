"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import { getScenario, ScenarioData } from "@/lib/api";
import { DIFFICULTY_BADGE, scenarioGradient, scenarioIcon } from "@/components/scenarios/ScenarioCard";

const COMPETENCIES = [
  {
    icon: "psychology",
    accent: "border-l-primary",
    iconCls: "bg-primary/10 text-primary",
    title: "Assertiveness",
    desc: "Hold your ground without aggression — articulate your position with warmth and clarity.",
  },
  {
    icon: "diversity_3",
    accent: "border-l-tertiary",
    iconCls: "bg-tertiary/10 text-tertiary",
    title: "Strategic Framing",
    desc: "Reframe the narrative in your favour and connect your goals to shared success.",
  },
  {
    icon: "insights",
    accent: "border-l-secondary",
    iconCls: "bg-secondary/10 text-secondary",
    title: "Evidence Use",
    desc: "Reference concrete achievements and data that advance your objective.",
  },
];

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
      <PageShell>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-on-surface-variant text-sm">Loading scenario…</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="relative">
        <div className="fixed inset-0 pointer-events-none plaid-accent z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1 text-on-surface-variant text-sm font-medium">
            <Link href="/scenarios" className="hover:text-primary transition-colors">
              Scenarios
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary">Scenario Preview</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: brief */}
            <div className="lg:col-span-7 space-y-10">
              <section>
                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-5 leading-tight font-display">
                  {scenario.title}
                </h1>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${DIFFICULTY_BADGE[scenario.difficulty_level] ?? "bg-surface-container text-on-surface-variant"}`}
                  >
                    {scenario.difficulty_level}
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {scenario.barrier_theme}
                  </span>
                </div>
                <p className="text-lg lg:text-xl text-on-surface-variant leading-relaxed">
                  {scenario.context_description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary mb-6 font-display">
                  What You&apos;re Practicing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COMPETENCIES.map((c) => (
                    <div
                      key={c.title}
                      className={`glass-card p-6 rounded-xl border-l-4 ${c.accent} flex flex-col gap-3`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${c.iconCls}`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {c.icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-primary">{c.title}</h3>
                      <p className="text-sm text-on-surface-variant">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
                <div
                  className={`relative h-[240px] w-full bg-gradient-to-br ${scenarioGradient(scenario.scenario_id)} flex items-center justify-center`}
                >
                  <div className="plaid-accent" />
                  <span className="material-symbols-outlined text-8xl text-primary/40">
                    {scenarioIcon(scenario.scenario_id)}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                      Simulation Environment
                    </p>
                    <h4 className="text-2xl font-bold">{scenario.adversary_role}</h4>
                  </div>
                </div>
              </section>
            </div>

            {/* Right: meta + CTA */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="glass-card p-8 rounded-xl border-t-8 border-t-primary">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 border-b border-outline-variant/30 pb-2">
                      Session Details
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">timer</span>
                          <span className="text-on-surface-variant text-sm">Estimated Time</span>
                        </div>
                        <span className="text-lg font-bold text-primary shrink-0">
                          {scenario.estimated_minutes ?? 10}–{(scenario.estimated_minutes ?? 10) + 2} mins
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">theater_comedy</span>
                          <span className="text-on-surface-variant text-sm">You&apos;ll face</span>
                        </div>
                        <span className="text-sm font-bold text-primary text-right">
                          {scenario.adversary_role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">auto_graph</span>
                          <span className="text-on-surface-variant text-sm">Complexity</span>
                        </div>
                        <span className="text-lg font-bold text-primary shrink-0">
                          {scenario.difficulty_level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-container p-5 rounded-lg">
                    <p className="text-sm text-on-primary-container leading-relaxed">
                      After each exchange, your <strong>Coach</strong> scores the response
                      0–100, shows a stronger version, and names the communication strategy
                      to apply.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href={`/chat?scenario=${scenario.scenario_id}`}
                      className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                      Enter Simulation
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                        play_arrow
                      </span>
                    </Link>
                    <Link
                      href="/scenarios"
                      className="w-full bg-white border border-outline-variant text-primary py-3 rounded-lg font-bold hover:bg-surface-container transition-all flex items-center justify-center"
                    >
                      Back to Scenarios
                    </Link>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-xl flex gap-4 items-center border-l-4 border-l-secondary">
                <span className="material-symbols-outlined text-secondary text-3xl shrink-0">
                  tips_and_updates
                </span>
                <p className="text-sm italic text-on-surface-variant leading-snug">
                  There are no right or wrong openers — the coach scores every response, so
                  just begin.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-on-surface-variant text-sm">Loading…</p>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
