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
    Beginner: "neon-badge-beginner",
    Moderate: "neon-badge-moderate",
    Advanced: "neon-badge-tough"
  };

  return (
    <Link href={href}>
      <div className="glass-card rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-transform active:scale-95 group hover:border-primary/50">
        <div
          className="size-20 shrink-0 rounded-xl bg-cover bg-center group-hover:scale-105 transition-transform"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        <div className="flex-1 flex flex-col justify-between h-20">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-bold line-clamp-1">{title}</h4>
            <span className={`${badgeClassMap[difficulty]} px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter`}>
              {difficulty}
            </span>
          </div>
          <div className="flex gap-3 text-gray-500 mb-1">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <span className="text-[10px]">{time}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">bar_chart</span>
              <span className="text-[10px]">{level}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="size-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-[6px] font-bold">{badgeContent}</span>
              </div>
            </div>
            <span className="text-[9px] text-gray-400 font-medium italic line-clamp-1">{description}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
