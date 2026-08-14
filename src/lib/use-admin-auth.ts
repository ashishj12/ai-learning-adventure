"use client";

import { useCallback, useEffect, useState } from "react";

export function useAdminAuth() {
  const [status, setStatus] = useState<"checking" | "authed" | "anon">(
    "checking",
  );

  const check = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/missions");
      setStatus(res.ok ? "authed" : "anon");
    } catch {
      setStatus("anon");
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  async function login(
    passcode: string,
  ): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return { ok: false, error: data?.error || "Login failed." };
      setStatus("authed");
      return { ok: true };
    } catch {
      return {
        ok: false,
        error: "Couldn't reach the server. Check your connection.",
      };
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } finally {
      setStatus("anon");
    }
  }

  return { status, login, logout, recheck: check };
}
