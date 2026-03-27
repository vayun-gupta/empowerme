import React from "react";
import Link from "next/link";
import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-chat-bg-dark flex justify-center w-full">
      <div className="relative flex min-h-screen flex-col w-full max-w-5xl mx-auto px-6 py-8 bg-chat-bg-dark shadow-2xl overflow-hidden border-x border-white/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
          <div className="h-full progress-shimmer w-[65%]"></div>
        </div>

        <header className="flex items-center bg-chat-bg-dark/80 backdrop-blur-md p-4 pt-6 justify-between shrink-0 border-b border-white/5 relative z-40">
          <div className="flex items-center gap-3">
            <div className="text-white flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10">
              <span className="material-symbols-outlined">shield_person</span>
            </div>
            <div>
              <h2 className="text-white text-sm font-bold leading-tight tracking-tight uppercase">
                EmpowerMe Simulation
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Practice High-Stakes Leadership Conversations
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard" className="p-2 rounded-full text-slate-400 hover:text-white transition-all border border-transparent hover:border-white/10 hover:bg-white/5">
              <span className="material-symbols-outlined text-[20px]">pause</span>
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-center gap-4 py-3 px-4 bg-white/5 border-b border-white/5">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">pause_circle</span> Pause
          </Link>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">restart_alt</span> Restart
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-400 border border-white/10 hover:bg-white/10 transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">trending_down</span> Lower Intensity
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 bg-gradient-to-b from-chat-bg-dark to-black/20 w-full relative z-30">
          <aside className="hidden lg:block p-4 border-r border-white/5">
            <div className="glass rounded-2xl p-4 space-y-3 sticky top-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Scenario
              </p>
              <h3 className="text-base font-bold text-white">Leadership Readiness Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subtle institutional resistance appears through visibility and presence framing rather than measurable output criteria.
              </p>
            </div>
          </aside>

          <ChatBox />
        </div>
      </div>
    </div>
  );
}
