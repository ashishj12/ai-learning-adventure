"use client";

import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Badge as BadgeT } from "@/lib/types";

export function BadgeGrid({
  allBadges,
  earnedIds,
}: {
  allBadges: BadgeT[];
  earnedIds: Set<string>;
}) {
  if (allBadges.length === 0) {
    return <p className="text-sm text-ink/50">No badges available yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
      {allBadges.map((badge, i) => {
        const earned = earnedIds.has(badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: i * 0.05,
              type: "spring",
              stiffness: 220,
              damping: 16,
            }}
            className="flex flex-col items-center text-center"
          >
            {/* "Wax seal" medallion — ridged border via layered shadows, so
                a badge reads as an earned artifact rather than a generic icon tile. */}
            <div
              className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-full",
                earned ? "bg-amber text-navy-deep" : "bg-ink/8 text-ink/25",
              )}
              style={
                earned
                  ? {
                      boxShadow:
                        "0 0 0 3px var(--paper), 0 0 0 5px var(--amber-dark), 0 3px 6px rgba(0,0,0,0.15)",
                    }
                  : {
                      boxShadow:
                        "0 0 0 3px var(--paper), 0 0 0 4px rgba(32,29,26,0.12)",
                    }
              }
            >
              {earned ? (
                <Award className="h-7 w-7" aria-hidden />
              ) : (
                <Lock className="h-5 w-5" aria-hidden />
              )}
            </div>
            <p
              className={cn(
                "mt-2.5 text-sm font-semibold",
                earned ? "text-ink" : "text-ink/40",
              )}
            >
              {badge.name}
            </p>
            <p className="mt-0.5 text-xs text-ink/45">{badge.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
