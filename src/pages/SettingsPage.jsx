import React, { useState } from "react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

function Field({ label, value, type = "text" }) {
  const [val, setVal] = useState(value);
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="mt-1.5 w-full rounded-lg border-0 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Shell
      title="Pengaturan"
      subtitle="Kelola informasi lembaga, profil, dan preferensi akun Anda."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600 text-lg font-semibold text-white">
                RP
              </AvatarFallback>
            </Avatar>
            <div className="mt-3 text-sm font-bold text-slate-900">
              Ririn Permatasari
            </div>
            <div className="text-xs text-slate-500">Admin Keuangan</div>
            <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100">
              Ubah Foto Profil
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="text-sm font-bold text-slate-900">
            Informasi Lembaga
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nama Lembaga" value="Kursus Cendekia Nusantara" />
            <Field label="Email" value="admin@cendekia.id" type="email" />
            <Field label="Nomor Telepon" value="(021) 555-0192" />
            <Field label="Mata Uang" value="IDR - Rupiah Indonesia" />
          </div>
          <div className="mt-6 flex justify-end">
            <button className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
              Simpan Perubahan
            </button>
          </div>
        </Card>
      </div>

      <Card className="mt-8">
        <div className="text-sm font-bold text-slate-900">Notifikasi</div>
        <div className="mt-4 space-y-4">
          {[
            "Pengingat invoice jatuh tempo",
            "Ringkasan laporan mingguan",
            "Peringatan anggaran terlampaui",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center justify-between border-t border-slate-100 pt-4 first:border-t-0 first:pt-0"
            >
              <span className="text-sm text-slate-700">{label}</span>
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/40"
              />
            </label>
          ))}
        </div>
      </Card>
    </Shell>
  );
}
