import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  color?: string;
}

export function DashboardStatCard({ label, value, icon, change, color = "bg-admin-stat-blue" }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 rounded-xl ${color}/15 flex items-center justify-center shrink-0`}>
        <div className={`${color.replace("bg-", "text-")}`}>{icon}</div>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
        {change && <p className="text-xs text-admin-stat-green mt-1">{change}</p>}
      </div>
    </div>
  );
}
