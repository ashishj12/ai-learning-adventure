"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, PartyPopper, ArrowRight } from "lucide-react";
import { QuizFlow } from "@/components/quiz-flow";
import { buttonClass } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/session";
import type { Mission, Badge as BadgeT } from "@/lib/types";

export default function QuizPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const sessionId = useSessionStore((s) => s.sessionId);

  const [mission, setMission] = useState<Mission | null>(null);
  const [questions, setQuestions] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [completedState, setCompletedState] = useState<{
    score: number;
    total: number;
    badge: BadgeT | null;
    awarded: boolean;
  } | null>(null);
  const [nextTip, setNextTip] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(
          `/api/missions/${slug}?sessionId=${encodeURIComponent(sessionId)}`,
        );
        if (!res.ok) {
          if (!cancelled)
            setError(
              res.status === 404
                ? "This mission isn't available."
                : "Couldn't load the quiz.",
            );
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setMission(data.mission);
          setQuestions(data.questions);
        }
      } catch {
        if (!cancelled)
          setError(
            "Couldn't load the quiz. Check your connection and try again.",
          );
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug, sessionId]);

  async function handleComplete(score: number, total: number) {
    if (!mission) return;
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          missionId: mission.id,
          status: "completed",
          quizScore: score,
          quizTotal: total,
        }),
      });
      const data = await res.json();
      setCompletedState({
        score,
        total,
        badge: data.badge ?? null,
        awarded: !!data.badgeAwarded,
      });
    } catch {
      // Progress save failed (offline, etc.) — still show the score so the
      // learner isn't stuck on a blank screen; badge/progress just won't persist.
      setCompletedState({ score, total, badge: null, awarded: false });
    }

    fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "next_mission", missionSlug: mission.slug }),
    })
      .then((r) => r.json())
      .then((d) => setNextTip(d.answer))
      .catch(() => {});
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <AlertTriangle
          className="mx-auto h-6 w-6 text-coral-dark"
          aria-hidden
        />
        <p className="mt-3 text-ink/60">{error}</p>
      </div>
    );
  }

  if (!mission || !questions) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading quiz…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-navy">
        {mission.title} — Checkpoint
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        Answer each question to check your understanding.
      </p>

      <div className="mt-6">
        {!completedState ? (
          <QuizFlow
            missionSlug={mission.slug}
            missionTitle={mission.title}
            questions={questions}
            onComplete={handleComplete}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm"
          >
            {completedState.awarded && completedState.badge && (
              <motion.div
                initial={{ scale: 0, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber/20 text-amber-dark"
              >
                <PartyPopper className="h-8 w-8" aria-hidden />
              </motion.div>
            )}
            <h2 className="font-display text-2xl font-semibold text-navy">
              {completedState.score} / {completedState.total} correct
            </h2>
            {completedState.awarded && completedState.badge && (
              <p className="mt-2 text-sm font-medium text-amber-dark">
                Badge earned: {completedState.badge.name}
              </p>
            )}
            {nextTip && (
              <p className="mx-auto mt-4 max-w-md text-sm text-ink/60">
                {nextTip}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href={`/missions/${mission.slug}/flashcards`}
                className={buttonClass({ variant: "outline" })}
              >
                Review flashcards
              </Link>
              <Link href="/missions" className={buttonClass({})}>
                Back to Mission Map{" "}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
