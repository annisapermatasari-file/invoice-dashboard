import React from "react";
import { cn } from "../lib/utils";

export default function StatCard({ icon: Icon, iconCls, label, value, trend, trendUp }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            iconCls
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-semibold",
              trendUp ? "text-emerald-600" : "text-red-500"
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4 text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}
