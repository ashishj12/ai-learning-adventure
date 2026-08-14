"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SessionState {
  sessionId: string;
  hasStartedJourney: boolean;
  lastVisitedMissionSlug: string | null;
  startJourney: () => void;
  setLastVisitedMission: (slug: string) => void;
}

function generateSessionId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    // Extremely old browsers without crypto.randomUUID — fall back to a timestamp+random id
    // rather than throwing, so the app never fails to start a session.
    return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

// Wrap localStorage so private-browsing / storage-disabled / corrupted JSON
// never throws and breaks the app — worst case, progress just isn't persisted.
function safeStorage() {
  try {
    if (typeof window === "undefined") throw new Error("no window");
    const testKey = "__aila_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return createJSONStorage(() => window.localStorage);
  } catch {
    const memory = new Map<string, string>();
    return createJSONStorage(() => ({
      getItem: (name: string) => memory.get(name) ?? null,
      setItem: (name: string, value: string) => {
        memory.set(name, value);
      },
      removeItem: (name: string) => {
        memory.delete(name);
      },
    }));
  }
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: generateSessionId(),
      hasStartedJourney: false,
      lastVisitedMissionSlug: null,
      startJourney: () => set({ hasStartedJourney: true }),
      setLastVisitedMission: (slug: string) => set({ lastVisitedMissionSlug: slug }),
    }),
    {
      name: "aila-session",
      storage: safeStorage(),
      // If a corrupted/old-shape record is in storage, don't crash on rehydrate —
      // just fall back to the freshly generated in-memory default state.
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.warn("Session storage was corrupted, starting a fresh session.", error);
        }
      },
    }
  )
);
