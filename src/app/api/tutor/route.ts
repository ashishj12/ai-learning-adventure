import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTutorResponse } from "@/lib/ai/provider";

const bodySchema = z.object({
  mode: z.enum(["mission_help", "ai_only", "quiz_explanation", "next_mission"]),
  question: z.string().max(2000).optional(),
  missionSlug: z.string().optional(),
  missionTitle: z.string().optional(),
  missionContent: z.string().optional(),
  quizQuestion: z.string().optional(),
  selectedAnswer: z.string().optional(),
  correctAnswer: z.string().optional(),
  isCorrect: z.boolean().optional(),
  userLevel: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // getTutorResponse never throws — it internally falls back to a mock
    // response on missing key, timeout, rate limit, or provider error, so
    // this route always returns 200 with a usable answer.
    const response = await getTutorResponse(parsed.data);
    return NextResponse.json(response);
  } catch (err) {
    console.error("[/api/tutor] POST failed unexpectedly:", err);
    return NextResponse.json(
      {
        answer:
          "(Sample response — the tutor is temporarily unavailable) I can still help once you retry — try asking again in a moment.",
        isMock: true,
      },
      { status: 200 },
    );
  }
}
