import React, { useState } from "react";
import { FileBarChart, Download, FileText } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import { MONTHS_ID } from "../lib/mockData";

const REPORTS = [
  { name: "Laporan Laba Rugi", desc: "Ringkasan pemasukan, pengeluaran, dan laba bersih per bulan." },
  { name: "Laporan Arus Kas", desc: "Pergerakan kas masuk dan keluar dari seluruh rekening." },
  { name: "Laporan Piutang", desc: "Daftar invoice yang belum lunas beserta status jatuh tempo." },
  { name: "Laporan Anggaran", desc: "Perbandingan rencana anggaran dengan realisasi per kategori." },
  { name: "Laporan Kekayaan Bersih", desc: "Rincian aset dan liabilitas serta tren bulanannya." },
  { name: "Laporan Pajak", desc: "Rekap transaksi untuk keperluan pelaporan pajak lembaga." },
];

export default function ReportsPage() {
  const [month, setMonth] = useState("Sep");

  return (
    <Shell
      title="Laporan"
      subtitle="Unduh laporan keuangan bulanan untuk kebutuhan administrasi dan pajak."
      headerRight={
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border-0 bg-slate-100 py-2.5 pl-3 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          {MONTHS_ID.map((m) => (
            <option key={m} value={m}>
              {m} 2025
            </option>
          ))}
        </select>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => (
          <Card key={r.name}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <FileBarChart className="h-5 w-5" />
            </div>
            <div className="mt-4 text-sm font-bold text-slate-900">
              {r.name}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
              {r.desc}
            </p>
            <div className="mt-5 flex gap-2">
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                <Download className="h-3.5 w-3.5" />
                PDF
              </button>
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
                <FileText className="h-3.5 w-3.5" />
                Excel
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
