"use client";

import React from "react";
import { CoachFeedback } from "@/lib/api";

export interface CoachState {
  data: CoachFeedback | null;
  loading: boolean;
  error: boolean;
}

interface CoachPanelProps {
  coach: CoachState;
  onRequestFeedback: () => void;
  canRequest: boolean;
  barrierTheme?: string;
}

export default function CoachPanel({
  coach,
  onRequestFeedback,
  canRequest,
  barrierTheme,
}: CoachPanelProps) {
  const { data, loading, error } = coach;

  return (
    <div className="relative h-full p-5 flex flex-col gap-5 overflow-y-auto chat-scroll bg-surface-container-low/40">
      <div className="plaid-accent" />
      <div className="relative z-10 flex flex-col min-h-full gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary border border-primary/20 shadow-sm">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <span className="text-on-surface font-bold text-[15px]">Mentorship Lounge</span>
            <span className="text-on-surface-variant/80 text-xs font-medium">
              Safe space for growth
            </span>
          </div>
        </div>

        {/* Body states */}
        {loading ? (
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 text-center">
            <span className="material-symbols-outlined text-primary animate-spin">
              progress_activity
            </span>
            <p className="text-sm text-on-surface-variant">Evaluating your last exchange…</p>
          </div>
        ) : error ? (
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 text-center border-l-4 border-l-error">
            <span className="material-symbols-outlined text-error">error_outline</span>
            <p className="text-sm text-on-surface-variant">
              Evaluation could not be completed. Please try again.
            </p>
            <button
              onClick={onRequestFeedback}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Try again
            </button>
          </div>
        ) : data ? (
          <div className="space-y-4">
            {/* Score metric */}
            <div className="glass-card p-5 rounded-2xl space-y-3 shadow-md border-primary/10">
              <div className="flex justify-between items-center">
                <span className="text-primary font-bold uppercase tracking-widest text-[11px]">
                  Leadership Score
                </span>
                {barrierTheme && (
                  <span className="text-[10px] font-semibold bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                    {barrierTheme}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-1 shrink-0">
                  <span className="text-3xl font-extrabold text-primary">{data.score}</span>
                  <span className="text-sm text-on-surface-variant font-medium">/100</span>
                </div>
                <div className="flex-1 h-2.5 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/30">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${data.score}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            {data.strengths && data.strengths.length > 0 && (
              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-primary shadow-md">
                <div className="flex items-center gap-1.5 text-primary mb-3">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span className="font-bold text-sm">Brilliant Moves</span>
                </div>
                <ul className="space-y-2">
                  {data.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-on-surface leading-relaxed flex gap-2">
                      <span className="text-primary font-bold shrink-0">•</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas for improvement */}
            {data.areas_for_improvement && data.areas_for_improvement.length > 0 && (
              <div className="glass-card p-5 rounded-2xl border-l-4 border-l-secondary shadow-md">
                <div className="flex items-center gap-1.5 text-secondary mb-3">
                  <span className="material-symbols-outlined text-[20px]">tips_and_updates</span>
                  <span className="font-bold text-sm">Mentoring Moments</span>
                </div>
                <ul className="space-y-2">
                  {data.areas_for_improvement.map((a, i) => (
                    <li key={i} className="text-sm text-on-surface leading-relaxed flex gap-2">
                      <span className="text-secondary font-bold shrink-0">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stronger response */}
            {data.improved_response && (
              <div className="glass-card p-5 rounded-2xl shadow-md">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  A Stronger Version
                </p>
                <p className="text-sm text-on-surface leading-relaxed italic">
                  &ldquo;{data.improved_response}&rdquo;
                </p>
              </div>
            )}

            {/* Frameworks */}
            {data.frameworks_used && data.frameworks_used.length > 0 && (
              <div className="glass-card p-5 rounded-2xl shadow-md space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Frameworks Applied
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.frameworks_used.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant border border-primary/10 uppercase tracking-wide"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onRequestFeedback}
              className="w-full text-center text-xs text-primary hover:opacity-80 font-bold pt-1 transition-opacity"
            >
              Re-evaluate last exchange
            </button>
          </div>
        ) : (
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-3 text-center">
            <span className="material-symbols-outlined text-primary/50 text-3xl">psychology</span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {canRequest
                ? "Ask your mentor to review the last exchange."
                : "Coach feedback appears here after your first exchange."}
            </p>
            {canRequest && (
              <button
                onClick={onRequestFeedback}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Get Coach Feedback
              </button>
            )}
          </div>
        )}

        {/* Affirmation footer */}
        <div className="mt-auto p-4 rounded-2xl bg-primary/10 border border-primary/20">
          <div className="flex gap-2 items-start">
            <span className="material-symbols-outlined text-primary text-[20px]">format_quote</span>
            <p className="text-primary font-bold leading-relaxed italic text-[13px]">
              &ldquo;Your voice is your most powerful tool. In this room, you are the expert.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
