"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// recharts styles SVG attributes directly, so tokens must be literal hex values
const TOKENS = {
  line: "#8e7dbe",
  lineActive: "#4c3d79",
  grid: "#e4e2e2",
  tick: "#49454f",
  tooltipBorder: "#cac4d0",
};

interface ChartPoint {
  date: string;
  score: number;
}

interface Props {
  data: ChartPoint[];
}

export default function ScoreChart({ data }: Props) {
  if (data.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 text-on-surface-variant text-sm">
        <span className="material-symbols-outlined text-3xl text-primary/30">show_chart</span>
        Complete more sessions to see your progress
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={TOKENS.grid} vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: TOKENS.tick }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: TOKENS.tick }}
          tickLine={false}
          axisLine={false}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: `1px solid ${TOKENS.tooltipBorder}`,
            fontSize: 12,
            boxShadow: "0 4px 12px rgba(142,125,190,0.15)",
          }}
          formatter={(value) => [`${value}`, "Score"]}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke={TOKENS.line}
          strokeWidth={3}
          strokeLinecap="round"
          dot={{ r: 4, fill: TOKENS.line, stroke: "#ffffff", strokeWidth: 2 }}
          activeDot={{ r: 6, fill: TOKENS.lineActive }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
