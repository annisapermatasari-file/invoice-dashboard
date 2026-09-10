import React, { useMemo, useState } from "react";
import { Wallet2, CheckCircle2, Clock } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { fmtIDR, initials } from "../lib/format";
import { PAYMENTS, INVOICES } from "../lib/mockData";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");

  const totals = useMemo(() => {
    const totalInvoiced = INVOICES.reduce((s, i) => s + i.amount, 0);
    const paidOff = PAYMENTS.reduce((s, p) => s + p.amount, 0);
    return { totalInvoiced, paidOff, remaining: totalInvoiced - paidOff };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PAYMENTS;
    return PAYMENTS.filter(
      (p) =>
        p.client.toLowerCase().includes(q) ||
        p.invoiceId.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Shell
      title="Pembayaran"
      subtitle="Riwayat pembayaran yang diterima dari klien, termasuk pembayaran bertahap."
      search={search}
      setSearch={setSearch}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={CheckCircle2}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Paid Off"
          value={fmtIDR(totals.paidOff)}
        />
        <StatCard
          icon={Clock}
          iconCls="bg-amber-50 text-amber-600"
          label="Remaining"
          value={fmtIDR(totals.remaining)}
        />
        <StatCard
          icon={Wallet2}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Invoiced"
          value={fmtIDR(totals.totalInvoiced)}
        />
      </div>

      <Card className="mt-8 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Klien
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Invoice
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tanggal Bayar
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Metode
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Jumlah
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Catatan
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const invoice = INVOICES.find((inv) => inv.id === p.invoiceId);
                const isPartial = invoice && p.amount < invoice.amount;
                return (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                            {initials(p.client)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold text-slate-900">
                          {p.client}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {p.invoiceId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {p.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {p.method}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                      {fmtIDR(p.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          isPartial
                            ? "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700"
                            : "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                        }
                      >
                        {p.notes}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-sm text-slate-400">
                    Tidak ada pembayaran yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </Shell>
  );
}
