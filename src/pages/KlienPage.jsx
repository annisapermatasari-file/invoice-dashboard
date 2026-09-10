import React, { useMemo, useState } from "react";
import { Plus, Mail, Phone, MapPin, Tag } from "lucide-react";
import Shell from "../components/Shell";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { fmtIDR, initials } from "../lib/format";
import { CLIENTS } from "../lib/mockData";
import { cn } from "../lib/utils";

export default function KlienPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CLIENTS;
    return CLIENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.program.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Shell
      title="Klien"
      subtitle="Daftar klien dan program kursus yang mereka ikuti."
      search={search}
      setSearch={setSearch}
      headerRight={
        <button className="hidden items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800 sm:inline-flex">
          <Plus className="h-4 w-4" />
          Tambah Klien
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div
            key={c.email}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-blue-50 text-sm font-semibold text-blue-600">
                    {initials(c.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-slate-900">
                    {c.name}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {c.program}
                  </div>
                </div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                  c.status === "aktif"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {c.status === "aktif" ? "Aktif" : "Menunggak"}
              </span>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{c.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{c.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 shrink-0" />
                <span>{c.leadSource}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-500">Total Invoice</span>
              <span className="text-sm font-bold text-slate-900">
                {fmtIDR(c.totalInvoiced)}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl bg-white p-16 text-center text-sm text-slate-400 shadow-sm ring-1 ring-slate-900/[0.03]">
            Tidak ada klien yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </Shell>
  );
}
