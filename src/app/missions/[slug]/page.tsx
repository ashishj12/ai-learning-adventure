"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { LevelPill } from "@/components/ui/card";
import { buttonClass } from "@/components/ui/button";
import { TutorPanel } from "@/components/tutor-panel";
import { useSessionStore } from "@/lib/store/session";
import type { Mission, Flashcard, Badge as BadgeT, Progress } from "@/lib/types";

interface MissionDetailResponse {
  mission: Mission;
  questions: unknown[];
  flashcards: Flashcard[];
  badge: BadgeT | null;
  progress: Progress | null;
}

export default function MissionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sessionId = useSessionStore((s) => s.sessionId);
  const setLastVisitedMission = useSessionStore((s) => s.setLastVisitedMission);

  const [data, setData] = useState<MissionDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLastVisitedMission(slug);
    let cancelled = false;
    async function load() {
      try {
        setError(null);
        setNotFound(false);
        const res = await fetch(`/api/missions/${slug}?sessionId=${encodeURIComponent(sessionId)}`);
        if (res.status === 404) {
          if (!cancelled) setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError("Couldn't load this mission. Check your connection and try again.");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, sessionId]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Mission not found</h1>
        <p className="mt-2 text-ink/60">This mission doesn't exist, or isn't published yet.</p>
        <Link href="/missions" className={buttonClass({}, "mt-6 inline-flex")}>
          Back to Mission Map
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <AlertTriangle className="mx-auto h-6 w-6 text-coral-dark" aria-hidden />
        <p className="mt-3 text-ink/60">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading mission…
      </div>
    );
  }

  const { mission, flashcards, progress } = data;
  const isCompleted = progress?.status === "completed";

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <LevelPill level={mission.level} />
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-dark">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Completed
            </span>
          )}
        </div>
        <h1 className="font-display text-3xl font-semibold text-navy">{mission.title}</h1>
        <p className="mt-2 text-sm font-medium text-ink/60">Objective: {mission.objective}</p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="mt-8 space-y-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
      >
        {mission.lessonContent.split("\n\n").map((para, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-ink/80">
            {para}
          </p>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-5 flex gap-3 rounded-2xl border border-amber/30 bg-amber/10 p-5"
      >
        <Lightbulb className="h-5 w-5 shrink-0 text-amber-dark" aria-hidden />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-dark">Example</p>
          <p className="mt-1 text-sm leading-relaxed text-ink/80">{mission.scenario}</p>
        </div>
      </motion.section>

      <div className="mt-6">
        <TutorPanel
          mode="mission_help"
          missionSlug={mission.slug}
          missionTitle={mission.title}
          missionContent={mission.lessonContent}
          placeholder={`Ask about "${mission.title}"…`}
          suggestedPrompts={["Explain this more simply", "Give me another example", "Give me a hint for the quiz"]}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        <Link
          href={`/missions/${mission.slug}/quiz`}
          className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-sm font-semibold text-ink">Take the checkpoint quiz</span>
          <span className="mt-1 text-xs text-ink/50">Test what you just learned</span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-dark">
            Start quiz <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
        <Link
          href={`/missions/${mission.slug}/flashcards`}
          className="group flex flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-sm font-semibold text-ink">Review flashcards</span>
          <span className="mt-1 text-xs text-ink/50">{flashcards.length} concept cards for this mission</span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-dark">
            Review cards <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
