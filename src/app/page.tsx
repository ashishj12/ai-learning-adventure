"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Send,
} from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { useSessionStore } from "@/lib/store/session";

const tickerTerms = [
  "PROMPTS",
  "LARGE LANGUAGE MODELS",
  "TOKENS",
  "HALLUCINATIONS",
  "BIAS",
  "RETRIEVAL-AUGMENTED GENERATION",
  "CONTEXT WINDOWS",
];

const heroPrompts = [
  "What's the difference between AI and generative AI?",
  "Explain hallucinations like I'm new to this",
  "What should I learn first?",
];

const showcase = [
  {
    n: "01",
    slug: "what-is-ai",
    eyebrow: "Beginner · Mission 01",
    title: "Understand the",
    accent: "basics",
    copy: "Start with what AI actually is - pattern-matching at scale, not magic. No jargon, no assumed knowledge.",
  },
  {
    n: "02",
    slug: "prompt-engineering-basics",
    eyebrow: "Basic Understanding · Mission 04",
    title: "Craft better",
    accent: "prompts",
    copy: "Learn why specific, structured prompts get better answers - and practice on real examples.",
  },
  {
    n: "03",
    slug: "retrieval-augmented-generation",
    eyebrow: "Builder Mindset · Mission 08",
    title: "Ground your",
    accent: "answers",
    copy: "See how retrieval keeps AI answers current and honest instead of guessing from memory.",
  },
];

