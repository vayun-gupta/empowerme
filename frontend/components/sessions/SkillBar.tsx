import React from "react";

interface SkillBarProps {
  label: string;
  value: number;
  max?: number;
  rationale?: string;
}

export default function SkillBar({ label, value, max = 10, rationale }: SkillBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-on-surface">{label}</span>
        <span className="text-xs font-bold text-primary">
          {value}
          <span className="font-medium text-on-surface-variant/60">/{max}</span>
        </span>
      </div>
      <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      {rationale && (
        <p className="text-xs text-on-surface-variant leading-relaxed">{rationale}</p>
      )}
    </div>
  );
}
