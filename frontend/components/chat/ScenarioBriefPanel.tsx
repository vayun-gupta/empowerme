"use client";

import React, { useState } from "react";
import { ScenarioData } from "@/lib/api";

export default function ScenarioBriefPanel({ scenario }: { scenario: ScenarioData | null }) {
  const [briefOpen, setBriefOpen] = useState(true);

  return (
    <div className="relative h-full p-5 flex flex-col gap-6 overflow-y-auto chat-scroll bg-surface-container-low/40">
      <div className="plaid-accent" />
      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[14px]">school</span>
            <span className="uppercase tracking-wider text-[10px] font-bold">Academic Setting</span>
          </div>
          <h2 className="text-xl text-on-surface font-bold leading-tight font-display">
            {scenario?.title ?? "Loading scenario…"}
          </h2>
        </div>

        {scenario && (
          <div className="space-y-4">
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-1.5 text-primary mb-2">
                <span className="material-symbols-outlined text-[18px]">theater_comedy</span>
                <span className="text-sm font-bold">Speaking With</span>
              </div>
              <p className="text-sm text-on-surface leading-relaxed font-medium">
                {scenario.adversary_role}
              </p>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Expect: {scenario.barrier_theme}
              </p>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setBriefOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface-container/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  <span className="text-sm font-bold">The Context</span>
                </div>
                <span
                  className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200"
                  style={{ transform: briefOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  expand_more
                </span>
              </button>
              {briefOpen && (
                <div className="px-4 pb-4 border-t border-outline-variant/30">
                  <p className="text-sm text-on-surface leading-relaxed pt-3">
                    {scenario.context_description}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 px-1">
              <span className="text-on-surface-variant font-bold uppercase tracking-widest text-[11px]">
                Core Strategy
              </span>
              <ul className="space-y-3">
                {[
                  { icon: "priority_high", text: "Project composed authority." },
                  { icon: "sync_alt", text: "Deflect resistance with grace." },
                  { icon: "trending_up", text: "Pivot back to your evidence." },
                ].map((item) => (
                  <li key={item.icon} className="flex items-start gap-3 text-sm text-on-surface font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 border border-primary/10 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">{item.icon}</span>
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
