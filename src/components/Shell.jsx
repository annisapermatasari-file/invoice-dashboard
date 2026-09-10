import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Landmark,
  ClipboardList,
  PieChart,
  CalendarDays,
  PiggyBank,
  Calculator,
  TrendingUp,
  LineChart,
  Trophy,
  Package,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

const NAV_GROUPS = [
  {
    items: [
      { to: "/dashboard", label: "Ringkasan Tahunan", icon: LayoutDashboard },
      { to: "/invoices", label: "Invoices", icon: FileText },
      { to: "/klien", label: "Klien", icon: Users },
    ],
  },
  {
    label: "Keuangan",
    items: [
      { to: "/bank", label: "Bank & Rekening", icon: Landmark },
      { to: "/anggaran", label: "Anggaran Bulanan", icon: ClipboardList },
      { to: "/distribusi", label: "Distribusi Pengeluaran", icon: PieChart },
      { to: "/kalender", label: "Kalender Keuangan", icon: CalendarDays },
    ],
  },
  {
    label: "Perencanaan",
    items: [
      { to: "/dana-cadangan", label: "Dana Cadangan", icon: PiggyBank },
      { to: "/kalkulator-utang", label: "Kalkulator Utang", icon: Calculator },
      { to: "/kekayaan-bersih", label: "Kekayaan Bersih", icon: TrendingUp },
      { to: "/investasi", label: "Investasi", icon: LineChart },
      { to: "/tantangan", label: "Tantangan Menabung", icon: Trophy },
    ],
  },
  {
    label: "Lainnya",
    items: [
      { to: "/produk-layanan", label: "Produk & Layanan", icon: Package },
      { to: "/laporan", label: "Laporan", icon: BarChart3 },
      { to: "/pengaturan", label: "Pengaturan", icon: Settings },
    ],
  },
];

function Sidebar({ open, onClose }) {
  const location = useLocation();
  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

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
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto bg-white px-4 py-6 transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:border-r md:border-slate-100",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-2">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
              <Wallet className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Invoiqo
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-5">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <div className="px-3.5 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.label}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-blue-50 font-semibold text-blue-600"
                          : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">
            Butuh bantuan?
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Cek panduan penggunaan atau hubungi tim support kami.
          </p>
          <button className="mt-3 w-full rounded-lg bg-white py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
            Pusat Bantuan
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, subtitle, onMenuClick, search, setSearch, right }) {
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
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {right}
        {setSearch && (
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="w-48 rounded-lg border-0 bg-slate-100 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 lg:w-64"
            />
          </div>
        )}

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

export default function Shell({
  title,
  subtitle,
  search,
  setSearch,
  headerRight,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen bg-slate-50"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <Topbar
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setSidebarOpen(true)}
            search={search}
            setSearch={setSearch}
            right={headerRight}
          />
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
