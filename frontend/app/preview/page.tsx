import Link from "next/link";
import React from "react";

export default function PreviewPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --ios-safe-bottom: env(safe-area-inset-bottom, 20px);
        }
        .ios-blur {
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
        }
        .glass-panel {
            background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .luminous-button {
            background: linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%);
            box-shadow: 0 0 20px rgba(79, 70, 229, 0.4), inset 0 1px 1px rgba(255,255,255,0.3);
        }
        .resistance-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            transition: all 0.2s ease;
        }
        body {
            background-color: #0B0E14;
            background-image: 
                radial-gradient(circle at 50% -20%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.05) 0%, transparent 40%);
        }
        .scan-line {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.3), transparent);
        }
      ` }} />
      <div className="min-h-screen flex justify-center overflow-y-auto w-full">
        <div className="relative flex min-h-screen flex-col w-full max-w-5xl mx-auto px-6 py-8 overflow-hidden">
          <header className="pt-12 px-6 flex justify-between items-start z-10 w-full mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/30 uppercase tracking-tighter">EmpowerMe</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="size-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-[10px] font-bold uppercase">Practice High-Stakes Leadership Conversations</span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white/95">EmpowerMe Simulation</h1>
            </div>
            <Link href="/scenarios" className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </Link>
          </header>

          <div className="absolute inset-0 z-0 opacity-40">
            <img alt="Context background" className="w-full h-[240px] md:h-[300px] object-cover rounded-xl grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADN5IjmjH-LFf3HMtHMWWumuKdsdBFnO33N7xFLEUOGm9SzCh2YkMCciqLFqDNYpBdcuDvTSFtNcNt5aialtx2rc9GOGCJ1W4WgoSYqSXpG_DW7d-rwgYJJnjthEISt_y5gNJm8nqMgRizKV6-OknlWzTgjevIPaj3EF-5g3PGgd_MOZ5t1Z4IhrQgS4o_QUoy6BKzEqMYDxY0oihmrVEAuaTleI7B8fvY6dVpkvDYAVsqTU6Tdz6uPO7sLLxmKA7Jk5l2aN6JCXOx" />
            <div className="absolute inset-0 bg-gradient-to-b from-chat-bg-dark via-[#0B0E14]/80 to-[#0B0E14]"></div>
          </div>

          <main className="relative z-10 flex-1 overflow-y-auto px-0 md:px-6 pt-8 pb-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              <div className="space-y-8 lg:col-span-2">
                <section className="glass-panel rounded-3xl p-6 relative overflow-hidden">
                  <div className="scan-line absolute top-0 left-0"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-primary">hub</span>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Current Scenario</h2>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Leadership Readiness Review</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    You are discussing leadership opportunities after meeting all formal performance benchmarks. The reviewer introduces concerns about your <span className="text-white font-semibold">visibility</span> and <span className="text-white font-semibold">institutional presence</span> instead of measurable output.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[10px] text-white/40 block mb-1 uppercase tracking-tighter">Stakeholder</span>
                      <span className="text-xs font-semibold">Senior Review Committee Member</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                      <span className="text-[10px] text-white/40 block mb-1 uppercase tracking-tighter">Complexity</span>
                      <span className="text-xs font-semibold text-orange-400">Moderate-High Institutional Resistance</span>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-end justify-between px-1">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Resistance Cards</h2>
                    <span className="text-[10px] font-mono text-primary">3 ACTIVE THREATS</span>
                  </div>
                  <div className="grid gap-3">
                    <div className="resistance-card rounded-2xl p-4 flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                        <span className="material-symbols-outlined">shield</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">Evaluation Reframing</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Shifts criteria from measurable output</span>
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Prioritizes informal visibility signals</span>
                        </div>
                      </div>
                    </div>
                    <div className="resistance-card rounded-2xl p-4 flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                        <span className="material-symbols-outlined">hourglass_empty</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">Credibility Challenges</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Subtly questions leadership readiness</span>
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Tests confidence under ambiguity</span>
                        </div>
                      </div>
                    </div>
                    <div className="resistance-card rounded-2xl p-4 flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                        <span className="material-symbols-outlined">bolt</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">Procedural Barriers</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Delays decisions through process steps</span>
                          <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-white/40">• Redirects toward committee timelines</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6 lg:col-span-1">
                <section className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-primary/70 text-lg">psychology</span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest">Adversary Protocol</p>
                      <p className="text-xs text-white/40 leading-relaxed">Agent is tuned for maximum friction. This session prioritizes growth over comfort. Data is anonymized for psychological safety.</p>
                    </div>
                  </div>
                </section>
                <section className="ios-blur bg-panel-bg/40 border border-white/10 rounded-[2rem] p-4 shadow-2xl space-y-3">
                  <Link href="/chat" className="luminous-button w-auto px-8 py-3 mx-auto flex items-center justify-center gap-3 rounded-2xl active:scale-[0.97] transition-all">
                    <span className="text-base font-bold tracking-tight text-white">Start Simulation</span>
                    <span className="material-symbols-outlined text-lg text-white">bolt</span>
                  </Link>
                  <div className="flex justify-center">
                    <button className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2 py-1">
                      View Training Framework
                      <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
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
