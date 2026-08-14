"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TutorMode } from "@/lib/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  isMock?: boolean;
}

interface Props {
  mode: TutorMode;
  missionSlug?: string;
  missionTitle?: string;
  missionContent?: string;
  placeholder?: string;
  suggestedPrompts?: string[];
  initialQuestion?: string;
  className?: string;
}

export function TutorPanel({
  mode,
  missionSlug,
  missionTitle,
  missionContent,
  placeholder = "Ask the tutor a question…",
  suggestedPrompts = [],
  initialQuestion,
  className,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firedInitial = useRef(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuestion && !firedInitial.current) {
      firedInitial.current = true;
      ask(initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    setErrored(false);
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, question, missionSlug, missionTitle, missionContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Tutor request failed");
      setMessages((m) => [...m, { role: "assistant", content: data.answer, isMock: data.isMock }]);
    } catch {
      setErrored(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I couldn't reach the tutor just now. Please try asking again in a moment.",
          isMock: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("paper-grain flex flex-col rounded-2xl border border-ink/10 bg-white shadow-sm", className)}>
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <Sparkles className="h-4 w-4 text-amber-dark" aria-hidden />
        <span className="stamp-label text-ink/70">AI Tutor</span>
      </div>

      <div ref={scrollRef} className="max-h-80 min-h-[9rem] flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-ink/50">
              Ask me to explain this topic, give a hint, or suggest what to learn next.
            </p>
            {suggestedPrompts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => ask(p)}
                    className="focus-ring rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 hover:bg-ink/5"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user" ? "bg-navy text-parchment" : "bg-parchment-dim text-ink"
                )}
              >
                {m.content}
                {m.isMock && (
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-ink/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink/50">
                    Sample response
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-parchment-dim px-4 py-2.5 text-sm text-ink/50">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              Thinking…
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border-t border-ink/10 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          aria-label="Ask the AI tutor"
          className="focus-ring flex-1 rounded-full border border-ink/15 bg-parchment px-4 py-2 text-sm outline-none placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send question"
          className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber text-navy transition-colors hover:bg-amber-dark disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
