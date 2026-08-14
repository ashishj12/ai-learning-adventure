"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuizQuestionSafe {
  id: string;
  type: string;
  question: string;
  options: string[];
}

interface Props {
  missionSlug: string;
  missionTitle: string;
  questions: QuizQuestionSafe[];
  onComplete: (score: number, total: number) => void;
}

interface AnswerResult {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  aiExplanation?: string;
  aiIsMock?: boolean;
  loadingAi?: boolean;
}

export function QuizFlow({ missionSlug, missionTitle, questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  async function submitAnswer() {
    if (!selected || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: current.id, selectedAnswer: selected }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Grading failed");
      setResult({ isCorrect: data.isCorrect, correctAnswer: data.correctAnswer, explanation: data.explanation, loadingAi: true });
      if (data.isCorrect) setScore((s) => s + 1);

      // Fire the AI explanation request after showing the static explanation —
      // it enriches the feedback but the learner isn't blocked waiting on it.
      fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "quiz_explanation",
          missionSlug,
          quizQuestion: current.question,
          selectedAnswer: selected,
          correctAnswer: data.correctAnswer,
          isCorrect: data.isCorrect,
        }),
      })
        .then((r) => r.json())
        .then((aiData) => {
          setResult((prev) => (prev ? { ...prev, aiExplanation: aiData.answer, aiIsMock: aiData.isMock, loadingAi: false } : prev));
        })
        .catch(() => {
          setResult((prev) => (prev ? { ...prev, loadingAi: false } : prev));
        });
    } catch {
      setResult({
        isCorrect: false,
        correctAnswer: current.options[0],
        explanation: "Couldn't grade this answer right now — please try submitting again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true);
      onComplete(score, questions.length);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setResult(null);
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center text-ink/60">
        There are no quiz questions available for this mission right now.
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-sm">
        <h2 className="font-display text-2xl font-semibold text-navy">
          You scored {score} / {questions.length}
        </h2>
        <p className="mt-1 text-ink/60">{pct}% — {pct >= 70 ? "nice work!" : "review the flashcards and give it another go."}</p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="stamp-label text-ink/45">Q-{String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span>
        <span className="stamp-label text-ink/45">Score {score}</span>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <motion.div className="h-full rounded-full bg-amber" animate={{ width: `${((index) / questions.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
        >
          <p className="font-display text-lg font-semibold text-ink">{current.question}</p>

          <div className="mt-4 space-y-2">
            {current.options.map((opt) => {
              const isSelected = selected === opt;
              const isRevealedCorrect = result && opt === result.correctAnswer;
              const isRevealedWrong = result && isSelected && opt !== result.correctAnswer;
              return (
                <button
                  key={opt}
                  disabled={!!result}
                  onClick={() => setSelected(opt)}
                  className={cn(
                    "focus-ring flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    !result && isSelected && "border-navy bg-navy/5",
                    !result && !isSelected && "border-ink/15 hover:bg-ink/5",
                    isRevealedCorrect && "border-teal bg-teal/10 text-teal-dark",
                    isRevealedWrong && "border-coral bg-coral/10 text-coral-dark"
                  )}
                >
                  {opt}
                  {isRevealedCorrect && <Check className="h-4 w-4" aria-hidden />}
                  {isRevealedWrong && <X className="h-4 w-4" aria-hidden />}
                </button>
              );
            })}
          </div>

          {!result && (
            <Button className="mt-5" onClick={submitAnswer} disabled={!selected || submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : "Submit answer"}
            </Button>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mt-5 rounded-xl p-4 text-sm",
                result.isCorrect ? "bg-teal/10 text-teal-dark" : "bg-coral/10 text-coral-dark"
              )}
            >
              <p className="font-semibold">{result.isCorrect ? "Correct!" : "Not quite."}</p>
              <p className="mt-1 text-ink/70">{result.explanation}</p>

              <div className="mt-3 flex items-start gap-2 border-t border-ink/10 pt-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-dark" aria-hidden />
                <div className="text-ink/70">
                  {result.loadingAi && (
                    <span className="inline-flex items-center gap-1.5 text-ink/40">
                      <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Getting AI explanation…
                    </span>
                  )}
                  {!result.loadingAi && result.aiExplanation && (
                    <>
                      {result.aiExplanation}
                      {result.aiIsMock && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink/50">
                          Sample
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <Button className="mt-4" size="sm" variant="secondary" onClick={next}>
                {index + 1 >= questions.length ? "See results" : "Next question"}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
