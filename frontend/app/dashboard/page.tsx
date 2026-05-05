"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { getDashboard, DashboardData } from "@/lib/api";

const SESSION_ICONS = ["payments", "forum", "hub", "school", "shield_person"];
const SESSION_COLORS = [
  "bg-indigo-50 border-indigo-100 text-indigo-600",
  "bg-rose-50 border-rose-100 text-rose-600",
  "bg-blue-50 border-blue-100 text-blue-600",
  "bg-emerald-50 border-emerald-100 text-emerald-600",
  "bg-purple-50 border-purple-100 text-purple-600",
];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avgScore = data?.average_score != null ? `${Math.round(data.average_score)}%` : "—";
  const streak = data ? (data.streak_days > 0 ? `${data.streak_days} Days` : "—") : "—";
  const completed = data != null ? `${data.completed_sessions}` : "—";

  return (
    <MainLayout showHeader={false} showNav={true}>
      <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-12 bg-slate-50">

        {/* Top App Bar */}
        <div className="flex items-center pt-4 pb-4 justify-between sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md">
          <div className="flex size-12 shrink-0 items-center">
            <div className="size-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500">
              <span className="material-symbols-outlined text-xl">person</span>
            </div>
          </div>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight flex-1 ml-3">
            Growth Dashboard
          </h2>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">Loading your stats…</div>
        ) : (
          <>
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="bg-blue-50/30 border border-blue-100/60 shadow-sm flex flex-col gap-2 rounded-2xl p-6 relative overflow-hidden">
                <p className="text-slate-600 text-sm font-medium">Avg Coach Score</p>
                <div className="flex items-end justify-between">
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{avgScore}</p>
                  {data?.average_score != null && (
                    <p className="text-blue-700 text-sm font-bold flex items-center bg-white px-2 py-0.5 rounded-md border border-blue-100 shadow-sm">
                      <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                      Live
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm flex flex-col gap-2 rounded-2xl p-6">
                <p className="text-slate-500 text-sm font-medium">Practice Streak</p>
                <div className="flex items-end justify-between">
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{streak}</p>
                  <p className="text-blue-700 text-sm font-bold flex items-center bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    <span className="material-symbols-outlined text-xs mr-1">bolt</span>
                    {data?.streak_days ? "Active" : "Start"}
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm flex flex-col gap-2 rounded-2xl p-6">
                <p className="text-slate-500 text-sm font-medium">Sessions Completed</p>
                <div className="flex items-end justify-between">
                  <p className="text-slate-900 text-3xl font-bold leading-tight">{completed}</p>
                  <p className="text-purple-700 text-sm font-bold flex items-center bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                    <span className="material-symbols-outlined text-xs mr-1">military_tech</span>
                    All time
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Scenarios Section */}
            <h3 className="text-slate-900 text-lg font-bold px-1 pb-4 pt-8">Recent Sessions</h3>

            {data?.recent_sessions && data.recent_sessions.length > 0 ? (
              <div className="space-y-4">
                {data.recent_sessions.map((session, i) => (
                  <Link
                    key={session.session_id}
                    href={`/sessions/${session.session_id}`}
                    className="bg-white border border-slate-100 shadow-sm flex items-center justify-between p-5 rounded-2xl hover:border-slate-300 hover:shadow-md hover:-translate-y-[1px] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-12 rounded-xl border flex items-center justify-center ${SESSION_COLORS[i % SESSION_COLORS.length]}`}>
                        <span className="material-symbols-outlined">{SESSION_ICONS[i % SESSION_ICONS.length]}</span>
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors text-[15px]">
                          {session.scenario_title}
                        </p>
                        <p className="text-slate-500 text-xs">
                          Completed
                          {session.score != null ? ` · Score: ${session.score}%` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-300 material-symbols-outlined text-xl">chevron_right</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-2">
                <span className="material-symbols-outlined text-slate-300 text-4xl">history</span>
                <p className="text-slate-500 text-sm">No completed sessions yet.</p>
                <p className="text-slate-400 text-xs">Complete a simulation to see your history here.</p>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 mb-4">
          <Link
            href="/scenarios"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Start Practice Session
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
