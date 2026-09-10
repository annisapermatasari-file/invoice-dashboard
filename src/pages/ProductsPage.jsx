import React from "react";
import { Package, Plus, Users, Clock } from "lucide-react";
import Shell from "../components/Shell";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { PRODUCTS } from "../lib/mockData";

export default function ProductsPage() {
  const totalStudents = PRODUCTS.reduce((s, p) => s + p.students, 0);
  const avgPrice = Math.round(
    PRODUCTS.reduce((s, p) => s + p.price, 0) / PRODUCTS.length
  );

  return (
    <Shell
      title="Produk & Layanan"
      subtitle="Daftar program kursus yang ditawarkan beserta harga dan jumlah peserta."
      headerRight={
        <button className="hidden items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 sm:inline-flex">
          <Plus className="h-4 w-4" />
          Tambah Program
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={Package}
          iconCls="bg-blue-50 text-blue-600"
          label="Total Program Aktif"
          value={`${PRODUCTS.length} program`}
        />
        <StatCard
          icon={Users}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Total Peserta"
          value={`${totalStudents} peserta`}
        />
        <StatCard
          icon={Clock}
          iconCls="bg-amber-50 text-amber-600"
          label="Rata-rata Harga"
          value={fmtIDR(avgPrice)}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div className="mt-4 text-sm font-bold text-slate-900">
              {p.name}
            </div>
            <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {fmtIDR(p.price)}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {p.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {p.students} peserta
              </span>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
