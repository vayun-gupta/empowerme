import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ScenarioCard from "@/components/scenarios/ScenarioCard";
import Link from "next/link";

export default function ScenariosPage() {
  return (
    <MainLayout>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-2 py-2 mb-6">
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-slate-900 px-5 shadow-sm text-white">
          <p className="text-sm font-semibold">Credibility Challenges</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 px-5 shadow-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <p className="text-sm font-medium">Evaluation Reframing</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 px-5 shadow-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <p className="text-sm font-medium">Procedural Barriers</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 px-5 shadow-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <p className="text-sm font-medium">Influence &amp; Positioning</p>
        </button>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Next Recommended</h2>
          <span className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4"></span>
        </div>
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative max-w-3xl mx-auto group">
          <div className="absolute top-0 right-0 p-3 z-10">
            <span className="border border-rose-200 text-rose-700 bg-rose-50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">Advanced</span>
          </div>
          <div className="w-full h-[240px] md:h-[300px] bg-center mb-0 bg-no-repeat bg-cover rounded-xl group-hover:scale-105 transition-transform duration-700 opacity-90" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk-nGcuWxc6sUXHWA4CkJrwU0PZG2z1QJkl9yk593P_zRBlHAkW01mEkFxPfLdKfQ35Lqgxh8S-V_-vsRtnPE85s-FYR0HHDQZNP8DxwT24Dodzix2kRa0U0KNeVocitAQmZK975gRarVt-bqjP2vtWQLkmFlUaEqih1IQq-Jfry1GcQt7NVtDFdZIr2xOXewqaR_C2msTASZ4BWRkSqIxf68gHhjymXhaX13GJRF1QH2SnyBtO90uSdAx-iIjmFDOYspH9reJ3vm_")' }}></div>
          <div className="p-8 space-y-6 relative z-20 bg-white border-t border-slate-100 -mt-4 rounded-t-3xl">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold leading-tight text-slate-900 border-b border-slate-100 pb-3">Leadership Readiness Review</h3>
              <div className="flex items-center gap-5 mt-2 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-blue-500">schedule</span>
                  <span className="text-xs font-medium">10-12 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-purple-500">military_tech</span>
                  <span className="text-xs font-medium">Advanced</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">What you’ll practice</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-[15px] text-slate-600">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Responding to shifting evaluation criteria
                </li>
                <li className="flex items-start gap-2 text-[15px] text-slate-600">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Handling ambiguous leadership feedback
                </li>
                <li className="flex items-start gap-2 text-[15px] text-slate-600">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Asserting contributions without escalation
                </li>
              </ul>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">Navigate a promotion evaluation conversation where criteria shift and contributions are questioned.</p>
            <Link href="/preview" className="w-auto px-10 py-3 mx-auto flex items-center justify-center bg-primary text-white hover:bg-blue-700 rounded-xl font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all max-w-sm mt-6">
              Continue Practice
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">More Practice Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScenarioCard
            title="Committee Presence Framing"
            difficulty="Moderate"
            time="10-12m"
            level="Advanced"
            description="Reframe your contributions in a decision-making committee where your presence is minimized."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_sUCbFiFuBVvbWInBuTSsD8ol4kzEEblcFvtQX-wHwAVAll5sDTjsoB3Ru2FoPvAgdmlQWimpWGR4AedJRaTnINDplKs19iHGy8L0jWfbzs5Rhq8mKGmaUPurq2FJGd075TqkqhqOa6-fHG3BaAa0p13HWqjL4PPM8DUhXpcPZfynccRLmCrnrbXdmc890TKG3D-NNMehRi9N0fBg5Zpwd9VMhb_O2uPFP90oYm9wzvgtzjgPZLZ2TX3f0BVJI-zjC6ciw7LQPco"
            href="/preview"
            badgeContent="A C"
          />
          <ScenarioCard
            title="Budget Pushback Negotiation"
            difficulty="Beginner"
            time="10-12m"
            level="Advanced"
            description="Reframe funding priorities during pushback when committee members question the need for your budgeted initiatives."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3nbzEHImTJjSBF3uoEICisBixhzxgqHDM5sm-p5GD7TE4JNyaj24eOhJJ5Pxwv-tkD7ivco2cveKtJ31oGqqc3Pm5nibu5FeJMapBgG3aXuSIiKGBXS4vXjwaJNPDo_Fom_hZd72T8G2fK8vhJr2KlFJ2Xv3FOvskqXCmuBlFe_xiIAisdFVJExdj7GBUOo3foSFjrAwxQDeWDsifUTTQI1D05kfx5lTVMwejHOq8FwEcqnNUFBNoG46hDQOqe-ZRj74C9mDnR4N"
            href="/preview"
            badgeContent="B"
          />
          <ScenarioCard
            title="Cross-Team Credit Attribution"
            difficulty="Beginner"
            time="10-12m"
            level="Advanced"
            description="Reframe visible credit across teams when leadership asks whose work is most influential."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3nbzEHImTJjSBF3uoEICisBixhzxgqHDM5sm-p5GD7TE4JNyaj24eOhJJ5Pxwv-tkD7ivco2cveKtJ31oGqqc3Pm5nibu5FeJMapBgG3aXuSIiKGBXS4vXjwaJNPDo_Fom_hZd72T8G2fK8vhJr2KlFJ2Xv3FOvskqXCmuBlFe_xiIAisdFVJExdj7GBUOo3foSFjrAwxQDeWDsifUTTQI1D05kfx5lTVMwejHOq8FwEcqnNUFBNoG46hDQOqe-ZRj74C9mDnR4N"
            href="/preview"
            badgeContent="C"
          />
          <ScenarioCard
            title="Strategic Alignment Challenge"
            difficulty="Beginner"
            time="10-12m"
            level="Advanced"
            description="Reframe your intent and impact to align with committee expectations for leadership readiness."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAo3nbzEHImTJjSBF3uoEICisBixhzxgqHDM5sm-p5GD7TE4JNyaj24eOhJJ5Pxwv-tkD7ivco2cveKtJ31oGqqc3Pm5nibu5FeJMapBgG3aXuSIiKGBXS4vXjwaJNPDo_Fom_hZd72T8G2fK8vhJr2KlFJ2Xv3FOvskqXCmuBlFe_xiIAisdFVJExdj7GBUOo3foSFjrAwxQDeWDsifUTTQI1D05kfx5lTVMwejHOq8FwEcqnNUFBNoG46hDQOqe-ZRj74C9mDnR4N"
            href="/preview"
            badgeContent="D"
          />
        </div>
      </div>
    </MainLayout>
  );
}
