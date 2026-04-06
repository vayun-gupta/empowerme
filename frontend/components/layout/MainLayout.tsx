import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
}

export default function MainLayout({ children, showHeader = true, showNav = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex justify-center bg-slate-50">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden max-w-5xl mx-auto w-full bg-slate-50">
        {showHeader && (
          <header className="sticky top-0 z-30 flex items-center bg-slate-50/80 backdrop-blur-md p-6 pb-4 justify-between border-b border-transparent">
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">EmpowerMe</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Practice High-Stakes Leadership Conversations</p>
            </div>
            <div className="flex gap-3">
              <button className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <span className="material-symbols-outlined text-xl">search</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <span className="material-symbols-outlined text-xl">tune</span>
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 px-4 lg:px-6 py-2">
          {children}
        </main>

        {showNav && (
          <nav className="sticky bottom-6 max-w-lg w-full mx-auto bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[2rem] flex justify-around py-4 px-8 z-40 mb-6 shadow-xl">
            <Link href="/scenarios" className="flex flex-col items-center gap-1 text-primary">
              <div className="relative">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                <div className="absolute -top-1 -right-1 size-2 rounded-full bg-primary ring-2 ring-white"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Sims</span>
            </Link>
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">timeline</span>
              <span className="text-[10px] font-medium uppercase tracking-wider">Stats</span>
            </Link>
            <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              <span className="text-[10px] font-medium uppercase tracking-wider">Skills</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-2xl">person</span>
              <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
