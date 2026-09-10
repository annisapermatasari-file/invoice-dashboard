import React, { useMemo, useState } from "react";
import { ClipboardList, TrendingUp, TrendingDown } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { BUDGET_CATEGORIES, MONTHS_ID } from "../lib/mockData";

export default function BudgetPage() {
  const [month, setMonth] = useState("Sep");

  const totals = useMemo(() => {
    const planned = BUDGET_CATEGORIES.reduce((s, c) => s + c.planned, 0);
    const actual = BUDGET_CATEGORIES.reduce((s, c) => s + c.actual, 0);
    return { planned, actual, sisa: planned - actual };
  }, []);

  return (
    <Shell
      title="Anggaran Bulanan"
      subtitle="Bandingkan rencana anggaran dengan realisasi pengeluaran per kategori."
      headerRight={
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border-0 bg-slate-100 py-2.5 pl-3 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {MONTHS_ID.map((m) => (
            <option key={m} value={m}>
              {m} 2025
            </option>
          ))}
        </select>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={ClipboardList}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Anggaran"
          value={fmtIDR(totals.planned)}
        />
        <StatCard
          icon={TrendingDown}
          iconCls="bg-amber-50 text-amber-600"
          label="Total Realisasi"
          value={fmtIDR(totals.actual)}
        />
        <StatCard
          icon={TrendingUp}
          iconCls={
            totals.sisa >= 0
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }
          label="Sisa Anggaran"
          value={fmtIDR(totals.sisa)}
        />
      </div>

      <Card className="mt-8">
        <div className="text-sm font-bold text-slate-900">
          Rencana vs Realisasi per Kategori
        </div>
        <div className="mt-5 space-y-5">
          {BUDGET_CATEGORIES.map((c) => {
            const pct = Math.min(100, Math.round((c.actual / c.planned) * 100));
            const over = c.actual > c.planned;
            return (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-900">
                    {c.name}
                  </span>
                  <span className="text-slate-500">
                    {fmtIDR(c.actual)}{" "}
                    <span className="text-slate-400">
                      / {fmtIDR(c.planned)}
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: over ? "#e34948" : c.color,
                    }}
                  />
                </div>
                {over && (
                  <div className="mt-1 text-xs font-medium text-red-600">
                    Melebihi anggaran{" "}
                    {fmtIDR(c.actual - c.planned)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </Shell>
  );
}
