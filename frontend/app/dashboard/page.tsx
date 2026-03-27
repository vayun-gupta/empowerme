import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function DashboardPage() {
  return (
    <Layout showHeader={false} showNav={true}>
      <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-12">
        {/* Top App Bar */}
        <div className="flex items-center pt-2 pb-4 justify-between sticky top-0 z-10 bg-[#0a0a0c]/80 backdrop-blur-md">
          <div className="flex size-12 shrink-0 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/50 shadow-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA8h-8fz5sT0rMfkhZgnlsM5_kQ0lJ2Zi11Pr_wlyfYwBaXXrKmIGJbbYIzD5A9Fcklf3pvg5QP1gzb395wgKO7PgcKQZbfDwdpm1wKr74ouCYp6Ni1sn_krnypuohmX80oCGJku-NHFhHU_ejAE-gV7o9oJKXaITKUNsJOP1TgOB9M2Tz6gdFC9CnKl93FuBxPjgns-7dlQNJy_fgCMeViOegGWtxvO7oOqv5LFzwC77HgINkeMUjBjP7vGkIeWbuH2EjerdwGObC3")',
              }}
            ></div>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 ml-3">
            Growth Dashboard
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white/5 text-white hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="glass-card flex flex-col gap-2 rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-16 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
            <p className="text-gray-400 text-sm font-medium">Communication Mastery</p>
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-bold leading-tight">88%</p>
              <p className="text-primary text-sm font-bold flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                +5%
              </p>
            </div>
          </div>
          <div className="glass-card flex flex-col gap-2 rounded-xl p-5">
            <p className="text-gray-400 text-sm font-medium">Practice Streak</p>
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-bold leading-tight">12 Days</p>
              <p className="text-primary text-sm font-bold flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs mr-1">bolt</span>
                Active
              </p>
            </div>
          </div>
          <div className="glass-card flex flex-col gap-2 rounded-xl p-5">
            <p className="text-gray-400 text-sm font-medium">Skill Progress</p>
            <div className="flex items-end justify-between">
              <p className="text-white text-3xl font-bold leading-tight text-nowrap">Level 14</p>
              <p className="text-primary text-sm font-bold flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs mr-1">military_tech</span>
                Expert
              </p>
            </div>
          </div>
        </div>

        {/* Exposure Intensity Chart Section */}
        <div className="py-2 mt-4">
          <div className="glass-card rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white text-lg font-bold">Exposure Intensity</h3>
                <p className="text-gray-400 text-sm">Interaction volume over time</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl font-bold">High</p>
                <p className="text-xs text-gray-500 font-medium">Last 7 Days</p>
              </div>
            </div>
            <div className="flex min-h-[160px] flex-1 flex-col gap-6">
              <svg
                className="drop-shadow-[0_0_8px_rgba(6,208,249,0.3)]"
                fill="none"
                height="120"
                preserveAspectRatio="none"
                viewBox="-3 0 478 150"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                  fill="url(#paint0_linear)"
                ></path>
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#06d0f9"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear"
                    x1="236"
                    x2="236"
                    y1="1"
                    y2="149"
                  >
                    <stop stopColor="#06d0f9" stopOpacity="0.3"></stop>
                    <stop offset="1" stopColor="#06d0f9" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-between px-2">
                <p className="text-gray-500 text-[11px] font-bold">MON</p>
                <p className="text-gray-500 text-[11px] font-bold">TUE</p>
                <p className="text-gray-500 text-[11px] font-bold">WED</p>
                <p className="text-gray-500 text-[11px] font-bold">THU</p>
                <p className="text-gray-500 text-[11px] font-bold">FRI</p>
                <p className="text-gray-500 text-[11px] font-bold">SAT</p>
                <p className="text-primary text-[11px] font-bold">SUN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scenarios Section */}
        <h3 className="text-white text-lg font-bold px-1 pb-4 pt-6">Recent Scenarios</h3>
        <div className="space-y-3">
          <div className="glass-card flex items-center justify-between p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <p className="text-white font-bold">Salary Negotiation</p>
                <p className="text-gray-500 text-xs">Completed • Score: 92%</p>
              </div>
            </div>
            <button className="text-gray-400">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="glass-card flex items-center justify-between p-4 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <div>
                <p className="text-white font-bold">Handling Criticism</p>
                <p className="text-gray-500 text-xs">Completed • Score: 84%</p>
              </div>
            </div>
            <button className="text-gray-400">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 mb-4">
          <Link
            href="/scenarios"
            className="w-full bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(6,208,249,0.4)] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">play_circle</span>
            Start Practice Session
          </Link>
        </div>
      </div>
    </Layout>
  );
}
