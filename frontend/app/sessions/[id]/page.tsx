"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { getSessionDetail, SessionDetail } from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

  return (
    <MainLayout showHeader={false} showNav={true}>
      <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-12 bg-slate-50">

        {/* Top bar */}
        <div className="flex items-center pt-4 pb-4 gap-3 sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md">
          <Link
            href="/dashboard"
            className="size-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight truncate">
            Session Review
          </h2>
        </div>

        {loading && (
          <div className="py-16 text-center text-slate-400 text-sm">Loading session…</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Header card */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Scenario</p>
                  <h3 className="text-slate-900 text-lg font-bold leading-snug">{data.scenario_title}</h3>
                </div>
                {data.coach && (
                  <div className="shrink-0 flex flex-col items-center bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                    <span className="text-2xl font-extrabold text-blue-700">{data.coach.score}</span>
                    <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest">/100</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                  {data.adversary_role}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                  {data.barrier_theme}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500">
                  {formatDate(data.started_at)}
                </span>
              </div>
            </div>

            {/* Conversation */}
            <h3 className="text-slate-900 text-lg font-bold px-1 pb-3 pt-8">Conversation</h3>
            <div className="space-y-4">
              {data.messages.length === 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center text-slate-400 text-sm">
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
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isUser ? "text-blue-600" : "text-slate-500"}`}>
                      {isUser ? "You" : "Adversary"}
                    </p>
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-slate-100 border-l-[3px] border-l-red-400 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coach analysis */}
            {data.coach && (
              <>
                <h3 className="text-slate-900 text-lg font-bold px-1 pb-3 pt-8">Coach Analysis</h3>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3 bg-emerald-100/60 border-b border-emerald-200">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">psychology</span>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Coach Feedback</span>
                  </div>
                  <div className="px-5 py-4 space-y-4">
                    {/* Score bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-emerald-700">{data.coach.score}</span>
                        <span className="text-sm text-emerald-500 font-medium">/100</span>
                      </div>
                      <div className="flex-1 h-2 bg-emerald-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${data.coach.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Feedback narrative */}
                    {data.coach.feedback && (
                      <p className="text-sm text-slate-700 leading-relaxed">{data.coach.feedback}</p>
                    )}

                    {/* Improved response */}
                    {data.coach.improved_response && (
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Stronger Response</p>
                        <p className="text-sm text-slate-800 leading-relaxed italic">&ldquo;{data.coach.improved_response}&rdquo;</p>
                      </div>
                    )}

                    {/* Theory applied */}
                    {data.coach.theory_applied && (
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Framework Applied</p>
                        <p className="text-sm text-slate-800 leading-relaxed">{data.coach.theory_applied}</p>
                      </div>
                    )}

                    {/* Strengths */}
                    {data.coach.strengths.length > 0 && (
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Strengths</p>
                        <ul className="space-y-1">
                          {data.coach.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="material-symbols-outlined text-emerald-500 text-[16px] mt-0.5 shrink-0">check_circle</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Areas for improvement */}
                    {data.coach.areas_for_improvement.length > 0 && (
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Areas for Improvement</p>
                        <ul className="space-y-1">
                          {data.coach.areas_for_improvement.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="material-symbols-outlined text-amber-500 text-[16px] mt-0.5 shrink-0">arrow_upward</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Framework tags */}
                    {data.coach.frameworks_used.length > 0 && (
                      <div className="bg-white border border-emerald-200 rounded-xl p-4 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Retrieved From Knowledge Base</p>
                        <div className="flex flex-wrap gap-1.5">
                          {data.coach.frameworks_used.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Practice Again CTA */}
            <div className="mt-8 mb-4">
              <Link
                href={`/preview?scenario=${data.scenario_id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-[2px] transition-all"
              >
                <span className="material-symbols-outlined">replay</span>
                Practice Again
              </Link>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
