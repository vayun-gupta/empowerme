import Link from "next/link";
import React from "react";

export default function PreviewPage() {
  return (
    <>
      <div className="min-h-screen flex justify-center overflow-y-auto w-full bg-slate-50">
        <div className="relative flex min-h-screen flex-col w-full max-w-5xl mx-auto px-6 py-8 overflow-hidden bg-slate-50">
          <header className="pt-12 px-6 flex justify-between items-start z-10 w-full mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-tighter">EmpowerMe</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full">
                  <span className="size-1.5 bg-emerald-500 rounded-full"></span>
                  <span className="text-emerald-700 text-[10px] font-bold uppercase">Practice High-Stakes Leadership Conversations</span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">EmpowerMe Simulation</h1>
            </div>
            <Link href="/scenarios" className="size-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </Link>
          </header>

          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img alt="Context background" className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADN5IjmjH-LFf3HMtHMWWumuKdsdBFnO33N7xFLEUOGm9SzCh2YkMCciqLFqDNYpBdcuDvTSFtNcNt5aialtx2rc9GOGCJ1W4WgoSYqSXpG_DW7d-rwgYJJnjthEISt_y5gNJm8nqMgRizKV6-OknlWzTgjevIPaj3EF-5g3PGgd_MOZ5t1Z4IhrQgS4o_QUoy6BKzEqMYDxY0oihmrVEAuaTleI7B8fvY6dVpkvDYAVsqTU6Tdz6uPO7sLLxmKA7Jk5l2aN6JCXOx" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-50"></div>
          </div>

          <main className="relative z-10 flex-1 overflow-y-auto px-0 md:px-6 pt-12 pb-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="space-y-10 lg:col-span-2">
                <section className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="material-symbols-outlined text-blue-600">hub</span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Current Scenario</h2>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900 border-b border-slate-100 pb-4">Leadership Readiness Review</h3>
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-6 mt-4">
                    You are discussing leadership opportunities after meeting all formal performance benchmarks. The reviewer introduces concerns about your <span className="text-slate-900 font-semibold">visibility</span> and <span className="text-slate-900 font-semibold">institutional presence</span> instead of measurable output.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block mb-1 uppercase tracking-tighter">Stakeholder</span>
                      <span className="text-xs font-semibold text-slate-900">Senior Review Committee Member</span>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-2xl border border-orange-100">
                      <span className="text-[10px] text-orange-600/70 block mb-1 uppercase tracking-tighter">Complexity</span>
                      <span className="text-xs font-semibold text-orange-700">Moderate-High Institutional Resistance</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-end justify-between px-2 mb-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Resistance Cards</h2>
                    <span className="text-[10px] font-mono font-bold text-red-500 bg-red-50/50 px-2 py-0.5 rounded border border-red-100">3 ACTIVE THREATS</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 flex items-center gap-5">
                      <div className="size-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                        <span className="material-symbols-outlined">shield</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">Evaluation Reframing</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Shifts criteria from measurable output</span>
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Prioritizes informal visibility signals</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 flex items-center gap-5">
                      <div className="size-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">Credibility Challenges</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Subtly questions leadership readiness</span>
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Tests confidence under ambiguity</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-5 flex items-center gap-5">
                      <div className="size-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                        <span className="material-symbols-outlined">bolt</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900">Procedural Barriers</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Delays decisions through process steps</span>
                          <span className="text-[10px] bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600">• Redirects toward committee timelines</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6 lg:col-span-1">
                <section className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-lg">psychology</span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Adversary Protocol</p>
                      <p className="text-xs text-slate-600 leading-relaxed">Agent is tuned for maximum friction. This session prioritizes growth over comfort. Data is anonymized for psychological safety.</p>
                    </div>
                  </div>
                </section>
                <section className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-6">
                  <Link href="/chat" className="w-full py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-[2px] text-white transition-all">
                    <span className="text-[15px] font-medium tracking-wide">Start Simulation</span>
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </Link>
                  <div className="flex justify-center">
                    <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest flex items-center gap-1.5 py-1">
                      View Training Framework
                      <span className="material-symbols-outlined text-[10px]">arrow_forward_ios</span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
