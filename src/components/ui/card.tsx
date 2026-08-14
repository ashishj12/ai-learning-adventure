import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "paper-grain rounded-2xl border border-ink/10 bg-white/80 backdrop-blur-sm shadow-sm p-6",
        className
      )}
      {...props}
    />
  );
}

const levelColors: Record<string, string> = {
  Beginner: "bg-teal/15 text-teal-dark",
  "Basic Understanding": "bg-amber/20 text-amber-dark",
  "Applied Practice": "bg-coral/15 text-coral-dark",
  "Responsible Use": "bg-navy/10 text-navy",
  "Builder Mindset": "bg-navy text-paper",
};

export function LevelPill({ level }: { level: string }) {
  return (
    <span
      className={cn(
        "stamp-label inline-flex items-center rounded-full px-3 py-1",
        levelColors[level] ?? "bg-ink/10 text-ink"
      )}
    >
      {level}
    </span>
  );
}
