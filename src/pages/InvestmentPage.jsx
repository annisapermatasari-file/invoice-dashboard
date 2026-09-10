import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { LineChart as LineChartIcon, TrendingUp } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { INVESTMENTS } from "../lib/mockData";

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="font-bold text-slate-900">{d.name}</div>
      <div className="mt-1 font-semibold text-slate-700">{fmtIDR(d.value)}</div>
    </div>
  );
}

export default function InvestmentPage() {
  const total = useMemo(() => INVESTMENTS.reduce((s, i) => s + i.amount, 0), []);
  const avgReturn = useMemo(() => {
    const weighted = INVESTMENTS.reduce(
      (s, i) => s + i.returnPct * i.amount,
      0
    );
    return (weighted / total).toFixed(2);
  }, [total]);

  return (
    <Shell
      title="Investasi"
      subtitle="Portofolio investasi dana lembaga kursus dan estimasi imbal hasil."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={LineChartIcon}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Nilai Investasi"
          value={fmtIDR(total)}
        />
        <StatCard
          icon={TrendingUp}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Rata-rata Imbal Hasil"
          value={`${avgReturn}% / tahun`}
        />
        <StatCard
          icon={LineChartIcon}
          iconCls="bg-slate-100 text-slate-600"
          label="Jumlah Instrumen"
          value={`${INVESTMENTS.length} instrumen`}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <div className="text-sm font-bold text-slate-900">Alokasi</div>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INVESTMENTS}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {INVESTMENTS.map((i) => (
                    <Cell key={i.name} fill={i.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <div className="text-sm font-bold text-slate-900">Rincian Portofolio</div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Instrumen
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Jenis
                  </th>
                  <th className="px-3 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Imbal Hasil
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {INVESTMENTS.map((i) => (
                  <tr key={i.name} className="border-t border-slate-100">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ background: i.color }}
                        />
                        <span className="text-sm font-semibold text-slate-900">
                          {i.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-600">
                      {i.type}
                    </td>
                    <td className="px-3 py-4 text-sm font-semibold text-emerald-600">
                      +{i.returnPct}%
                    </td>
                    <td className="px-3 py-4 text-right text-sm font-semibold text-slate-900">
                      {fmtIDR(i.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
