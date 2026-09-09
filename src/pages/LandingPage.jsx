import React, { useState } from "react";
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
  UserPlus,
  Send,
  Check,
  ChevronDown,
  Quote,
} from "lucide-react";
import { cn } from "../lib/utils";

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

const STEPS = [
  {
    icon: UserPlus,
    title: "Tambah Klien & Kursus",
    desc: "Daftarkan klien dan program kursus Anda sekali saja, pakai berulang kali.",
  },
  {
    icon: FileText,
    title: "Buat Invoice dalam Detik",
    desc: "Isi nominal dan jatuh tempo, invoice rapi siap dikirim tanpa template manual.",
  },
  {
    icon: Send,
    title: "Kirim & Pantau Status",
    desc: "Lacak status Lunas, Pending, atau Jatuh Tempo langsung dari satu dashboard.",
  },
  {
    icon: Wallet,
    title: "Terima Pembayaran Lebih Cepat",
    desc: "Pengingat otomatis membantu klien membayar tepat waktu, tanpa perlu menagih manual.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Gratis",
    period: "",
    desc: "Untuk yang baru mulai merapikan invoice.",
    cta: "Mulai Gratis",
    featured: false,
    features: [
      "Hingga 10 invoice / bulan",
      "1 pengguna",
      "Status pembayaran dasar",
      "Export PDF",
    ],
  },
  {
    name: "Pro",
    price: "Rp 99rb",
    period: "/bulan",
    desc: "Untuk lembaga kursus yang terus bertumbuh.",
    cta: "Coba Pro",
    featured: true,
    features: [
      "Invoice tanpa batas",
      "Hingga 5 pengguna",
      "Pengingat otomatis",
      "Ringkasan & laporan real-time",
      "Export PDF & Excel",
    ],
  },
  {
    name: "Bisnis",
    price: "Rp 299rb",
    period: "/bulan",
    desc: "Untuk operasional multi-cabang berskala besar.",
    cta: "Hubungi Kami",
    featured: false,
    features: [
      "Semua fitur Pro",
      "Pengguna tanpa batas",
      "Multi-cabang",
      "Akses API",
      "Dukungan prioritas",
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Kartika Wijaya",
    role: "Founder, Kursus Bahasa Inggris Cendekia",
    quote:
      "Sejak pakai Invoiqo, saya nggak lagi lupa follow up invoice yang mau jatuh tempo. Pembayaran klien jadi jauh lebih tepat waktu.",
  },
  {
    name: "Bagus Setiawan",
    role: "Admin Keuangan, Pelatihan Digital Nusantara",
    quote:
      "Dashboard-nya jelas banget, sekali buka langsung tahu mana yang lunas dan mana yang masih menunggu. Hemat waktu rekap manual.",
  },
  {
    name: "Dewi Anggraini",
    role: "Direktur, Lembaga Kursus Cakrawala",
    quote:
      "Tampilannya rapi dan gampang dipakai tim yang nggak terlalu teknis. Klien juga lebih percaya lihat invoice yang profesional.",
  },
];

const FAQS = [
  {
    q: "Apakah saya perlu kartu kredit untuk mencoba?",
    a: "Tidak. Anda bisa langsung membuka dashboard demo tanpa mendaftar atau memasukkan detail pembayaran apa pun.",
  },
  {
    q: "Bagaimana cara mengirim invoice ke klien?",
    a: "Buat invoice dari dashboard, lalu kirim langsung sebagai tautan atau unduh sebagai PDF untuk dikirim lewat email maupun WhatsApp.",
  },
  {
    q: "Apakah bisa mengatur pengingat otomatis?",
    a: "Bisa. Invoiqo mengirim pengingat otomatis menjelang tanggal jatuh tempo supaya klien tidak lupa membayar.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya. Data klien dan transaksi tersimpan dengan kontrol akses berbasis peran, sehingga hanya pengguna yang berwenang yang bisa melihatnya.",
  },
  {
    q: "Bisakah upgrade atau downgrade paket kapan saja?",
    a: "Tentu. Anda bisa berpindah paket kapan saja sesuai kebutuhan lembaga kursus Anda, tanpa kontrak jangka panjang.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/[0.03]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-bold text-slate-900">{item.q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

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

      {/* Onboarding steps */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mulai dalam 4 langkah mudah
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Tidak perlu training panjang — tim Anda bisa langsung pakai hari
            ini juga.
          </p>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-900/[0.03]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mx-auto -mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-4 ring-slate-50">
                  {i + 1}
                </div>
                <div className="mt-3 text-sm font-bold text-slate-900">
                  {s.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Harga sederhana, tanpa kejutan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Pilih paket sesuai skala lembaga kursus Anda. Ganti paket kapan
            saja.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-2xl p-8 shadow-sm ring-1",
                tier.featured
                  ? "bg-blue-700 text-white ring-blue-700 lg:-translate-y-3"
                  : "bg-white text-slate-900 ring-slate-900/[0.03]"
              )}
            >
              {tier.featured && (
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                  Paling Populer
                </span>
              )}
              <div
                className={cn(
                  "mt-3 text-lg font-bold",
                  tier.featured ? "text-white" : "text-slate-900"
                )}
              >
                {tier.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span
                    className={cn(
                      "text-sm",
                      tier.featured ? "text-blue-100" : "text-slate-500"
                    )}
                  >
                    {tier.period}
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  tier.featured ? "text-blue-100" : "text-slate-500"
                )}
              >
                {tier.desc}
              </p>

              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        tier.featured ? "text-white" : "text-blue-600"
                      )}
                    />
                    <span className={tier.featured ? "text-blue-50" : "text-slate-600"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard"
                className={cn(
                  "mt-8 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors",
                  tier.featured
                    ? "bg-white text-blue-700 hover:bg-blue-50"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dipercaya lembaga kursus di seluruh Indonesia
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Berikut cerita dari beberapa pengguna Invoiqo.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]"
            >
              <Quote className="h-6 w-6 text-blue-200" />
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  {t.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Tidak menemukan jawabannya? Hubungi tim support kami kapan saja.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
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

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Wallet className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900">
                Invoiqo
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Invoice dashboard untuk lembaga kursus &amp; pelatihan.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Produk
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Fitur</li>
              <li>Harga</li>
              <li>Dashboard Demo</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Perusahaan
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Tentang Kami</li>
              <li>Blog</li>
              <li>Karier</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kontak
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>hello@invoiqo.id</li>
              <li>+62 21 5000 1234</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 px-6 py-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Invoiqo — Invoice Dashboard UI mockup.
        </div>
      </footer>
    </div>
  );
}
