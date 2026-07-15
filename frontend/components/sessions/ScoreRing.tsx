import React from "react";

interface ScoreRingProps {
  score: number | null;
  size?: number;
}

export default function ScoreRing({ score, size = 72 }: ScoreRingProps) {
  const stroke = 5;
  const r = size / 2 - stroke;
  const circumference = 2 * Math.PI * r;
  const offset =
    score != null ? circumference * (1 - Math.min(Math.max(score, 0), 100) / 100) : circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e8ddff"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#8e7dbe"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-lg text-primary">{score != null ? score : "—"}</span>
      </div>
    </div>
  );
}
