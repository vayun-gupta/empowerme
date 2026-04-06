import Link from "next/link";
import React from "react";

interface ScenarioCardProps {
  title: string;
  difficulty: "Beginner" | "Moderate" | "Advanced";
  time: string;
  level: string;
  description: string;
  imageUrl: string;
  href: string;
  badgeContent: string;
}

export default function ScenarioCard({
  title,
  difficulty,
  time,
  level,
  description,
  imageUrl,
  href,
  badgeContent
}: ScenarioCardProps) {
  
  const badgeClassMap = {
    Beginner: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Moderate: "bg-amber-50 text-amber-700 border border-amber-200",
    Advanced: "bg-rose-50 text-rose-700 border border-rose-200"
  };

  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl p-5 flex gap-5 items-start cursor-pointer transition-all active:scale-[0.98] group border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-[2px]">
        <div className="overflow-hidden rounded-xl shrink-0">
          <div
            className="size-20 md:size-24 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          ></div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h4 className="text-[15px] font-semibold text-slate-900 leading-tight">{title}</h4>
            <span className={`${badgeClassMap[difficulty]} px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0`}>
              {difficulty}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-blue-500">schedule</span>
              <span className="text-[11px] font-medium">{time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-purple-500">military_tech</span>
              <span className="text-[11px] font-medium">{level}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex -space-x-1.5 shrink-0">
              <div className="size-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <span className="text-[8px] font-bold">{badgeContent}</span>
              </div>
            </div>
            <span className="text-xs text-slate-500 leading-snug line-clamp-2">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
