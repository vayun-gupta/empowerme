"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showNav?: boolean;
}

export default function MainLayout({ children, showHeader = true, showNav = true }: LayoutProps) {
  const pathname = usePathname();
  const simsActive = pathname.startsWith("/scenarios");
  const progressActive = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex justify-center bg-slate-50">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden max-w-5xl mx-auto w-full bg-slate-50">
        {showHeader && (
          <header className="sticky top-0 z-30 flex items-center bg-slate-50/80 backdrop-blur-md p-6 pb-4 border-b border-transparent">
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">EmpowerMe</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Practice High-Stakes Leadership Conversations</p>
            </div>
          </header>
        )}

        <main className="flex-1 px-4 lg:px-6 py-2">
          {children}
        </main>

        {showNav && (
          <nav className="sticky bottom-6 max-w-lg w-full mx-auto bg-white/90 backdrop-blur-xl border border-slate-100 rounded-[2rem] flex justify-around py-4 px-8 z-40 mb-6 shadow-xl">
            <Link href="/scenarios" className={`flex flex-col items-center gap-1 ${simsActive ? "text-primary" : "text-slate-400"}`}>
              <div className="relative">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: simsActive ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span>
                {simsActive && <div className="absolute -top-1 -right-1 size-2 rounded-full bg-primary ring-2 ring-white"></div>}
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${simsActive ? "font-bold text-slate-900" : "font-medium"}`}>Sims</span>
            </Link>

            <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${progressActive ? "text-primary" : "text-slate-400"}`}>
              <div className="relative">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: progressActive ? "'FILL' 1" : "'FILL' 0" }}>trending_up</span>
                {progressActive && <div className="absolute -top-1 -right-1 size-2 rounded-full bg-primary ring-2 ring-white"></div>}
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${progressActive ? "font-bold text-slate-900" : "font-medium"}`}>Progress</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
