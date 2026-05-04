"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ScenarioCard from "@/components/scenarios/ScenarioCard";
import { getScenarios, ScenarioData } from "@/lib/api";

type UserRole = "Faculty" | "Staff" | "Grad Student" | "UG Student";

const ROLE_SCENARIO_MAP: Record<UserRole, number[]> = {
  "Faculty":      [1, 2, 3, 4, 5],
  "Staff":        [1, 4, 5],
  "Grad Student": [2, 3, 5],
  "UG Student":   [5],
};

const SCENARIO_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDk-nGcuWxc6sUXHWA4CkJrwU0PZG2z1QJkl9yk593P_zRBlHAkW01mEkFxPfLdKfQ35Lqgxh8S-V_-vsRtnPE85s-FYR0HHDQZNP8DxwT24Dodzix2kRa0U0KNeVocitAQmZK975gRarVt-bqjP2vtWQLkmFlUaEqih1IQq-Jfry1GcQt7NVtDFdZIr2xOXewqaR_C2msTASZ4BWRkSqIxf68gHhjymXhaX13GJRF1QH2SnyBtO90uSdAx-iIjmFDOYspH9reJ3vm_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_sUCbFiFuBVvbWInBuTSsD8ol4kzEEblcFvtQX-wHwAVAll5sDTjsoB3Ru2FoPvAgdmlQWimpWGR4AedJRaTnINDplKs19iHGy8L0jWfbzs5Rhq8mKGmaUPurq2FJGd075TqkqhqOa6-fHG3BaAa0p13HWqjL4PPM8DUhXpcPZfynccRLmCrnrbXdmc890TKG3D-NNMehRi9N0fBg5Zpwd9VMhb_O2uPFP90oYm9wzvgtzjgPZLZ2TX3f0BVJI-zjC6ciw7LQPco",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAo3nbzEHImTJjSBF3uoEICisBixhzxgqHDM5sm-p5GD7TE4JNyaj24eOhJJ5Pxwv-tkD7ivco2cveKtJ31oGqqc3Pm5nibu5FeJMapBgG3aXuSIiKGBXS4vXjwaJNPDo_Fom_hZd72T8G2fK8vhJr2KlFJ2Xv3FOvskqXCmuBlFe_xiIAisdFVJExdj7GBUOo3foSFjrAwxQDeWDsifUTTQI1D05kfx5lTVMwejHOq8FwEcqnNUFBNoG46hDQOqe-ZRj74C9mDnR4N",
];

const DIFFICULTY_BADGE: Record<string, string> = {
  Advanced: "border-rose-200 text-rose-700 bg-rose-50",
  Moderate:  "border-amber-200 text-amber-700 bg-amber-50",
  Beginner:  "border-emerald-200 text-emerald-700 bg-emerald-50",
};

export default function ScenariosPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    getScenarios()
      .then(setScenarios)
      .catch((err) => { console.error(err); setFetchError(String(err)); })
      .finally(() => setLoading(false));
  }, []);

  const roles: UserRole[] = ["Faculty", "Staff", "Grad Student", "UG Student"];

  const filtered = selectedRole
    ? scenarios.filter(s => ROLE_SCENARIO_MAP[selectedRole].includes(s.scenario_id))
    : scenarios;

  const [featured, ...rest] = filtered;

  return (
    <MainLayout>

      {/* Role selector */}
      <div className="mb-7">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">I am a</p>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(prev => prev === role ? null : role)}
              className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 shadow-sm text-sm transition-colors ${
                selectedRole === role
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        {!selectedRole && (
          <p className="text-[13px] text-slate-400 mt-2.5">Select your role to see scenarios relevant to you.</p>
        )}
      </div>

      {fetchError && (
        <div className="text-red-500 text-xs text-center py-2 bg-red-50 border border-red-100 rounded-xl px-4 mb-4">
          API error: {fetchError}
        </div>
      )}

      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center">Loading scenarios…</div>
      ) : filtered.length === 0 ? (
        <div className="text-slate-400 text-sm py-12 text-center">No scenarios available for this role yet.</div>
      ) : (
        <>
          {/* Featured / recommended scenario */}
          {featured && (
            <div className="space-y-4 mb-10">
              <div className="flex items-center">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 shrink-0">
                  {selectedRole ? `Recommended for ${selectedRole}` : "Start Here"}
                </h2>
                <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4" />
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative max-w-3xl mx-auto group">
                <div className="absolute top-0 right-0 p-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border ${DIFFICULTY_BADGE[featured.difficulty_level] ?? ""}`}>
                    {featured.difficulty_level}
                  </span>
                </div>
                <div
                  className="w-full h-[240px] md:h-[300px] bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  style={{ backgroundImage: `url("${SCENARIO_IMAGES[(featured.scenario_id - 1) % SCENARIO_IMAGES.length]}")` }}
                />
                <div className="p-8 space-y-4 relative z-20 bg-white border-t border-slate-100 -mt-4 rounded-t-3xl">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold leading-tight text-slate-900 border-b border-slate-100 pb-3">
                      {featured.title}
                    </h3>
                    <div className="flex items-center gap-5 mt-2 text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-blue-500">schedule</span>
                        <span className="text-xs font-medium">{featured.estimated_minutes ?? 10} mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-purple-500">military_tech</span>
                        <span className="text-xs font-medium">{featured.difficulty_level}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {featured.barrier_theme} · {featured.adversary_role}
                  </p>
                  <a
                    href={`/preview?scenario=${featured.scenario_id}`}
                    className="w-auto px-10 py-3 mx-auto flex items-center justify-center bg-slate-900 text-white hover:bg-slate-700 rounded-xl font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all max-w-sm"
                  >
                    Start Practice
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Remaining scenarios */}
          {rest.length > 0 && (
            <div className="space-y-4 mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">More Practice Modules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(scenario => (
                  <ScenarioCard
                    key={scenario.scenario_id}
                    title={scenario.title}
                    difficulty={scenario.difficulty_level as "Beginner" | "Moderate" | "Advanced"}
                    time={`${scenario.estimated_minutes ?? 10} mins`}
                    level={scenario.difficulty_level}
                    description={scenario.barrier_theme}
                    imageUrl={SCENARIO_IMAGES[(scenario.scenario_id - 1) % SCENARIO_IMAGES.length]}
                    href={`/preview?scenario=${scenario.scenario_id}`}
                    badgeContent={scenario.adversary_role.charAt(0)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}