const faqs = [
  {
    q: "Do I need to sign in?",
    a: "No. Your progress is saved automatically in this browser - no account, no email, nothing to set up.",
  },
  {
    q: "Does the AI tutor cost anything?",
    a: "The tutor works out of the box using built-in sample responses. If the app owner connects a free-tier AI key, you'll get live answers instead - either way, nothing is required from you.",
  },
  {
    q: "What if I already know some AI basics?",
    a: "Missions are grouped by level, from Beginner through Builder Mindset. Jump to whichever mission matches what you already know - the map just asks you to finish one to unlock the next.",
  },
  {
    q: "Can I revisit a mission later?",
    a: "Yes - completed missions stay on your map along with your quiz score, and flashcards are always there for review.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const hasStarted = useSessionStore((s) => s.hasStartedJourney);
  const lastSlug = useSessionStore((s) => s.lastVisitedMissionSlug);
  const [mounted, setMounted] = useState(false);
  const [heroInput, setHeroInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => setMounted(true), []);

  function submitHeroPrompt(e: FormEvent) {
    e.preventDefault();
    if (!heroInput.trim()) return;
    router.push(`/ai-tutor?q=${encodeURIComponent(heroInput.trim())}`);
  }

  return (
    <div>
      {/* ---------------- Hero: split layout ---------------- */}
      <section className="relative overflow-hidden bg-navy">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: statement + AI prompt-box CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="stamp-label mb-6 inline-flex items-center gap-2 rounded-full border border-paper/20 bg-white/5 px-4 py-1.5 text-paper/80"
            >
              <Compass className="h-3.5 w-3.5" aria-hidden />
              WP-00 · Start Here
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl font-semibold leading-[1.08] text-paper sm:text-5xl lg:text-6xl"
            >
              Learn AI, one{" "}
              <em className="font-display italic text-amber">mission</em> at a
              time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-lg text-base text-paper/65 sm:text-lg"
            >
              Prompts, LLMs, hallucinations, bias, tokens, RAG - explained
              through short missions, quizzes, flashcards, and a tutor you can
              actually talk to.
            </motion.p>

            {/* Real product hook: this hands off straight into AI Only Mode. */}
            <motion.form
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              onSubmit={submitHeroPrompt}
              className="mt-8 rounded-2xl border border-paper/15 bg-navy-light/60 p-4 backdrop-blur-sm"
            >
              <label
                htmlFor="hero-prompt"
                className="stamp-label mb-2 block text-paper/40"
              >
                Ask the tutor
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="hero-prompt"
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  placeholder="e.g. What's a hallucination?"
                  className="focus-ring w-full rounded-full border border-paper/15 bg-navy px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Ask the tutor"
                  className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber text-navy-deep transition-transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      router.push(`/ai-tutor?q=${encodeURIComponent(p)}`)
                    }
                    className="focus-ring rounded-full border border-paper/10 px-3 py-1 text-xs text-paper/50 transition-colors hover:border-amber/40 hover:text-paper"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 flex items-center gap-4"
            >
              <Link href="/missions" className={buttonClass({ size: "md" })}>
                {mounted && hasStarted
                  ? "Continue your journey"
                  : "Start your journey"}
              </Link>
              {mounted && hasStarted && lastSlug && (
                <Link
                  href={`/missions/${lastSlug}`}
                  className="text-sm font-medium text-paper/50 underline underline-offset-4 hover:text-paper focus-ring"
                >
                  Jump back in
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: halftone map medallion with crosshair corners */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="map-corners relative mx-auto aspect-square w-full max-w-sm border border-paper/10"
          >
            <span className="corner-tr" />
            <span className="corner-br" />
            <div className="absolute inset-6 overflow-hidden rounded-full border border-amber/30">
              <div className="halftone absolute inset-0 text-amber/70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass
                  className="h-20 w-20 text-paper/90"
                  strokeWidth={1}
                  aria-hidden
                />
              </div>
              <svg
                aria-hidden
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full opacity-40"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="var(--paper)"
                  strokeWidth="1"
                  strokeDasharray="1 8"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="130"
                  fill="none"
                  stroke="var(--paper)"
                  strokeWidth="1"
                  strokeDasharray="1 8"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Concept ticker */}
        <div className="relative overflow-hidden border-t border-paper/10 py-3">
          <div className="marquee-track flex w-max gap-8 whitespace-nowrap">
            {[...tickerTerms, ...tickerTerms].map((term, i) => (
              <span key={i} className="stamp-label text-paper/30">
                {term} <span className="text-amber/40">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Numbered mission showcase ---------------- */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {showcase.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col items-center gap-10 py-12 first:pt-0 last:pb-0 sm:gap-16 ${
                i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
              } ${i > 0 ? "border-t border-ink/10" : ""}`}
            >
              <Link
                href={`/missions/${item.slug}`}
                className="map-corners halftone relative aspect-square w-full max-w-[240px] shrink-0 overflow-hidden rounded-2xl border border-ink/10 text-navy/70 transition-transform hover:-translate-y-1 focus-ring"
              >
                <span className="corner-tr" />
                <span className="corner-br" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-stamp text-6xl font-semibold text-navy/15">
                    {item.n}
                  </span>
                </div>
              </Link>

              <div className="max-w-md">
                <p className="stamp-label text-amber-dark">{item.eyebrow}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
                  {item.title}{" "}
                  <em className="italic text-amber-dark">{item.accent}</em>
                </h3>
                <p className="mt-3 text-ink/60">{item.copy}</p>
                <Link
                  href={`/missions/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all focus-ring"
                >
                  Open this mission{" "}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="bg-paper-dim px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <p className="stamp-label text-amber-dark">The route</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
              How the journey works
            </h2>
          </motion.div>

          <ol className="relative">
            <div
              aria-hidden
              className="trail-rule absolute bottom-6 left-6 top-6 w-px sm:left-7"
            />
            {[
              {
                n: "01",
                title: "Start a mission",
                copy: "Pick the next waypoint on the map. Each mission is a short, focused lesson on one AI concept.",
              },
              {
                n: "02",
                title: "Ask the tutor",
                copy: "Stuck on something? Ask for a simpler explanation, another example, or a hint - right inside the mission.",
              },
              {
                n: "03",
                title: "Check your answers",
                copy: "Take the checkpoint quiz. Every answer comes with a plain-language explanation of why it's right or wrong.",
              },
              {
                n: "04",
                title: "Earn your badge",
                copy: "Finish the mission, collect its badge, and get a suggestion for what to explore next.",
              },
            ].map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                <span className="font-stamp relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-paper-dim text-sm font-semibold text-navy sm:h-14 sm:w-14">
                  {step.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/65">{step.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- FAQ: thin-divider editorial list ---------------- */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <p className="stamp-label text-amber-dark">Before you set off</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
              A few questions
            </h2>
          </motion.div>

          <div className="border-t border-ink/10">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q} className="border-b border-ink/10">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg text-ink">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-ink/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-ink/60">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Closing statement band ---------------- */}
      <section className="bg-navy px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="stamp-label text-paper/40"
        >
          WP-01 is waiting
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Link
            href="/missions"
            className="group mt-3 inline-flex items-center gap-3 font-display text-4xl font-semibold text-paper transition-colors hover:text-amber sm:text-6xl"
          >
            Start your journey
            <ArrowUpRight
              className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-12 sm:w-12"
              aria-hidden
            />
          </Link>
        </motion.div>
      </section>

      {/* ---------------- Minimal footer ---------------- */}
      <footer className="border-t border-paper/10 bg-navy px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-paper/35 sm:flex-row">
          <span className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5" aria-hidden /> AI Learning
            Adventure
          </span>
          <span>
            A guided journey through AI literacy - no account required.
          </span>
        </div>
      </footer>
    </div>
  );
}
