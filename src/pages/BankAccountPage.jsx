import React from "react";
import { Landmark, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { BANK_ACCOUNTS, BANK_TRANSACTIONS } from "../lib/mockData";
import { cn } from "../lib/utils";

export default function BankAccountPage() {
  const total = BANK_ACCOUNTS.reduce((s, a) => s + a.balance, 0);

  return (
    <Shell
      title="Bank & Rekening"
      subtitle="Saldo dan mutasi rekening operasional lembaga kursus."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Landmark}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Saldo Semua Rekening"
          value={fmtIDR(total)}
          trend="+5% bulan ini"
          trendUp
        />
        {BANK_ACCOUNTS.map((a) => (
          <StatCard
            key={a.accountNumber}
            icon={Landmark}
            iconCls="bg-slate-100 text-slate-600"
            label={`${a.bank} · ${a.type}`}
            value={fmtIDR(a.balance)}
          />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="text-sm font-bold text-slate-900">
            Daftar Rekening
          </div>
          <div className="mt-4 space-y-4">
            {BANK_ACCOUNTS.map((a) => (
              <div
                key={a.accountNumber}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Landmark className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900">
                      {a.bank}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {a.accountNumber}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-lg font-bold tracking-tight text-slate-900">
                  {fmtIDR(a.balance)}
                </div>
                <div className="text-xs text-slate-500">{a.accountName}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="text-sm font-bold text-slate-900">
            Mutasi Terbaru
          </div>
          <div className="mt-2 divide-y divide-slate-100">
            {BANK_TRANSACTIONS.map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    t.type === "masuk"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  )}
                >
                  {t.type === "masuk" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {t.desc}
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.date} · {t.account}
                  </div>
                </div>
                <div
                  className={cn(
                    "shrink-0 text-sm font-bold",
                    t.type === "masuk" ? "text-emerald-600" : "text-red-600"
                  )}
                >
                  {t.type === "masuk" ? "+" : "-"}
                  {fmtIDR(Math.abs(t.amount))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}
