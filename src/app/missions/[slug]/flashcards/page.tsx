"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { FlashcardDeck } from "@/components/flashcard-deck";
import type { Mission, Flashcard } from "@/lib/types";

export default function FlashcardsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [cards, setCards] = useState<Flashcard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/missions/${slug}`);
        if (!res.ok) {
          if (!cancelled)
            setError(
              res.status === 404
                ? "This mission isn't available."
                : "Couldn't load flashcards.",
            );
          return;
        }
        const data = await res.json();
        if (!cancelled) {
          setMission(data.mission);
          setCards(data.flashcards);
        }
      } catch {
        if (!cancelled)
          setError(
            "Couldn't load flashcards. Check your connection and try again.",
          );
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

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

  if (!mission || !cards) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        Loading flashcards…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-navy">
        {mission.title} — Flashcards
      </h1>
      <p className="mt-1 text-sm text-ink/60">
        Tap a card to flip between the concept and its definition.
      </p>
      <div className="mt-6">
        <FlashcardDeck cards={cards} />
      </div>
    </div>
  );
}
