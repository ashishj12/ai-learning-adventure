"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { LevelPill } from "@/components/ui/card";
import type { MissionWithMeta } from "@/lib/types";

interface Props {
  missions: MissionWithMeta[];
}

export function MissionMap({ missions }: Props) {
  // A mission is locked until every mission before it is completed — gives the
  // "path" a real sense of progression rather than an open free-for-all.
  let firstIncompleteFound = false;

  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        aria-hidden
        className="trail-rule pointer-events-none absolute left-8 top-0 -z-10 h-full w-px sm:left-8"
      />

      <ol className="flex flex-col gap-8 py-4">
        {missions.map((mission, i) => {
          const isCompleted = mission.progress?.status === "completed";
          let isLocked = false;
          if (!isCompleted) {
            if (firstIncompleteFound) isLocked = true;
            firstIncompleteFound = true;
          }
          const isCurrent = !isCompleted && !isLocked;
          const wp = String(i + 1).padStart(2, "0");

          const node = (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative flex shrink-0 flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-sm",
                  isCompleted && "border-teal bg-teal/15 text-teal-dark",
                  isCurrent && "border-amber bg-amber/20 text-amber-dark",
                  isLocked && "border-ink/10 bg-white text-ink/25",
                )}
              >
                {isCurrent && (
                  <span
                    className="absolute inset-0 rounded-full border-2 border-amber/50 animate-ping"
                    aria-hidden
                  />
                )}
                {isCompleted ? (
                  <Check className="h-6 w-6" aria-hidden />
                ) : isLocked ? (
                  <Lock className="h-5 w-5" aria-hidden />
                ) : (
                  <MapPin className="h-6 w-6" aria-hidden />
                )}
              </div>
              <span className="font-stamp text-[10px] font-semibold text-ink/35">
                WP-{wp}
              </span>
            </motion.div>
          );

          const content = (
            <div className="paper-grain min-w-0 flex-1 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <LevelPill level={mission.level} />
                {isCompleted && (
                  <span className="text-xs font-medium text-teal-dark">
                    Completed
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">
                {mission.title}
              </h3>
              <p className="mt-1 text-sm text-ink/60">{mission.objective}</p>
            </div>
          );

          const body = (
            <li key={mission.id} className="flex items-start gap-4">
              {node}
              <div className="pt-1">{content}</div>
            </li>
          );

          if (isLocked) {
            return (
              <div
                key={mission.id}
                aria-disabled
                title="Complete the previous mission to unlock this one"
                className="cursor-not-allowed opacity-60"
              >
                {body}
              </div>
            );
          }

          return (
            <Link
              key={mission.id}
              href={`/missions/${mission.slug}`}
              className="focus-ring rounded-2xl transition-transform hover:-translate-y-0.5"
            >
              {body}
            </Link>
          );
        })}
      </ol>
    </div>
  );
}
