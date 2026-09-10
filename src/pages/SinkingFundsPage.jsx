import React from "react";
import { PiggyBank, Plus, CheckCircle2 } from "lucide-react";
import Shell from "../components/Shell";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { SAVINGS_GOALS } from "../lib/mockData";

export default function SinkingFundsPage() {
  const totalSaved = SAVINGS_GOALS.reduce((s, g) => s + g.saved, 0);
  const totalTarget = SAVINGS_GOALS.reduce((s, g) => s + g.target, 0);

  return (
    <Shell
      title="Dana Cadangan"
      subtitle="Kelola tabungan bertujuan (sinking funds) untuk kebutuhan operasional mendatang."
      headerRight={
        <button className="hidden items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 sm:inline-flex">
          <Plus className="h-4 w-4" />
          Tambah Tujuan
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={PiggyBank}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Terkumpul"
          value={fmtIDR(totalSaved)}
        />
        <StatCard
          icon={PiggyBank}
          iconCls="bg-slate-100 text-slate-600"
          label="Total Target"
          value={fmtIDR(totalTarget)}
        />
        <StatCard
          icon={CheckCircle2}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Progres Keseluruhan"
          value={`${Math.round((totalSaved / totalTarget) * 100)}%`}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {SAVINGS_GOALS.map((g) => {
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
          const done = pct >= 100;
          return (
            <div
              key={g.name}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <PiggyBank className="h-5 w-5" />
                </div>
                {done && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Tercapai
                  </span>
                )}
              </div>
              <div className="mt-4 text-sm font-bold text-slate-900">
                {g.name}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Target: {g.deadline}
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  {fmtIDR(g.saved)}
                </span>
                <span className="text-xs text-slate-500">
                  dari {fmtIDR(g.target)}
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 text-right text-xs font-semibold text-blue-600">
                {pct}%
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
