"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { BadgeGrid } from "@/components/badge-grid";
import { Card } from "@/components/ui/card";
import { buttonClass } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/session";
import type { MissionWithMeta, Badge as BadgeT } from "@/lib/types";

export default function ProgressPage() {
  const sessionId = useSessionStore((s) => s.sessionId);
  const [missions, setMissions] = useState<MissionWithMeta[] | null>(null);
  const [allBadges, setAllBadges] = useState<BadgeT[] | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<BadgeT[] | null>(null);
  const [nextTip, setNextTip] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [missionsRes, badgesRes, progressRes] = await Promise.all([
          fetch(`/api/missions?sessionId=${encodeURIComponent(sessionId)}`),
          fetch(`/api/badges`),
          fetch(`/api/progress?sessionId=${encodeURIComponent(sessionId)}`),
        ]);
        if (!missionsRes.ok || !badgesRes.ok || !progressRes.ok)
          throw new Error("Request failed");
        const missionsData = await missionsRes.json();
        const badgesData = await badgesRes.json();
        const progressData = await progressRes.json();
        if (cancelled) return;
        setMissions(missionsData.missions ?? []);
        setAllBadges(badgesData.badges ?? []);
        setEarnedBadges(progressData.badgesEarned ?? []);

        const incomplete = (missionsData.missions ?? []).find(
          (m: MissionWithMeta) => m.progress?.status !== "completed",
        );
        if (incomplete) {
          fetch("/api/tutor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "next_mission",
              missionSlug: incomplete.slug,
            }),
          })
            .then((r) => r.json())
            .then((d) => !cancelled && setNextTip(d.answer))
            .catch(() => {});
        }
      } catch {
        if (!cancelled)
          setError(
            "Couldn't load your progress right now. Check your connection and try again.",
          );
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center text-ink/60">
        {error}
      </div>
    );
  }

  if (!missions || !allBadges || !earnedBadges) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading progress…
      </div>
    );
  }

  const completed = missions.filter((m) => m.progress?.status === "completed");
  const total = missions.length;
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  const avgScore =
    completed.length > 0
      ? Math.round(
          (completed.reduce((sum, m) => sum + (m.progress?.quizScore ?? 0), 0) /
            completed.reduce(
              (sum, m) => sum + (m.progress?.quizTotal ?? 1),
              0,
            )) *
            100,
        )
      : null;
  const nextMission = missions.find((m) => m.progress?.status !== "completed");
  const earnedIds = new Set(earnedBadges.map((b) => b.id));

  if (total === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center text-ink/60">
        No missions are published yet — check back soon.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl font-semibold text-navy"
      >
        Your Progress
      </motion.h1>

      {completed.length === total ? (
        <Card className="mt-6 bg-teal/10 text-center">
          <p className="font-display text-xl font-semibold text-teal-dark">
            🎉 All missions complete!
          </p>
          <p className="mt-1 text-sm text-ink/60">
            You've earned every badge in this adventure so far.
          </p>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Completion
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy">
              {pct}%
            </p>
            <p className="text-xs text-ink/50">
              {completed.length} of {total} missions
            </p>
          </Card>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Avg. quiz score
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy">
              {avgScore !== null ? `${avgScore}%` : "—"}
            </p>
            <p className="text-xs text-ink/50">Across completed missions</p>
          </Card>
          <Card>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Badges earned
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy">
              {earnedBadges.length} / {allBadges.length}
            </p>
          </Card>
        </div>
      )}

      {nextMission && (
        <Card className="mt-6 border-amber/30 bg-amber/10">
          <div className="flex items-start gap-3">
            <Sparkles
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-dark"
              aria-hidden
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-dark">
                Suggested next mission
              </p>
              <p className="mt-1 text-sm text-ink/70">
                {nextTip ?? `Continue with "${nextMission.title}".`}
              </p>
              <Link
                href={`/missions/${nextMission.slug}`}
                className={buttonClass({ size: "sm" }, "mt-3 inline-flex")}
              >
                Go to {nextMission.title}
              </Link>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-8">
        <h2 className="font-display text-xl font-semibold text-navy">Badges</h2>
        <div className="mt-4">
          <BadgeGrid allBadges={allBadges} earnedIds={earnedIds} />
        </div>
      </div>
    </div>
  );
}
