import React from "react";
import Link from "next/link";
import ChatBox from "@/components/chat/ChatBox";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center w-full">
      <div className="relative flex min-h-screen flex-col w-full max-w-5xl mx-auto px-6 py-8 bg-slate-50 shadow-sm border-x border-slate-200 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div className="h-full bg-primary w-[65%]"></div>
        </div>

        <header className="flex items-center bg-slate-50/90 backdrop-blur-md p-4 pt-6 justify-between shrink-0 border-b border-slate-200 relative z-40">
          <div className="flex items-center gap-3">
            <div className="text-slate-700 flex size-9 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
              <span className="material-symbols-outlined">shield_person</span>
            </div>
            <div>
              <h2 className="text-slate-900 text-sm font-bold leading-tight tracking-tight uppercase">
                EmpowerMe Simulation
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Practice High-Stakes Leadership Conversations
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard" className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200 hover:bg-white">
              <span className="material-symbols-outlined text-[20px]">pause</span>
            </Link>
          </div>
        </header>

        <div className="flex items-center justify-center gap-4 py-3 px-4 bg-white border-b border-slate-200 z-40 relative">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">pause_circle</span> Pause
          </Link>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">restart_alt</span> Restart
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">trending_down</span> Lower Intensity
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 bg-slate-50 w-full relative z-30">
          <aside className="hidden lg:block p-4 border-r border-slate-200">
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-3 sticky top-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Scenario
              </p>
              <h3 className="text-base font-bold text-slate-900">Leadership Readiness Review</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
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
