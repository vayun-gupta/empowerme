import React from "react";

interface StatCardProps {
  icon: string;
  iconCls: string;
  accentCls: string;
  label: string;
  value: React.ReactNode;
  badge?: string;
  badgeCls?: string;
}

export default function StatCard({
  icon,
  iconCls,
  accentCls,
  label,
  value,
  badge,
  badgeCls = "bg-surface-container-high text-on-surface-variant",
}: StatCardProps) {
  return (
    <div className={`glass-card p-6 rounded-xl flex flex-col justify-between h-44 border-l-4 ${accentCls}`}>
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconCls}`}>
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        {badge && (
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeCls}`}>{badge}</span>
        )}
      </div>
      <div>
        <div className="text-on-surface-variant text-xs uppercase tracking-widest mb-1 font-bold opacity-70">
          {label}
        </div>
        <div className="text-3xl font-bold text-primary">{value}</div>
      </div>
    </div>
  );
}
