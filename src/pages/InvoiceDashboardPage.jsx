import React, { useMemo, useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Download,
  Wallet,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../lib/utils";
import { fmtIDR, initials } from "../lib/format";
import { INVOICES } from "../lib/mockData";
import Shell from "../components/Shell";
import StatCard from "../components/StatCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const STATUS_META = {
  lunas: { label: "Lunas", cls: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  jatuh_tempo: { label: "Jatuh Tempo", cls: "bg-red-100 text-red-700" },
};

const TABS = [
  { key: "all", label: "All" },
  { key: "lunas", label: "Lunas" },
  { key: "pending", label: "Pending" },
  { key: "jatuh_tempo", label: "Jatuh Tempo" },
];

function StatusPill({ status }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
        meta.cls
      )}
    >
      {meta.label}
    </span>
  );
}

export default function InvoiceDashboardPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const kpis = useMemo(() => {
    const total = INVOICES.reduce((s, i) => s + i.amount, 0);
    const lunas = INVOICES.filter((i) => i.status === "lunas").reduce(
      (s, i) => s + i.amount,
      0
    );
    const pending = INVOICES.filter((i) => i.status === "pending").reduce(
      (s, i) => s + i.amount,
      0
    );
    const jatuhTempo = INVOICES.filter(
      (i) => i.status === "jatuh_tempo"
    ).reduce((s, i) => s + i.amount, 0);
    return { total, lunas, pending, jatuhTempo };
  }, []);

  const filtered = useMemo(() => {
    return INVOICES.filter((inv) => {
      const matchTab = tab === "all" || inv.status === tab;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        inv.client.toLowerCase().includes(q) ||
        inv.id.toLowerCase().includes(q) ||
        inv.email.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [tab, search]);

  return (
    <Shell
      title="Kelola Invoice"
      subtitle="Pantau, kelola, dan lacak seluruh invoice Anda dalam satu tempat."
      search={search}
      setSearch={setSearch}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Terbit"
          value={fmtIDR(kpis.total)}
          trend="+12% bulan ini"
          trendUp
        />
        <StatCard
          icon={CheckCircle2}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Lunas"
          value={fmtIDR(kpis.lunas)}
          trend="+8% bulan ini"
          trendUp
        />
        <StatCard
          icon={Clock}
          iconCls="bg-amber-50 text-amber-600"
          label="Menunggu"
          value={fmtIDR(kpis.pending)}
          trend="+3% bulan ini"
          trendUp
        />
        <StatCard
          icon={AlertTriangle}
          iconCls="bg-red-50 text-red-600"
          label="Jatuh Tempo"
          value={fmtIDR(kpis.jatuhTempo)}
          trend="-5% bulan ini"
          trendUp={false}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/[0.03]">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-6 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "relative whitespace-nowrap pb-3 pt-1 text-sm font-semibold transition-colors",
                  tab === t.key
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {t.label}
                {tab === t.key && (
                  <span className="absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800">
            <Plus className="h-4 w-4" />
            Buat Invoice Baru
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Invoice
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Klien
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tanggal Terbit
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Jatuh Tempo
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Nominal
                </th>
                <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-t border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-500">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-slate-100 text-xs font-semibold text-slate-600">
                          {initials(inv.client)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900">
                          {inv.client}
                        </div>
                        <div className="text-xs text-slate-500">
                          {inv.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {inv.issued}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {inv.due}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {fmtIDR(inv.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={inv.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Lihat"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        title="Unduh"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            title="Lainnya"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Kirim Ulang</DropdownMenuItem>
                          <DropdownMenuItem>Duplikat</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-sm text-slate-400"
                  >
                    Tidak ada invoice yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 text-sm text-slate-500 sm:flex-row">
          <span>
            Menampilkan{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-slate-700">
              {INVOICES.length}
            </span>{" "}
            invoice
          </span>
          <div className="flex items-center gap-1">
            <button
              className="rounded-lg px-3 py-1.5 font-medium text-slate-400 hover:bg-slate-100"
              disabled
            >
              Sebelumnya
            </button>
            <button className="rounded-lg bg-blue-50 px-3 py-1.5 font-semibold text-blue-600">
              1
            </button>
            <button className="rounded-lg px-3 py-1.5 font-medium text-slate-500 hover:bg-slate-100">
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
