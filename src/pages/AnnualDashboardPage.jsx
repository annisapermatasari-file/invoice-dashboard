import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, FileText } from "lucide-react";
import Shell from "../components/Shell";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import { fmtIDR, fmtCompactIDR } from "../lib/format";
import { MONTHLY_TREND, CLIENTS } from "../lib/mockData";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="font-bold text-slate-900">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="mt-1 flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-700">
            {fmtCompactIDR(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnnualDashboardPage() {
  const ytd = useMemo(() => {
    const withData = MONTHLY_TREND.filter((m) => m.pemasukan > 0);
    const pemasukan = withData.reduce((s, m) => s + m.pemasukan, 0);
    const pengeluaran = withData.reduce((s, m) => s + m.pengeluaran, 0);
    return { pemasukan, pengeluaran, laba: pemasukan - pengeluaran };
  }, []);

  const piutangAktif = CLIENTS.filter((c) => c.status === "menunggak").reduce(
    (s, c) => s + c.totalInvoiced,
    0
  );

  return (
    <Shell
      title="Ringkasan Tahunan"
      subtitle="Gambaran besar kondisi keuangan lembaga kursus tahun berjalan."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Pemasukan (YTD)"
          value={fmtCompactIDR(ytd.pemasukan)}
          trend="+14% vs tahun lalu"
          trendUp
        />
        <StatCard
          icon={TrendingDown}
          iconCls="bg-amber-50 text-amber-600"
          label="Total Pengeluaran (YTD)"
          value={fmtCompactIDR(ytd.pengeluaran)}
          trend="+6% vs tahun lalu"
          trendUp={false}
        />
        <StatCard
          icon={TrendingUp}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Laba Bersih (YTD)"
          value={fmtCompactIDR(ytd.laba)}
          trend="+22% vs tahun lalu"
          trendUp
        />
        <StatCard
          icon={FileText}
          iconCls="bg-red-50 text-red-600"
          label="Piutang Menunggak"
          value={fmtCompactIDR(piutangAktif)}
          trend="2 klien"
          trendUp={false}
        />
      </div>

      <Card className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-900">
              Pemasukan vs Pengeluaran
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Tren bulanan tahun berjalan (Rupiah)
            </p>
          </div>
        </div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_TREND} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
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
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "#475569" }}
              />
              <Line
                type="monotone"
                dataKey="pemasukan"
                name="Pemasukan"
                stroke="#2a78d6"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="pengeluaran"
                name="Pengeluaran"
                stroke="#eb6834"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <div className="text-sm font-bold text-slate-900">Klien Teratas</div>
          <p className="mt-1 text-xs text-slate-500">
            Berdasarkan total invoice diterbitkan
          </p>
          <div className="mt-4 space-y-1">
            {[...CLIENTS]
              .sort((a, b) => b.totalInvoiced - a.totalInvoiced)
              .slice(0, 5)
              .map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      {c.name}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {c.program}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-slate-700">
                    {fmtCompactIDR(c.totalInvoiced)}
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-bold text-slate-900">
            Status Piutang
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Klien dengan tagihan aktif
          </p>
          <div className="mt-4 space-y-1">
            {CLIENTS.filter((c) => c.status === "menunggak").map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {c.name}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {c.email}
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                  {fmtIDR(c.totalInvoiced)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
