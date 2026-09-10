import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import { CALENDAR_EVENTS } from "../lib/mockData";
import { cn } from "../lib/utils";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const TYPE_CLS = {
  warning: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
  info: "bg-blue-100 text-blue-700",
};

export default function CalendarPage() {
  const [monthLabel] = useState("September 2025");
  // September 2025 starts on a Monday, 30 days.
  const firstDayOffset = 1;
  const daysInMonth = 30;

  const cells = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Shell
      title="Kalender Keuangan"
      subtitle="Pantau tanggal jatuh tempo invoice, tagihan, dan gajian dalam satu tampilan."
    >
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">{monthLabel}</div>
          <div className="flex items-center gap-1">
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
          {DAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {cells.map((day, i) => {
            const events = day ? CALENDAR_EVENTS[day] : null;
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[92px] rounded-xl p-2 text-left",
                  day ? "bg-slate-50" : ""
                )}
              >
                {day && (
                  <>
                    <div className="text-xs font-semibold text-slate-500">
                      {day}
                    </div>
                    <div className="mt-1 space-y-1">
                      {events?.map((e, ei) => (
                        <div
                          key={ei}
                          className={cn(
                            "truncate rounded-md px-1.5 py-1 text-[10px] font-semibold leading-tight",
                            TYPE_CLS[e.type]
                          )}
                          title={e.label}
                        >
                          {e.label}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="mt-6">
        <div className="text-sm font-bold text-slate-900">Legenda</div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            Jatuh tempo
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Pembayaran diterima
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
            Info operasional
          </div>
        </div>
      </Card>
    </Shell>
  );
}
