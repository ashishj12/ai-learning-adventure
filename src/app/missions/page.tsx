"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { MissionMap } from "@/components/mission-map";
import { useSessionStore } from "@/lib/store/session";
import type { MissionWithMeta } from "@/lib/types";

export default function MissionsPage() {
  const sessionId = useSessionStore((s) => s.sessionId);
  const startJourney = useSessionStore((s) => s.startJourney);
  const [missions, setMissions] = useState<MissionWithMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startJourney();
    let cancelled = false;
    async function load() {
      try {
        setError(null);
        const res = await fetch(
          `/api/missions?sessionId=${encodeURIComponent(sessionId)}`,
        );
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (!cancelled) setMissions(data.missions ?? []);
      } catch {
        if (!cancelled)
          setError(
            "Couldn't load missions right now. Check your connection and try again.",
          );
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const completedCount =
    missions?.filter((m) => m.progress?.status === "completed").length ?? 0;
  const total = missions?.length ?? 0;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-semibold text-navy">
          Mission Map
        </h1>
        <p className="mt-1 text-ink/60">
          Follow the path - each mission unlocks the next.
        </p>

        {total > 0 && (
          <div className="mt-5">
            <div className="mb-1 flex justify-between text-xs font-medium text-ink/60">
              <span>
                {completedCount} of {total} missions complete
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full rounded-full bg-teal"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-10">
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-coral/30 bg-coral/10 p-4 text-sm text-coral-dark">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden />
            {error}
          </div>
        )}

        {!error && missions === null && (
          <div className="flex items-center justify-center gap-2 py-16 text-ink/50">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Loading missions…
          </div>
        )}

        {!error && missions !== null && missions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">
            No missions are published yet. Check back soon, or visit the content
            management area if you're an admin.
          </div>
        )}

        {!error && missions && missions.length > 0 && (
          <MissionMap missions={missions} />
        )}
      </div>
    </div>
  );
}
