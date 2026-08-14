import type { TutorRequest, TutorResponse } from "@/lib/types";
import { getMockTutorResponse } from "./mock-responses";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const REQUEST_TIMEOUT_MS = 8000;

function buildSystemPrompt(req: TutorRequest): string {
  const levelNote = req.userLevel ? ` The learner's current level is "${req.userLevel}" — tailor depth accordingly.` : "";
  const base =
    "You are a friendly, encouraging AI literacy tutor inside a gamified learning app called AI Learning Adventure. " +
    "You help beginners understand AI concepts (prompts, LLMs, hallucinations, tokens, bias, RAG, etc). " +
    "Keep answers concise (2-5 sentences unless asked for more), beginner-safe, accurate, and grounded in widely-accepted AI literacy concepts. " +
    "Never invent citations, statistics, or facts you're not confident about. " +
    "If a question is far outside AI/tech learning topics, gently redirect the learner back to the mission content." +
    levelNote;

  switch (req.mode) {
    case "mission_help":
      return `${base}\nThe learner is currently on the mission "${req.missionTitle}". Mission content:\n${req.missionContent ?? "(not provided)"}\nAnswer their question using this mission's content as primary context, with a simple example.`;
    case "ai_only":
      return `${base}\nThe learner is in "AI Only Mode" — a free-form Q&A space. Answer clearly and, where relevant, suggest which mission covers the topic in more depth.`;
    case "quiz_explanation":
      return `${base}\nThe learner just answered a quiz question. Question: "${req.quizQuestion}". Their answer: "${req.selectedAnswer}". Correct answer: "${req.correctAnswer}". Result: ${req.isCorrect ? "correct" : "incorrect"}.\nExplain clearly why the correct answer is right (and why theirs was wrong, if applicable), without being condescending. End with one encouraging next-step sentence.`;
    case "next_mission":
      return `${base}\nThe learner just completed a mission. Briefly congratulate them and suggest what kind of topic to explore next, in 1-2 sentences.`;
    default:
      return base;
  }
}

function buildUserMessage(req: TutorRequest): string {
  return req.question?.trim() || "Please help me understand this.";
}

async function callGroq(req: TutorRequest): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt(req) },
          { role: "user", content: buildUserMessage(req) },
        ],
        temperature: 0.4,
        max_tokens: 400,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("RATE_LIMITED");
      throw new Error(`GROQ_HTTP_${res.status}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text || typeof text !== "string") throw new Error("EMPTY_RESPONSE");
    return text.trim();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Single entry point used by every AI-touching API route.
 * Guarantees a response is always returned — falls back to a clearly-labeled
 * mock on missing key, timeout, rate limit, or any other failure.
 */
export async function getTutorResponse(req: TutorRequest): Promise<TutorResponse> {
  try {
    const answer = await callGroq(req);
    return { answer, isMock: false };
  } catch (err) {
    // Missing key, timeout, rate limit, network error, malformed response —
    // all funnel to the same safe fallback so the learner never sees a broken screen.
    return getMockTutorResponse(req);
  }
}
