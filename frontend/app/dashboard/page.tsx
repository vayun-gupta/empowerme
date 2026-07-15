"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import StatCard from "@/components/dashboard/StatCard";
import { getDashboard, DashboardData } from "@/lib/api";

const ScoreChart = dynamic(() => import("@/components/dashboard/ScoreChart"), { ssr: false });

const SESSION_ICONS = ["spa", "psychology", "diversity_2", "school", "shield_person"];
const SESSION_ICON_COLORS = [
  "bg-primary-container text-primary",
  "bg-secondary-container text-secondary",
  "bg-tertiary-container text-tertiary",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) setError(true);
        return false;
      });
    }, 8000);

    getDashboard()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  const chartData = [...(data?.recent_sessions ?? [])]
    .filter((s) => s.score != null)
    .reverse()
    .map((s) => ({
      date: new Date(s.completed_at).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      }),
      score: s.score as number,
    }));

  return (
    <PageShell>
      <div className="relative">
        <div className="fixed inset-0 pointer-events-none plaid-accent z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-on-surface mb-2 tracking-tight font-display">
              Reflection &amp; Growth
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Your evolution as a leader, one conversation at a time.
            </p>
          </header>

          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-sm">
              Loading your stats… (the server may take up to a minute to wake up)
            </div>
          ) : error ? (
            <div className="py-16 flex flex-col items-center gap-3 text-center px-4">
              <span className="material-symbols-outlined text-primary/30 text-4xl">wifi_off</span>
              <p className="text-on-surface-variant text-sm font-medium">
                Could not load your dashboard.
              </p>
              <p className="text-on-surface-variant/60 text-xs">Check your connection and refresh.</p>
            </div>
          ) : (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard
                  icon="auto_awesome"
                  iconCls="bg-primary-container text-primary"
                  accentCls="border-l-primary"
                  label="Average Coach Score"
                  value={
                    data?.average_score != null ? (
                      <>
                        {Math.round(data.average_score)}
                        <span className="text-base text-on-surface-variant font-normal opacity-60">
                          /100
                        </span>
                      </>
                    ) : (
                      "—"
                    )
                  }
                  badge={data?.average_score != null ? "Live" : undefined}
                  badgeCls="bg-primary-container text-on-primary-container"
                />
                <StatCard
                  icon="self_improvement"
                  iconCls="bg-tertiary-container text-tertiary"
                  accentCls="border-l-tertiary-container"
                  label="Completed Sessions"
                  value={
                    data ? (
                      <>
                        {data.completed_sessions}
                        <span className="text-base text-on-surface-variant font-normal opacity-60">
                          {" "}
                          / {data.total_sessions}
                        </span>
                      </>
                    ) : (
                      "—"
                    )
                  }
                  badge="All time"
                />
                <StatCard
                  icon="favorite"
                  iconCls="bg-secondary-container text-secondary"
                  accentCls="border-l-secondary-container"
                  label="Growth Streak"
                  value={
                    data ? (
                      <>
                        {data.streak_days}{" "}
                        <span className="text-base text-on-surface-variant font-normal opacity-60">
                          {data.streak_days === 1 ? "Day" : "Days"}
                        </span>
                      </>
                    ) : (
                      "—"
                    )
                  }
                  badge="Consistent Practice"
                  badgeCls="bg-secondary-container text-on-secondary-container"
                />
              </div>

              {/* Trend chart */}
              <div className="glass-card p-6 lg:p-8 rounded-xl mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-on-surface font-display">
                    Evolution Journey
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-container text-primary">
                    Coach Scores
                  </span>
                </div>
                <ScoreChart data={chartData} />
              </div>

              {/* Recent reflections */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-on-surface font-display">
                    Recent Reflections
                  </h3>
                </div>
                {data?.recent_sessions && data.recent_sessions.length > 0 ? (
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[560px]">
                        <thead>
                          <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                            <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                              Session
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
                              Date
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60 text-right">
                              Score
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                          {data.recent_sessions.map((session, i) => (
                            <tr key={session.session_id} className="hover:bg-surface-container/30 transition-colors group">
                              <td className="px-6 py-4">
                                <Link
                                  href={`/sessions/${session.session_id}`}
                                  className="flex items-center gap-4"
                                >
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${SESSION_ICON_COLORS[i % SESSION_ICON_COLORS.length]}`}
                                  >
                                    <span className="material-symbols-outlined">
                                      {SESSION_ICONS[i % SESSION_ICONS.length]}
                                    </span>
                                  </div>
                                  <div className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                                    {session.scenario_title}
                                  </div>
                                </Link>
                              </td>
                              <td className="px-6 py-4 text-sm text-on-surface-variant">
                                {formatDate(session.completed_at)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {session.score != null ? (
                                  <span className="text-xl font-bold text-primary">
                                    {session.score}
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-surface-container-high text-on-surface-variant">
                                    In progress
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card rounded-xl p-10 text-center space-y-2">
                    <span className="material-symbols-outlined text-primary/30 text-4xl">history</span>
                    <p className="text-on-surface-variant text-sm">No completed sessions yet.</p>
                    <p className="text-on-surface-variant/60 text-xs">
                      Complete a simulation to see your history here.
                    </p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  href="/scenarios"
                  className="w-full sm:w-auto sm:px-12 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                  Start Practice Session
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
