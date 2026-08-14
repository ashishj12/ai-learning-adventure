import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ProgressRepo, BadgeEarnedRepo, BadgeRepo, MissionRepo } from "@/lib/repo";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required." }, { status: 400 });
    }
    const progress = ProgressRepo.listBySession(sessionId);
    const earned = BadgeEarnedRepo.listBySession(sessionId);
    const badgesEarned = earned
      .map((e) => BadgeRepo.getById(e.badgeId))
      .filter((b): b is NonNullable<typeof b> => !!b);

    return NextResponse.json({ progress, badgesEarned });
  } catch (err) {
    console.error("[/api/progress] GET failed:", err);
    return NextResponse.json({ error: "Failed to load progress." }, { status: 500 });
  }
}

const postSchema = z.object({
  sessionId: z.string().min(1),
  missionId: z.string().min(1),
  status: z.enum(["in_progress", "completed"]),
  quizScore: z.number().int().nonnegative().nullable().optional(),
  quizTotal: z.number().int().nonnegative().nullable().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = postSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request.", details: parsed.error.flatten() }, { status: 400 });
    }
    const { sessionId, missionId, status, quizScore, quizTotal } = parsed.data;

    const mission = MissionRepo.getById(missionId);
    if (!mission || !mission.isPublished || !mission.isEnabled) {
      return NextResponse.json({ error: "Mission not found." }, { status: 404 });
    }

    const progress = ProgressRepo.upsert({ sessionId, missionId, status, quizScore, quizTotal });

    let badgeAwarded = false;
    let badge = null;
    if (status === "completed") {
      badge = BadgeRepo.getByMission(missionId);
      if (badge) {
        const result = BadgeEarnedRepo.award(sessionId, badge.id);
        badgeAwarded = result.awarded; // idempotent — re-completing a mission won't double-award
      }
    }

    return NextResponse.json({ progress, badgeAwarded, badge });
  } catch (err) {
    console.error("[/api/progress] POST failed:", err);
    return NextResponse.json({ error: "Failed to save progress." }, { status: 500 });
  }
}
