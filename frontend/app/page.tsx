import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden p-6 pb-10 bg-slate-50">
        <header className="flex flex-col items-center justify-center pt-10 pb-10">
          <div className="mb-5 inline-flex items-center justify-center p-2.5 rounded-2xl bg-blue-50 border border-blue-100">
            <span className="material-symbols-outlined text-blue-600 text-3xl">hub</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-3 text-slate-900">
            EmpowerMe
          </h1>
          <p className="text-slate-600 text-center max-w-xs leading-relaxed text-sm">
            Practice High-Stakes Leadership Conversations. Prepare for the conversations that define your leadership trajectory.
            <br />
            AI-powered simulation for real-world leadership interactions.
          </p>
          <p className="text-slate-500 text-center max-w-sm leading-relaxed text-[15px] mt-4">
            Women in Indian academia face documented institutional bias. EmpowerMe gives you a safe space to practice navigating it before it happens in real life.
          </p>
        </header>

        {/* Sample session preview */}
        <div className="max-w-md mx-auto w-full mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] text-center mb-4">What a session looks like</p>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
            {/* Adversary turn */}
            <div className="flex items-start gap-3">
              <div className="size-7 rounded-sm bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-slate-500">smart_toy</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Adversary Agent</p>
                <div className="bg-white border border-slate-100 border-l-[3px] border-l-red-500 rounded-2xl rounded-tl-none px-4 py-3 text-[13px] text-slate-800 leading-relaxed shadow-sm">
                  "Dr. Sharma has outlined a similar framework in his earlier work. Perhaps we should build on that direction instead."
                </div>
              </div>
            </div>
            {/* User turn */}
            <div className="flex items-start gap-3 justify-end">
              <div className="flex flex-col gap-1 items-end">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Leadership Response</p>
                <div className="bg-[#f0f7ff] border border-blue-100/50 rounded-2xl rounded-tr-none px-4 py-3 text-[13px] text-slate-800 leading-relaxed shadow-sm max-w-[90%]">
                  "I appreciate Dr. Sharma's work, but the framework I am proposing addresses a gap his model does not cover, specifically around student feedback loops. I would like to walk the committee through the distinction."
                </div>
              </div>
              <div className="size-7 rounded-full bg-blue-100 border border-blue-200 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-blue-500">person</span>
              </div>
            </div>
            {/* Coach tip */}
            <div className="flex items-start gap-3 mt-1">
              <div className="flex-1 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                <span className="material-symbols-outlined text-amber-500 text-[16px] shrink-0 mt-0.5">lightbulb</span>
                <p className="text-[12px] text-amber-900 leading-relaxed">
                  <span className="font-bold">Coach tip:</span> Strong move. You acknowledged the senior colleague without ceding ground and immediately redirected to your evidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 max-w-md mx-auto w-full mt-6">
          <div className="bg-white rounded-[2rem] p-8 flex flex-col relative overflow-hidden group border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <span className="material-symbols-outlined text-purple-600">female</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-purple-700 font-bold bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                STEM Focused
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900">Women in STEM</h2>
            <p className="text-slate-600 text-sm mb-6 leading-snug">
              Navigate hierarchical academic environments and scientific leadership challenges.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Module Curriculum</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-500 text-lg">shield_person</span>
                <span className="text-sm text-slate-700">Overcoming institutional resistance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-500 text-lg">diversity_3</span>
                <span className="text-sm text-slate-700">Countering systemic gender bias</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-500 text-lg">account_tree</span>
                <span className="text-sm text-slate-700">Navigating complex lab hierarchies</span>
              </div>
            </div>
            <Link
              href="/scenarios"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all"
            >
              <span>Select Path</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
            </Link>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 flex flex-col relative overflow-hidden group border border-slate-100 shadow-sm opacity-60 pointer-events-none">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="material-symbols-outlined text-blue-600">forum</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-blue-700 font-bold bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                General
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900">Professional Growth</h2>
            <p className="text-slate-600 text-sm mb-6 leading-snug">
              General workplace communication and strategic negotiation for career advancement.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Module Curriculum</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 text-lg">payments</span>
                <span className="text-sm text-slate-700">Salary &amp; equity negotiation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 text-lg">trending_up</span>
                <span className="text-sm text-slate-700">Performance review mastery</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-500 text-lg">psychology</span>
                <span className="text-sm text-slate-700">Strategic active listening</span>
              </div>
            </div>
            <button className="w-full bg-slate-50 text-slate-400 font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 border border-slate-100">
              <span>Coming Soon</span>
              <span className="material-symbols-outlined text-[16px]">lock</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
