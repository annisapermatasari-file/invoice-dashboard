import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtCompactIDR, fmtIDR } from "../lib/format";
import { NET_WORTH_HISTORY, ASSETS, LIABILITIES } from "../lib/mockData";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="font-bold text-slate-900">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="mt-1 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-700">
            {fmtCompactIDR(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function NetWorthPage() {
  const latest = NET_WORTH_HISTORY[NET_WORTH_HISTORY.length - 1];
  const netWorth = latest.aset - latest.liabilitas;
  const totalAssets = useMemo(() => ASSETS.reduce((s, a) => s + a.value, 0), []);
  const totalLiabilities = useMemo(
    () => LIABILITIES.reduce((s, l) => s + l.value, 0),
    []
  );

  return (
    <Shell
      title="Kekayaan Bersih"
      subtitle="Perbandingan aset dan liabilitas lembaga kursus dari waktu ke waktu."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={TrendingUp}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Kekayaan Bersih"
          value={fmtCompactIDR(netWorth)}
          trend="+8% dari bulan lalu"
          trendUp
        />
        <StatCard
          icon={TrendingUp}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Aset"
          value={fmtCompactIDR(totalAssets)}
        />
        <StatCard
          icon={TrendingUp}
          iconCls="bg-red-50 text-red-600"
          label="Total Liabilitas"
          value={fmtCompactIDR(totalLiabilities)}
        />
      </div>

      <Card className="mt-8">
        <div className="text-sm font-bold text-slate-900">
          Tren Aset vs Liabilitas
        </div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={NET_WORTH_HISTORY} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="asetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a78d6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2a78d6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="liabGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e34948" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#e34948" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => fmtCompactIDR(v)}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={64}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="aset"
                name="Aset"
                stroke="#2a78d6"
                strokeWidth={2}
                fill="url(#asetGrad)"
              />
              <Area
                type="monotone"
                dataKey="liabilitas"
                name="Liabilitas"
                stroke="#e34948"
                strokeWidth={2}
                fill="url(#liabGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <div className="text-sm font-bold text-slate-900">Rincian Aset</div>
          <div className="mt-3 space-y-1">
            {ASSETS.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: a.color }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {a.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {fmtIDR(a.value)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-bold text-slate-900">
            Rincian Liabilitas
          </div>
          <div className="mt-3 space-y-1">
            {LIABILITIES.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: l.color }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {l.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  {fmtIDR(l.value)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
