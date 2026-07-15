"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import ScoreRing from "@/components/sessions/ScoreRing";
import SkillBar from "@/components/sessions/SkillBar";
import { getSessionDetail, SessionDetail } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function scoreVerdict(score: number | null): string {
  if (score == null) return "Not evaluated";
  if (score >= 85) return "Exemplary Progress";
  if (score >= 70) return "Strong Progress";
  if (score >= 50) return "Growing Steadily";
  return "Early Days";
}

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = Number(params.id);
  const [data, setData] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    getSessionDetail(sessionId)
      .then(setData)
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const coach = data?.coach ?? null;
  const judge = coach?.judge ?? null;

  return (
    <PageShell>
      <div className="relative">
        <div className="fixed inset-0 pointer-events-none plaid-accent z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-on-surface-variant text-sm font-medium">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary">Session Review</span>
          </nav>

          {loading && (
            <div className="py-16 text-center text-on-surface-variant text-sm">
              Loading session… (analysis may take a moment)
            </div>
          )}
          {error && (
            <div className="bg-error-container border border-error/20 rounded-2xl px-4 py-3 text-on-error-container text-sm">
              {error}
            </div>
          )}

          {data && (
            <>
              {/* Header */}
              <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-xl border border-outline-variant/30 shadow-sm">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold mb-1">
                    Session Summary
                  </p>
                  <h1 className="text-2xl lg:text-3xl text-on-surface font-bold font-display leading-tight">
                    {data.scenario_title}
                  </h1>
                  <p className="text-on-surface-variant mt-1">
                    Practice session with {data.adversary_role}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium">
                      {data.barrier_theme}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant">
                      {formatDate(data.started_at)}
                    </span>
                    {!data.completed_at && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-bold">
                        In progress
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-primary-container px-6 py-4 rounded-lg shrink-0">
                  <ScoreRing score={coach?.score ?? null} />
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      Overall Score
                    </div>
                    <div className="font-bold text-on-surface">{scoreVerdict(coach?.score ?? null)}</div>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Transcript */}
                <section className="lg:col-span-7">
                  <div className="glass-card rounded-xl flex flex-col lg:h-[650px] overflow-hidden">
                    <div className="p-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
                      <h2 className="font-bold text-lg flex items-center gap-3 text-primary">
                        <span className="material-symbols-outlined">forum</span>
                        Session Transcript
                      </h2>
                      <span className="text-[10px] font-bold bg-white text-primary px-3 py-1 rounded border border-primary/20">
                        {data.messages.length} MESSAGES
                      </span>
                    </div>
                    <div className="p-5 lg:overflow-y-auto flex-1 chat-scroll space-y-5 bg-white/50">
                      {data.messages.length === 0 && (
                        <div className="py-12 text-center text-on-surface-variant text-sm">
                          No messages recorded for this session.
                        </div>
                      )}
                      {data.messages.map((msg, i) => {
                        const isUser = msg.sender === "user";
                        return (
                          <div
                            key={i}
                            className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
                          >
                            <span
                              className={`font-bold text-xs ${isUser ? "text-primary" : "text-on-surface-variant"}`}
                            >
                              {isUser ? "You" : data.adversary_role}
                            </span>
                            <div
                              className={`max-w-[90%] p-4 rounded-lg text-sm leading-relaxed ${
                                isUser
                                  ? "bg-primary-container/50 border border-primary/10 rounded-tr-none text-on-surface"
                                  : "bg-surface-container border border-outline-variant/20 rounded-tl-none text-on-surface"
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* Analysis */}
                <section className="lg:col-span-5 flex flex-col gap-6">
                  {coach ? (
                    <>
                      {/* Mentor's perspective */}
                      <div className="glass-card rounded-xl p-6 border-l-4 border-l-primary bg-primary-container/20">
                        <h2 className="font-bold text-lg text-primary flex items-center gap-2 mb-5">
                          <span className="material-symbols-outlined">auto_awesome</span>
                          Mentor&apos;s Perspective
                        </h2>
                        <div className="space-y-5">
                          {coach.feedback && (
                            <p className="text-sm text-on-surface leading-relaxed">{coach.feedback}</p>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {coach.strengths.length > 0 && (
                              <div>
                                <h3 className="text-[11px] font-bold text-primary uppercase mb-2 tracking-wider">
                                  What Went Well
                                </h3>
                                <ul className="space-y-2">
                                  {coach.strengths.map((s, i) => (
                                    <li key={i} className="text-sm text-on-surface-variant leading-snug flex gap-2">
                                      <span className="text-primary font-bold shrink-0">•</span>
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {coach.areas_for_improvement.length > 0 && (
                              <div>
                                <h3 className="text-[11px] font-bold text-secondary uppercase mb-2 tracking-wider">
                                  Growth Tips
                                </h3>
                                <ul className="space-y-2">
                                  {coach.areas_for_improvement.map((a, i) => (
                                    <li key={i} className="text-sm text-on-surface-variant leading-snug flex gap-2">
                                      <span className="text-secondary font-bold shrink-0">•</span>
                                      {a}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {coach.improved_response && (
                            <div className="bg-white border border-primary/20 rounded-xl p-4 space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                A Stronger Version
                              </p>
                              <p className="text-sm text-on-surface leading-relaxed italic">
                                &ldquo;{coach.improved_response}&rdquo;
                              </p>
                            </div>
                          )}
                          {coach.theory_applied && (
                            <div className="bg-white border border-primary/20 rounded-xl p-4 space-y-1">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                Framework Applied
                              </p>
                              <p className="text-sm text-on-surface leading-relaxed">
                                {coach.theory_applied}
                              </p>
                            </div>
                          )}
                          {coach.frameworks_used.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {coach.frameworks_used.map((f) => (
                                <span
                                  key={f}
                                  className="bg-white border border-primary/20 text-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Judge scores */}
                      {judge && (
                        <div className="glass-card rounded-xl p-6 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-lg text-primary flex items-center gap-2">
                              <span className="material-symbols-outlined">analytics</span>
                              Core Skills Analysis
                            </h2>
                            <span className="text-[10px] font-bold text-primary bg-primary-fixed px-2.5 py-1 rounded-full">
                              {judge.overall}/10 OVERALL
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant mb-5">
                            The coach&apos;s feedback was independently evaluated by a second AI model.
                          </p>
                          <div className="space-y-5">
                            <SkillBar label="Accuracy" value={judge.accuracy} rationale={judge.accuracy_rationale} />
                            <SkillBar label="Actionability" value={judge.actionability} rationale={judge.actionability_rationale} />
                            <SkillBar label="Quality" value={judge.quality} rationale={judge.quality_rationale} />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="glass-card rounded-xl p-8 text-center space-y-3">
                      <span className="material-symbols-outlined text-primary/30 text-4xl">psychology</span>
                      <p className="text-on-surface-variant text-sm">
                        No coach analysis available for this session.
                      </p>
                      <p className="text-on-surface-variant/60 text-xs">
                        Request coach feedback during a session to see analysis here.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/preview?scenario=${data.scenario_id}`}
                      className="bg-primary text-white font-bold py-3.5 px-8 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-base">refresh</span>
                      Practice Again
                    </Link>
                    <Link
                      href="/dashboard"
                      className="border-2 border-primary/20 text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">trending_up</span>
                      Back to Dashboard
                    </Link>
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
