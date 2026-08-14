"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/use-admin-auth";
import type { QuizQuestion, Flashcard, Badge as BadgeT } from "@/lib/types";

const inputClass =
  "focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none";

const emptyQuestion = {
  type: "mcq" as const,
  question: "",
  options: ["", ""],
  correctAnswer: "",
  explanation: "",
  isEnabled: true,
  sortOrder: 0,
};
const emptyFlashcard = {
  concept: "",
  definition: "",
  example: "",
  tip: "",
  isEnabled: true,
  sortOrder: 0,
};

export default function ManageMissionContentPage() {
  const { id } = useParams<{ id: string }>();
  const { status } = useAdminAuth();

  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [badge, setBadge] = useState<BadgeT | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [qForm, setQForm] = useState<any | null>(null);
  const [qEditingId, setQEditingId] = useState<string | null>(null);
  const [fForm, setFForm] = useState<any | null>(null);
  const [fEditingId, setFEditingId] = useState<string | null>(null);

  async function loadAll() {
    try {
      setError(null);
      const [qRes, fRes] = await Promise.all([
        fetch(`/api/admin/questions?missionId=${id}`),
        fetch(`/api/admin/flashcards?missionId=${id}`),
      ]);
      if (!qRes.ok || !fRes.ok) throw new Error("failed");
      setQuestions((await qRes.json()).questions);
      setFlashcards((await fRes.json()).flashcards);
    } catch {
      setError(
        "Couldn't load this mission's content. Check your connection and try again.",
      );
    }
  }

  useEffect(() => {
    if (status === "authed" && id) loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, id]);

  async function saveQuestion(e: React.FormEvent) {
    e.preventDefault();
    const cleanedOptions = qForm.options
      .map((o: string) => o.trim())
      .filter(Boolean);
    if (cleanedOptions.length < 2)
      return alert("Provide at least two answer options.");
    if (!cleanedOptions.includes(qForm.correctAnswer))
      return alert("The correct answer must match one of the options exactly.");
    const payload = { ...qForm, options: cleanedOptions, missionId: id };
    const url = qEditingId
      ? `/api/admin/questions/${qEditingId}`
      : "/api/admin/questions";
    const method = qEditingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return alert(data?.error || "Couldn't save this question.");
    }
    setQForm(null);
    setQEditingId(null);
    loadAll();
  }

  async function deleteQuestion(qid: string) {
    if (!confirm("Delete this question?")) return;
    await fetch(`/api/admin/questions/${qid}`, { method: "DELETE" });
    loadAll();
  }

  async function toggleQuestion(q: QuizQuestion) {
    await fetch(`/api/admin/questions/${q.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: !q.isEnabled }),
    });
    loadAll();
  }

  async function saveFlashcard(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...fForm, missionId: id };
    const url = fEditingId
      ? `/api/admin/flashcards/${fEditingId}`
      : "/api/admin/flashcards";
    const method = fEditingId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return alert(data?.error || "Couldn't save this flashcard.");
    }
    setFForm(null);
    setFEditingId(null);
    loadAll();
  }

  async function deleteFlashcard(fid: string) {
    if (!confirm("Delete this flashcard?")) return;
    await fetch(`/api/admin/flashcards/${fid}`, { method: "DELETE" });
    loadAll();
  }

  async function toggleFlashcard(f: Flashcard) {
    await fetch(`/api/admin/flashcards/${f.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isEnabled: !f.isEnabled }),
    });
    loadAll();
  }

  if (status !== "authed") {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Checking
        access…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to missions
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold text-navy">
        Manage quiz &amp; flashcards
      </h1>

      {error && <p className="mt-4 text-sm text-coral-dark">{error}</p>}

      {/* ---- Quiz Questions ---- */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Quiz Questions
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setQForm({ ...emptyQuestion });
              setQEditingId(null);
            }}
          >
            <Plus className="h-4 w-4" aria-hidden /> Add question
          </Button>
        </div>

        {questions === null && (
          <Loader2
            className="mt-4 h-5 w-5 animate-spin text-ink/40"
            aria-hidden
          />
        )}
        {questions && questions.length === 0 && (
          <p className="mt-3 text-sm text-ink/50">No questions yet.</p>
        )}

        <ul className="mt-4 space-y-2">
          {questions?.map((q) => (
            <li
              key={q.id}
              className="rounded-xl border border-ink/10 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{q.question}</p>
                  <p className="mt-1 text-xs text-ink/50">
                    Correct: {q.correctAnswer}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => toggleQuestion(q)}
                    className="focus-ring rounded-lg p-1.5 text-ink/50 hover:bg-ink/5"
                    title={q.isEnabled ? "Disable" : "Enable"}
                  >
                    {q.isEnabled ? (
                      <Eye className="h-4 w-4" aria-hidden />
                    ) : (
                      <EyeOff className="h-4 w-4" aria-hidden />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setQForm({ ...q });
                      setQEditingId(q.id);
                    }}
                    className="focus-ring rounded-lg p-1.5 text-ink/50 hover:bg-ink/5"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="focus-ring rounded-lg p-1.5 text-coral-dark/70 hover:bg-coral/10"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {qForm && (
          <form
            onSubmit={saveQuestion}
            className="mt-4 space-y-3 rounded-xl border border-ink/10 bg-white p-4"
          >
            <select
              value={qForm.type}
              onChange={(e) => setQForm({ ...qForm, type: e.target.value })}
              className={inputClass}
            >
              <option value="mcq">Multiple choice</option>
              <option value="true_false">True / False</option>
              <option value="scenario">Scenario</option>
            </select>
            <input
              required
              placeholder="Question"
              value={qForm.question}
              onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
              className={inputClass}
            />
            {qForm.options.map((opt: string, i: number) => (
              <input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const next = [...qForm.options];
                  next[i] = e.target.value;
                  setQForm({ ...qForm, options: next });
                }}
                className={inputClass}
              />
            ))}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() =>
                  setQForm({ ...qForm, options: [...qForm.options, ""] })
                }
              >
                + Add option
              </Button>
            </div>
            <input
              required
              placeholder="Correct answer (must match an option exactly)"
              value={qForm.correctAnswer}
              onChange={(e) =>
                setQForm({ ...qForm, correctAnswer: e.target.value })
              }
              className={inputClass}
            />
            <textarea
              required
              rows={2}
              placeholder="Explanation"
              value={qForm.explanation}
              onChange={(e) =>
                setQForm({ ...qForm, explanation: e.target.value })
              }
              className={inputClass}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setQForm(null);
                  setQEditingId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save question</Button>
            </div>
          </form>
        )}
      </section>

      {/* ---- Flashcards ---- */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Flashcards
          </h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setFForm({ ...emptyFlashcard });
              setFEditingId(null);
            }}
          >
            <Plus className="h-4 w-4" aria-hidden /> Add flashcard
          </Button>
        </div>

        {flashcards === null && (
          <Loader2
            className="mt-4 h-5 w-5 animate-spin text-ink/40"
            aria-hidden
          />
        )}
        {flashcards && flashcards.length === 0 && (
          <p className="mt-3 text-sm text-ink/50">No flashcards yet.</p>
        )}

        <ul className="mt-4 space-y-2">
          {flashcards?.map((f) => (
            <li
              key={f.id}
              className="rounded-xl border border-ink/10 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{f.concept}</p>
                  <p className="mt-1 truncate text-xs text-ink/50">
                    {f.definition}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => toggleFlashcard(f)}
                    className="focus-ring rounded-lg p-1.5 text-ink/50 hover:bg-ink/5"
                    title={f.isEnabled ? "Disable" : "Enable"}
                  >
                    {f.isEnabled ? (
                      <Eye className="h-4 w-4" aria-hidden />
                    ) : (
                      <EyeOff className="h-4 w-4" aria-hidden />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setFForm({ ...f });
                      setFEditingId(f.id);
                    }}
                    className="focus-ring rounded-lg p-1.5 text-ink/50 hover:bg-ink/5"
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    onClick={() => deleteFlashcard(f.id)}
                    className="focus-ring rounded-lg p-1.5 text-coral-dark/70 hover:bg-coral/10"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {fForm && (
          <form
            onSubmit={saveFlashcard}
            className="mt-4 space-y-3 rounded-xl border border-ink/10 bg-white p-4"
          >
            <input
              required
              placeholder="Concept"
              value={fForm.concept}
              onChange={(e) => setFForm({ ...fForm, concept: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              rows={2}
              placeholder="Definition"
              value={fForm.definition}
              onChange={(e) =>
                setFForm({ ...fForm, definition: e.target.value })
              }
              className={inputClass}
            />
            <textarea
              required
              rows={2}
              placeholder="Example"
              value={fForm.example}
              onChange={(e) => setFForm({ ...fForm, example: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              rows={2}
              placeholder="Common mistake / tip"
              value={fForm.tip}
              onChange={(e) => setFForm({ ...fForm, tip: e.target.value })}
              className={inputClass}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setFForm(null);
                  setFEditingId(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save flashcard</Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
