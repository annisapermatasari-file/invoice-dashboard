import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  ArrowRight,
  FileText,
  BellRing,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Star,
} from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    iconCls: "bg-blue-50 text-blue-600",
    title: "Invoice Profesional",
    desc: "Buat dan kirim invoice rapi dalam hitungan detik, lengkap dengan status pembayaran.",
  },
  {
    icon: BellRing,
    iconCls: "bg-amber-50 text-amber-600",
    title: "Pengingat Otomatis",
    desc: "Dapatkan notifikasi sebelum invoice jatuh tempo supaya arus kas tetap lancar.",
  },
  {
    icon: BarChart3,
    iconCls: "bg-emerald-50 text-emerald-600",
    title: "Ringkasan Real-time",
    desc: "Pantau total terbit, lunas, menunggu, dan jatuh tempo dalam satu dashboard.",
  },
  {
    icon: ShieldCheck,
    iconCls: "bg-red-50 text-red-600",
    title: "Aman & Terpercaya",
    desc: "Data klien dan transaksi tersimpan rapi dengan kontrol akses yang jelas.",
  },
];

const STATS = [
  { value: "150+", label: "Kursus & Pelatihan" },
  { value: "Rp 140jt+", label: "Invoice terbit / bulan" },
  { value: "98%", label: "Tingkat pembayaran tepat waktu" },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
            <Wallet className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Invoiqo
          </span>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
        >
          Buka Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 text-center sm:pt-16">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-600">
          <Star className="h-3.5 w-3.5 fill-blue-600" />
          Dibuat untuk lembaga kursus &amp; pelatihan
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Kelola Invoice Lebih Rapi,
          <br />
          Pembayaran Lebih Lancar
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
          Invoiqo membantu Anda menerbitkan, melacak, dan menagih invoice
          klien dalam satu dashboard yang bersih dan mudah dipakai.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
          >
            Coba Dashboard Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Tanpa perlu daftar, langsung lihat demo
          </span>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/[0.03] sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Semua yang Anda butuhkan untuk urusan invoice
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Dari pembuatan invoice sampai pemantauan pembayaran, semuanya
            dalam satu tempat yang rapi.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${f.iconCls}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-bold text-slate-900">
                  {f.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-blue-700 px-8 py-10 text-center shadow-sm sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Siap melihat Invoiqo bekerja?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              Buka dashboard demo dan jelajahi tampilan invoice yang bersih
              dan rapi.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
          >
            Buka Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Invoiqo — Invoice Dashboard UI mockup.
      </footer>
    </div>
  );
}
