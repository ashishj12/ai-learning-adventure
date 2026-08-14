"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TutorPanel } from "@/components/tutor-panel";

function AiOnlyModeContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") ?? undefined;

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> AI Only Mode
        </div>
        <h1 className="font-display text-3xl font-semibold text-navy">
          Ask me anything about AI basics
        </h1>
        <p className="mt-2 text-ink/60">
          Free-form Q&A with your tutor — ask for simpler explanations,
          examples, hints, a mission recap, or what to learn next. I'll stay
          focused on the AI literacy content in this app.
        </p>
      </motion.div>

      <div className="mt-6">
        <TutorPanel
          mode="ai_only"
          placeholder="e.g. What's the difference between an LLM and generative AI?"
          suggestedPrompts={[
            "What should I learn next?",
            "Explain hallucinations simply",
            "Summarize prompt engineering basics",
          ]}
          initialQuestion={initialQuestion}
          className="h-[32rem]"
        />
      </div>
    </div>
  );
}

export default function AiOnlyModePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-6 py-10 text-ink/40">Loading…</div>
      }
    >
      <AiOnlyModeContent />
    </Suspense>
  );
}
