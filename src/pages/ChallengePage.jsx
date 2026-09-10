import React, { useMemo, useState } from "react";
import { Trophy, Check } from "lucide-react";
import Shell from "../components/Shell";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { fmtIDR } from "../lib/format";
import { cn } from "../lib/utils";

const TOTAL_WEEKS = 26;
const BASE_AMOUNT = 50000;
const INITIAL_COMPLETED = 14;

export default function ChallengePage() {
  const weeks = useMemo(
    () =>
      Array.from({ length: TOTAL_WEEKS }, (_, i) => ({
        week: i + 1,
        amount: (i + 1) * BASE_AMOUNT,
      })),
    []
  );
  const [completed, setCompleted] = useState(
    new Set(Array.from({ length: INITIAL_COMPLETED }, (_, i) => i + 1))
  );

  const toggle = (week) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  const totalTarget = weeks.reduce((s, w) => s + w.amount, 0);
  const totalSaved = weeks
    .filter((w) => completed.has(w.week))
    .reduce((s, w) => s + w.amount, 0);

  return (
    <Shell
      title="Tantangan Menabung"
      subtitle="Tantangan menabung 26 minggu — jumlah setoran naik bertahap tiap minggu."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          icon={Trophy}
          iconCls="bg-blue-50 text-blue-600"
          label="Terkumpul"
          value={fmtIDR(totalSaved)}
          trend={`${completed.size} dari ${TOTAL_WEEKS} minggu`}
          trendUp
        />
        <StatCard
          icon={Trophy}
          iconCls="bg-slate-100 text-slate-600"
          label="Target Akhir"
          value={fmtIDR(totalTarget)}
        />
        <StatCard
          icon={Trophy}
          iconCls="bg-emerald-50 text-emerald-600"
          label="Progres"
          value={`${Math.round((completed.size / TOTAL_WEEKS) * 100)}%`}
        />
      </div>

      <Card className="mt-8">
        <div className="text-sm font-bold text-slate-900">
          Klik minggu yang sudah disetor
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {weeks.map((w) => {
            const done = completed.has(w.week);
            return (
              <button
                key={w.week}
                onClick={() => toggle(w.week)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-colors",
                  done
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-100 bg-white hover:bg-slate-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                    done
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : w.week}
                </div>
                <div className="text-[11px] font-semibold text-slate-600">
                  Minggu {w.week}
                </div>
                <div className="text-[11px] text-slate-400">
                  {fmtIDR(w.amount)}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </Shell>
  );
}
