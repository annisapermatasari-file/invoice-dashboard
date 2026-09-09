import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Eye,
  Download,
  Wallet,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Invoices", icon: FileText, active: true },
  { label: "Klien", icon: Users },
  { label: "Produk & Layanan", icon: Package },
  { label: "Laporan", icon: BarChart3 },
  { label: "Pengaturan", icon: Settings },
];

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

const INVOICES = [
  {
    id: "INV-2025-0091",
    client: "Kartika Wijaya",
    email: "kartika.wijaya@gmail.com",
    issued: "3 Sep 2025",
    due: "17 Sep 2025",
    amount: 24500000,
    status: "lunas",
  },
  {
    id: "INV-2025-0090",
    client: "Bagus Setiawan",
    email: "bagus.setiawan@outlook.com",
    issued: "29 Agu 2025",
    due: "12 Sep 2025",
    amount: 18750000,
    status: "pending",
  },
  {
    id: "INV-2025-0089",
    client: "Dewi Anggraini",
    email: "dewi.anggraini@yahoo.com",
    issued: "22 Agu 2025",
    due: "5 Sep 2025",
    amount: 32000000,
    status: "jatuh_tempo",
  },
  {
    id: "INV-2025-0088",
    client: "Farhan Nugraha",
    email: "farhan.nugraha@gmail.com",
    issued: "18 Agu 2025",
    due: "1 Sep 2025",
    amount: 9800000,
    status: "lunas",
  },
  {
    id: "INV-2025-0087",
    client: "Intan Permatasari",
    email: "intan.permata@gmail.com",
    issued: "14 Agu 2025",
    due: "28 Agu 2025",
    amount: 15250000,
    status: "lunas",
  },
  {
    id: "INV-2025-0086",
    client: "Yusuf Maulana",
    email: "yusuf.maulana@company.co.id",
    issued: "9 Agu 2025",
    due: "23 Agu 2025",
    amount: 27300000,
    status: "pending",
  },
  {
    id: "INV-2025-0085",
    client: "Ratna Puspitasari",
    email: "ratna.puspita@gmail.com",
    issued: "2 Agu 2025",
    due: "16 Agu 2025",
    amount: 12400000,
    status: "jatuh_tempo",
  },
];

const fmtIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const initials = (name) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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

function KpiCard({ icon: Icon, iconCls, label, value, trend, trendUp }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            iconCls
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "text-xs font-semibold",
            trendUp ? "text-emerald-600" : "text-red-500"
          )}
        >
          {trend}
        </span>
      </div>
      <div className="mt-4 text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white px-4 py-6 transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:border-r md:border-slate-100",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <Wallet className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Invoiqo
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                  item.active
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">
            Butuh bantuan?
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Cek panduan penggunaan invoice atau hubungi tim support kami.
          </p>
          <button className="mt-3 w-full rounded-lg bg-white py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
            Pusat Bantuan
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenuClick, search, setSearch }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Kelola Invoice
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            Pantau, kelola, dan lacak seluruh invoice Anda dalam satu tempat.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari invoice, klien..."
            className="w-48 rounded-lg border-0 bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 lg:w-72"
          />
        </div>

        <button className="relative rounded-full p-2.5 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-slate-100">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-xs font-semibold text-white">
                  RP
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-semibold text-slate-700 lg:block">
                Ririn Permatasari
              </span>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profil Saya</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan Akun</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function InvoiceDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div
      className="flex min-h-screen bg-slate-50"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <Topbar
            onMenuClick={() => setSidebarOpen(true)}
            search={search}
            setSearch={setSearch}
          />

          {/* KPI cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              icon={Wallet}
              iconCls="bg-blue-50 text-blue-600"
              label="Total Terbit"
              value={fmtIDR(kpis.total)}
              trend="+12% bulan ini"
              trendUp
            />
            <KpiCard
              icon={CheckCircle2}
              iconCls="bg-emerald-50 text-emerald-600"
              label="Lunas"
              value={fmtIDR(kpis.lunas)}
              trend="+8% bulan ini"
              trendUp
            />
            <KpiCard
              icon={Clock}
              iconCls="bg-amber-50 text-amber-600"
              label="Menunggu"
              value={fmtIDR(kpis.pending)}
              trend="+3% bulan ini"
              trendUp
            />
            <KpiCard
              icon={AlertTriangle}
              iconCls="bg-red-50 text-red-600"
              label="Jatuh Tempo"
              value={fmtIDR(kpis.jatuhTempo)}
              trend="-5% bulan ini"
              trendUp={false}
            />
          </div>

          {/* Table container */}
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
                <button className="rounded-lg px-3 py-1.5 font-medium text-slate-400 hover:bg-slate-100" disabled>
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
        </main>
      </div>
    </div>
  );
}
