import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import { fmtIDR } from "../lib/format";
import { BUDGET_CATEGORIES } from "../lib/mockData";

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full" style={{ background: d.payload.color }} />
        <span className="font-bold text-slate-900">{d.name}</span>
      </div>
      <div className="mt-1 font-semibold text-slate-700">{fmtIDR(d.value)}</div>
    </div>
  );
}

export default function DistributionPage() {
  const total = useMemo(
    () => BUDGET_CATEGORIES.reduce((s, c) => s + c.actual, 0),
    []
  );

  return (
    <Shell
      title="Distribusi Pengeluaran"
      subtitle="Proporsi pengeluaran aktual bulan ini per kategori."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-blue-600" />
            <div className="text-sm font-bold text-slate-900">
              Total Pengeluaran
            </div>
          </div>
          <div className="relative mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BUDGET_CATEGORIES}
                  dataKey="actual"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={92}
                  paddingAngle={2}
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {BUDGET_CATEGORIES.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500">Total</div>
              <div className="text-lg font-bold text-slate-900">
                {fmtIDR(total)}
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="text-sm font-bold text-slate-900">Rincian Kategori</div>
          <div className="mt-4 space-y-1">
            {BUDGET_CATEGORIES.map((c) => {
              const pct = ((c.actual / total) * 100).toFixed(1);
              return (
                <div
                  key={c.name}
                  className="flex items-center justify-between border-t border-slate-100 py-3.5 first:border-t-0"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: c.color }}
                    />
                    <span className="truncate text-sm font-semibold text-slate-900">
                      {c.name}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-slate-500">{pct}%</span>
                    <span className="w-32 text-right text-sm font-semibold text-slate-700">
                      {fmtIDR(c.actual)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
