import React from "react";
import Layout from "@/components/Layout";
import ScenarioCard from "@/components/ScenarioCard";
import Link from "next/link";

export default function ScenariosPage() {
  return (
    <Layout>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-2 py-2 mb-6">
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-5 shadow-lg shadow-primary/20">
          <p className="text-sm font-semibold">Credibility Challenges</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full glass-card px-5">
          <p className="text-sm font-medium text-gray-400">Evaluation Reframing</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full glass-card px-5">
          <p className="text-sm font-medium text-gray-400">Procedural Barriers</p>
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center rounded-full glass-card px-5">
          <p className="text-sm font-medium text-gray-400">Influence &amp; Positioning</p>
        </button>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Next Recommended</h2>
          <span className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></span>
        </div>
        <div className="glass-card recommended-glow rounded-3xl overflow-hidden border-primary/30 relative max-w-3xl mx-auto group">
          <div className="absolute top-0 right-0 p-3 z-10">
            <span className="border border-rose-500/50 text-rose-400 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.2)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Advanced</span>
          </div>
          <div className="w-full h-[240px] md:h-[300px] bg-center mb-0 bg-no-repeat bg-cover rounded-xl opacity-80 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDk-nGcuWxc6sUXHWA4CkJrwU0PZG2z1QJkl9yk593P_zRBlHAkW01mEkFxPfLdKfQ35Lqgxh8S-V_-vsRtnPE85s-FYR0HHDQZNP8DxwT24Dodzix2kRa0U0KNeVocitAQmZK975gRarVt-bqjP2vtWQLkmFlUaEqih1IQq-Jfry1GcQt7NVtDFdZIr2xOXewqaR_C2msTASZ4BWRkSqIxf68gHhjymXhaX13GJRF1QH2SnyBtO90uSdAx-iIjmFDOYspH9reJ3vm_")' }}></div>
          <div className="p-4 space-y-4 relative z-20 bg-[#0a0a0c]/80 backdrop-blur-sm -mt-2">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold leading-tight">Leadership Readiness Review</h3>
              <div className="flex items-center gap-4 mt-1 text-gray-400">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#00f5ff]">schedule</span>
                  <span className="text-xs font-medium">10-12 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#00f5ff]">bar_chart</span>
                  <span className="text-xs font-medium">Advanced</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">What you’ll practice</p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-primary mt-1">•</span>
                  Responding to shifting evaluation criteria
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-primary mt-1">•</span>
                  Handling ambiguous leadership feedback
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-primary mt-1">•</span>
                  Asserting contributions without escalation
                </li>
              </ul>
            </div>
            <p className="text-xs text-gray-400">Navigate a promotion evaluation conversation where criteria shift and contributions are questioned.</p>
            <Link href="/preview" className="w-auto px-8 py-3 mx-auto flex items-center justify-center bg-white text-black rounded-2xl font-bold text-sm shadow-xl shadow-white/5 active:scale-95 transition-transform max-w-xs">
              Continue Practice
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">More Practice Modules</h2>
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
    </Layout>
  );
}
