"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  Loader2,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  Pencil,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/lib/use-admin-auth";
import type { Mission, MissionLevel } from "@/lib/types";

const LEVELS: MissionLevel[] = [
  "Beginner",
  "Basic Understanding",
  "Applied Practice",
  "Responsible Use",
  "Builder Mindset",
];

const emptyForm = {
  slug: "",
  title: "",
  level: "Beginner" as MissionLevel,
  objective: "",
  lessonContent: "",
  scenario: "",
  sortOrder: 0,
  isPublished: false,
  isEnabled: true,
};

export default function AdminPage() {
  const { status, login, logout } = useAdminAuth();
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [missions, setMissions] = useState<Mission[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function loadMissions() {
    try {
      setLoadError(null);
      const res = await fetch("/api/admin/missions");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setMissions(data.missions);
    } catch {
      setLoadError(
        "Couldn't load missions. Check your connection and try again.",
      );
    }
  }

  useEffect(() => {
    if (status === "authed") loadMissions();
  }, [status]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    const res = await login(passcode);
    setLoggingIn(false);
    if (!res.ok) setLoginError(res.error ?? "Login failed.");
  }

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: missions?.length ?? 0 });
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(m: Mission) {
    setEditingId(m.id);
    setForm({
      slug: m.slug,
      title: m.title,
      level: m.level,
      objective: m.objective,
      lessonContent: m.lessonContent,
      scenario: m.scenario,
      sortOrder: m.sortOrder,
      isPublished: m.isPublished,
      isEnabled: m.isEnabled,
    });
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      const url = editingId
        ? `/api/admin/missions/${editingId}`
        : "/api/admin/missions";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data?.error || "Couldn't save this mission.");
        return;
      }
      setFormOpen(false);
      await loadMissions();
    } catch {
      setFormError(
        "Couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleField(m: Mission, field: "isPublished" | "isEnabled") {
    // Optimistic update, rolled back on failure so the UI never silently drifts from the server.
    const prev = missions;
    setMissions(
      (cur) =>
        cur?.map((x) => (x.id === m.id ? { ...x, [field]: !x[field] } : x)) ??
        cur,
    );
    try {
      const res = await fetch(`/api/admin/missions/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !m[field] }),
      });
      if (!res.ok) throw new Error("failed");
    } catch {
      setMissions(prev);
      alert("Couldn't update this mission. Please try again.");
    }
  }

  async function handleDelete(m: Mission) {
    if (
      !confirm(
        `Delete "${m.title}"? This also removes its quiz questions, flashcards, and badge. This can't be undone.`,
      )
    )
      return;
    try {
      const res = await fetch(`/api/admin/missions/${m.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("failed");
      await loadMissions();
    } catch {
      alert("Couldn't delete this mission. Please try again.");
    }
  }

  // ---- render ----

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-ink/50">
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Checking
        access…
      </div>
    );
  }

  if (status === "anon") {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center px-6 py-24">
        <ShieldCheck className="h-8 w-8 text-navy" aria-hidden />
        <h1 className="mt-3 font-display text-2xl font-semibold text-navy">
          Content Management
        </h1>
        <p className="mt-1 text-center text-sm text-ink/60">
          Enter the admin passcode to manage missions, quizzes, and flashcards.
        </p>
        <form onSubmit={handleLogin} className="mt-6 w-full space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Admin passcode"
            aria-label="Admin passcode"
            className="focus-ring w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm outline-none"
          />
          {loginError && (
            <p className="text-sm text-coral-dark">{loginError}</p>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loggingIn || !passcode}
          >
            {loggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              "Enter"
            )}
          </Button>
        </form>
        <p className="mt-4 text-xs text-ink/40">
          Default passcode is set via ADMIN_PASSCODE in your .env file.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">
            Content Management
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Add, edit, publish, and preview missions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden /> New mission
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" aria-hidden /> Log out
          </Button>
        </div>
      </div>

      {loadError && <p className="mt-6 text-sm text-coral-dark">{loadError}</p>}

      {!loadError && missions === null && (
        <div className="flex items-center justify-center gap-2 py-16 text-ink/50">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Loading…
        </div>
      )}

      {!loadError && missions && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-ink/5 text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="px-4 py-3">Mission</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Enabled</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink/50">
                    No missions yet — create your first one.
                  </td>
                </tr>
              )}
              {missions.map((m) => (
                <tr key={m.id} className="border-b border-ink/5 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{m.title}</td>
                  <td className="px-4 py-3 text-ink/60">{m.level}</td>
                  <td className="px-4 py-3">
                    <ToggleChip
                      on={m.isPublished}
                      onClick={() => toggleField(m, "isPublished")}
                      onLabel="Published"
                      offLabel="Draft"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <ToggleChip
                      on={m.isEnabled}
                      onClick={() => toggleField(m, "isEnabled")}
                      onLabel="Enabled"
                      offLabel="Disabled"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/missions/${m.slug}`}
                        target="_blank"
                        className="focus-ring rounded-lg p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
                        title="Preview as learner"
                      >
                        <Eye className="h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href={`/admin/missions/${m.id}`}
                        className="focus-ring rounded-lg p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
                        title="Manage quiz & flashcards"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </Link>
                      <button
                        onClick={() => openEdit(m)}
                        className="focus-ring rounded-lg p-2 text-ink/50 hover:bg-ink/5 hover:text-ink"
                        title="Edit mission"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        onClick={() => handleDelete(m)}
                        className="focus-ring rounded-lg p-2 text-coral-dark/70 hover:bg-coral/10 hover:text-coral-dark"
                        title="Delete mission"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4"
          onClick={() => setFormOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg"
          >
            <h2 className="font-display text-lg font-semibold text-navy">
              {editingId ? "Edit mission" : "New mission"}
            </h2>
            <form onSubmit={handleSave} className="mt-4 space-y-3">
              <Field label="Title">
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Slug (lowercase, hyphens only)">
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  pattern="[a-z0-9-]+"
                  className={inputClass}
                />
              </Field>
              <Field label="Level">
                <select
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value as MissionLevel })
                  }
                  className={inputClass}
                >
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Objective">
                <input
                  required
                  value={form.objective}
                  onChange={(e) =>
                    setForm({ ...form, objective: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Lesson content (use blank lines between paragraphs)">
                <textarea
                  required
                  rows={5}
                  value={form.lessonContent}
                  onChange={(e) =>
                    setForm({ ...form, lessonContent: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Example / scenario">
                <textarea
                  required
                  rows={2}
                  value={form.scenario}
                  onChange={(e) =>
                    setForm({ ...form, scenario: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-ink/70">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      setForm({ ...form, isPublished: e.target.checked })
                    }
                  />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm text-ink/70">
                  <input
                    type="checkbox"
                    checked={form.isEnabled}
                    onChange={(e) =>
                      setForm({ ...form, isEnabled: e.target.checked })
                    }
                  />
                  Enabled
                </label>
              </div>

              {formError && (
                <p className="text-sm text-coral-dark">{formError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "focus-ring w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function ToggleChip({
  on,
  onClick,
  onLabel,
  offLabel,
}: {
  on: boolean;
  onClick: () => void;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
        on
          ? "bg-teal/15 text-teal-dark hover:bg-teal/25"
          : "bg-ink/10 text-ink/50 hover:bg-ink/15"
      }`}
    >
      {on ? onLabel : offLabel}
    </button>
  );
}
