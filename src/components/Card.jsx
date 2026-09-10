import React from "react";
import { cn } from "../lib/utils";

export default function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03]",
        className
      )}
    >
      {children}
    </div>
  );
}
