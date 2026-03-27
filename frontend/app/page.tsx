import Link from "next/link";
import React from "react";

export default function LandingPage() {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden p-6 pb-10">
        <header className="flex flex-col items-center justify-center pt-10 pb-10">
          <div className="mb-5 inline-flex items-center justify-center p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
            <span className="material-symbols-outlined text-indigo-400 text-3xl">hub</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            EmpowerMe
          </h1>
          <p className="text-gray-400 text-center max-w-xs leading-relaxed text-sm">
            Practice High-Stakes Leadership Conversations. Prepare for the conversations that define your leadership trajectory.
            <br />
            AI-powered simulation for real-world leadership interactions.
          </p>
        </header>
        <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
          <div className="glass-card bg-card-bg rounded-2xl p-7 glow-purple flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/15 blur-[60px] -z-10"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/20">
                <span className="material-symbols-outlined text-purple-400">female</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold bg-purple-500/20 px-3 py-1.5 rounded-full border border-purple-500/30">
                STEM Focused
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Women in STEM</h2>
            <p className="text-gray-400 text-sm mb-6 leading-snug">
              Navigate hierarchical academic environments and scientific leadership challenges.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Module Curriculum</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-400 text-lg">shield_person</span>
                <span className="text-sm text-gray-300">Overcoming institutional resistance</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-400 text-lg">diversity_3</span>
                <span className="text-sm text-gray-300">Countering systemic gender bias</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-400 text-lg">account_tree</span>
                <span className="text-sm text-gray-300">Navigating complex lab hierarchies</span>
              </div>
            </div>
            <Link
              href="/scenarios"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
            >
              <span>Select Path</span>
              <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </Link>
          </div>
          <div className="glass-card bg-card-bg rounded-2xl p-7 glow-cyan flex flex-col relative overflow-hidden group opacity-50 pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/15 blur-[60px] -z-10"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/20">
                <span className="material-symbols-outlined text-cyan-400">forum</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold bg-cyan-500/20 px-3 py-1.5 rounded-full border border-cyan-500/30">
                General
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Professional Growth</h2>
            <p className="text-gray-400 text-sm mb-6 leading-snug">
              General workplace communication and strategic negotiation for career advancement.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Module Curriculum</p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-cyan-400 text-lg">payments</span>
                <span className="text-sm text-gray-300">Salary &amp; equity negotiation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-cyan-400 text-lg">trending_up</span>
                <span className="text-sm text-gray-300">Performance review mastery</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-cyan-400 text-lg">psychology</span>
                <span className="text-sm text-gray-300">Strategic active listening</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40 transition-all active:scale-[0.98]">
              <span>Coming Soon</span>
              <span className="material-symbols-outlined text-sm">lock</span>
            </button>
          </div>
        </div>
        <footer className="mt-auto py-10 text-center">
          <div className="flex justify-center gap-8 mb-6 opacity-40">
            <span className="material-symbols-outlined text-gray-300">science</span>
            <span className="material-symbols-outlined text-gray-300">biotech</span>
            <span className="material-symbols-outlined text-gray-300">terminal</span>
          </div>
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium">
            System Core v4.0.2 // Protocol 2030-PX
          </p>
        </footer>
      </div>
    </>
  );
}
