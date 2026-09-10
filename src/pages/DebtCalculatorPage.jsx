import React, { useMemo } from "react";
import { CreditCard, AlertTriangle } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { DEBTS } from "../lib/mockData";

export default function DebtCalculatorPage() {
  const totals = useMemo(() => {
    const balance = DEBTS.reduce((s, d) => s + d.balance, 0);
    const minPayment = DEBTS.reduce((s, d) => s + d.minPayment, 0);
    const monthsToPayoff = Math.ceil(balance / minPayment);
    return { balance, minPayment, monthsToPayoff };
  }, []);

  return (
    <Shell
      title="Kalkulator Utang"
      subtitle="Pantau sisa utang dan simulasi lama pelunasan berdasarkan cicilan minimum."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={CreditCard}
          iconCls="bg-red-50 text-red-600"
          label="Total Sisa Utang"
          value={fmtIDR(totals.balance)}
        />
        <StatCard
          icon={CreditCard}
          iconCls="bg-amber-50 text-amber-600"
          label="Cicilan Minimum / Bulan"
          value={fmtIDR(totals.minPayment)}
        />
        <StatCard
          icon={AlertTriangle}
          iconCls="bg-slate-100 text-slate-600"
          label="Estimasi Lunas Dalam"
          value={`${totals.monthsToPayoff} bulan`}
        />
      </div>

      <Card className="mt-8">
        <div className="text-sm font-bold text-slate-900">Daftar Utang</div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nama Utang
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sisa Saldo
                </th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Bunga / Tahun
                </th>
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cicilan Min.
                </th>
              </tr>
            </thead>
            <tbody>
              {DEBTS.map((d) => (
                <tr key={d.name} className="border-t border-slate-100">
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                    {d.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {fmtIDR(d.balance)}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {d.rate}%
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-slate-900">
                    {fmtIDR(d.minPayment)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
