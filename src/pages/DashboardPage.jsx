import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FileText, CheckCircle2, Clock, Wallet } from "lucide-react";
import Shell from "../components/Shell";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import { fmtIDR, fmtCompactIDR, initials } from "../lib/format";
import {
  INVOICES,
  PAYMENTS,
  MONTHLY_INVOICES,
  LEAD_SOURCES,
  STATUS_CHART_COLORS,
} from "../lib/mockData";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { cn } from "../lib/utils";

const STATUS_LABEL = { lunas: "Lunas", pending: "Pending", jatuh_tempo: "Jatuh Tempo" };

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="font-bold text-slate-900">{label}</div>
      <div className="mt-1 font-semibold text-slate-700">
        {fmtCompactIDR(p.value)}
      </div>
    </div>
  );
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-lg ring-1 ring-slate-900/10">
      <div className="font-bold text-slate-900">{d.name}</div>
      <div className="mt-1 font-semibold text-slate-700">{d.value}</div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = useMemo(() => {
    const totalAmount = INVOICES.reduce((s, i) => s + i.amount, 0);
    const paid = INVOICES.filter((i) => i.status === "lunas");
    const paidAmount = paid.reduce((s, i) => s + i.amount, 0);
    const notFullyPaid = INVOICES.length - paid.length;
    const paidPct = Math.round((paid.length / INVOICES.length) * 100);
    return {
      totalInvoices: INVOICES.length,
      totalAmount,
      paidCount: paid.length,
      paidAmount,
      notFullyPaid,
      paidPct,
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const counts = { lunas: 0, pending: 0, jatuh_tempo: 0 };
    INVOICES.forEach((i) => counts[i.status]++);
    return Object.entries(counts).map(([key, value]) => ({
      key,
      name: STATUS_LABEL[key],
      value,
      color: STATUS_CHART_COLORS[key],
    }));
  }, []);

  const recentInvoices = [...INVOICES].slice(0, 5);
  const recentPayments = [...PAYMENTS].slice(0, 5);

  return (
    <Shell
      title="Dashboard"
      subtitle="Ringkasan invoice, pembayaran, dan status klien secara keseluruhan."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FileText}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Invoices"
          value={`${stats.totalInvoices} invoice`}
        />
        <StatCard
          icon={Wallet}
          iconCls="bg-slate-100 text-slate-600"
          label="Total Amount"
          value={fmtCompactIDR(stats.totalAmount)}
        />
        <StatCard
          icon={CheckCircle2}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Paid Invoices"
          value={`${stats.paidCount} invoice`}
          trend={`${stats.paidPct}% terbayar`}
          trendUp
        />
        <StatCard
          icon={Clock}
          iconCls="bg-amber-50 text-amber-600"
          label="Not Fully Paid"
          value={`${stats.notFullyPaid} invoice`}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-sm font-bold text-slate-900">
            Invoice Bulanan (Total Nominal)
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Total nominal invoice yang diterbitkan per bulan
          </p>
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_INVOICES} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
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
                <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="nominal" name="Nominal" fill="#2a78d6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-bold text-slate-900">Invoice Status</div>
          <div className="relative mt-4 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={3}
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {statusBreakdown.map((s) => (
                    <Cell key={s.key} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-slate-500">Total</div>
              <div className="text-lg font-bold text-slate-900">
                {stats.totalInvoices}
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {statusBreakdown.map((s) => (
              <div key={s.key} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="text-sm font-bold text-slate-900">Lead Source</div>
          <p className="mt-1 text-xs text-slate-500">Asal klien baru</p>
          <div className="mt-4 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LEAD_SOURCES}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={0}
                  outerRadius={76}
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {LEAD_SOURCES.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5">
            {LEAD_SOURCES.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-600">{s.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="text-sm font-bold text-slate-900">Last Invoices</div>
          <div className="mt-3 space-y-1">
            {recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-3 border-t border-slate-100 py-3 first:border-t-0"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                    {initials(inv.client)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-slate-900">
                    {inv.client}
                  </div>
                  <div className="text-[11px] text-slate-500">{inv.id}</div>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    inv.status === "lunas" && "bg-emerald-100 text-emerald-700",
                    inv.status === "pending" && "bg-amber-100 text-amber-700",
                    inv.status === "jatuh_tempo" && "bg-red-100 text-red-700"
                  )}
                >
                  {STATUS_LABEL[inv.status]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-1">
          <div className="text-sm font-bold text-slate-900">Last Payments</div>
          <div className="mt-3 space-y-1">
            {recentPayments.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-t border-slate-100 py-3 first:border-t-0"
              >
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-slate-900">
                    {p.client}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {p.date} · {p.method}
                  </div>
                </div>
                <span className="shrink-0 text-xs font-bold text-emerald-600">
                  +{fmtIDR(p.amount)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
