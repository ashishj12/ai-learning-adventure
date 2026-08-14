"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Flashcard } from "@/lib/types";

export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">
        There are no flashcards available for this mission right now.
      </div>
    );
  }

  const card = cards[index];

  function go(delta: number) {
    setFlipped(false);
    setIndex((i) => Math.min(Math.max(i + delta, 0), cards.length - 1));
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-ink/50">
        <span>Card {index + 1} of {cards.length}</span>
        <span>{card.concept}</span>
      </div>

      <div className="[perspective:1200px]">
        <AnimatePresence mode="wait">
          <motion.button
            key={card.id}
            onClick={() => setFlipped((f) => !f)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="focus-ring block h-64 w-full rounded-2xl"
            aria-label={flipped ? "Show concept" : "Show definition"}
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="relative h-full w-full [transform-style:preserve-3d]"
            >
              {/* Front */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-navy p-6 text-center text-parchment shadow-sm [backface-visibility:hidden]">
                <p className="font-display text-2xl font-semibold">{card.concept}</p>
                <p className="mt-3 text-xs text-parchment/60">Tap to flip</p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col justify-center gap-2 overflow-y-auto rounded-2xl border border-ink/10 bg-white p-6 text-left shadow-sm [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <p className="text-sm text-ink/80">{card.definition}</p>
                <p className="text-xs text-ink/60"><span className="font-semibold text-teal-dark">Example: </span>{card.example}</p>
                <p className="text-xs text-ink/60"><span className="font-semibold text-amber-dark">Tip: </span>{card.tip}</p>
              </div>
            </motion.div>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => go(-1)} disabled={index === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden /> Prev
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setFlipped((f) => !f)}>
          <RotateCw className="h-4 w-4" aria-hidden /> Flip
        </Button>
        <Button variant="outline" size="sm" onClick={() => go(1)} disabled={index === cards.length - 1}>
          Next <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
