import Link from "next/link";
import React from "react";

interface ScenarioCardProps {
  scenarioId: number;
  title: string;
  difficulty: string;
  time: string;
  description: string;
  adversaryRole: string;
  href: string;
}

export const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: "bg-primary-fixed text-on-primary-fixed-variant",
  Moderate: "bg-secondary-container text-on-secondary-container",
  Advanced: "bg-error-container text-on-error-container",
};

// Deterministic gradient placeholder per scenario — no hotlinked imagery
export const SCENARIO_GRADIENTS = [
  "from-primary-fixed via-surface to-secondary-container",
  "from-secondary-container via-surface to-primary-fixed",
  "from-tertiary-container via-surface to-primary-fixed",
  "from-primary-fixed via-tertiary-container to-surface",
];

export const SCENARIO_ICONS = ["forum", "gavel", "payments", "diversity_3", "campaign"];

export function scenarioGradient(id: number) {
  return SCENARIO_GRADIENTS[(id - 1) % SCENARIO_GRADIENTS.length];
}

export function scenarioIcon(id: number) {
  return SCENARIO_ICONS[(id - 1) % SCENARIO_ICONS.length];
}

export default function ScenarioCard({
  scenarioId,
  title,
  difficulty,
  time,
  description,
  adversaryRole,
  href,
}: ScenarioCardProps) {
  return (
    <div className="glass-card rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`h-36 w-full relative bg-gradient-to-br ${scenarioGradient(scenarioId)} flex items-center justify-center`}
      >
        <div className="plaid-accent" />
        <span className="material-symbols-outlined text-5xl text-primary/60">
          {scenarioIcon(scenarioId)}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow bg-white/50">
        <div className="flex justify-between items-start mb-3 gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${DIFFICULTY_BADGE[difficulty] ?? "bg-surface-container text-on-surface-variant"}`}
          >
            {difficulty}
          </span>
          <span className="text-on-surface-variant text-xs flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[14px]">timer</span> {time}
          </span>
        </div>
        <h4 className="text-lg font-bold text-primary mb-1 leading-snug">{title}</h4>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">{description}</p>
        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center gap-2">
          <span className="text-xs text-secondary font-bold truncate">{adversaryRole}</span>
          <Link
            href={href}
            className="text-primary font-semibold text-sm flex items-center hover:translate-x-1 transition-transform shrink-0"
          >
            Explore
            <span className="material-symbols-outlined text-[18px] ml-1">chevron_right</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
