import { NextRequest, NextResponse } from "next/server";
import {
  MissionRepo,
  QuestionRepo,
  FlashcardRepo,
  BadgeRepo,
  ProgressRepo,
} from "@/lib/repo";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    // Admins previewing unpublished/disabled content bypass the learner visibility
    // check — but only with a verified admin session cookie, never via a client flag.
    const learnerVisible = !isAdminRequest(req);

    const mission = MissionRepo.getBySlug(slug, learnerVisible);
    if (!mission) {
      // Covers: unpublished, disabled, or nonexistent mission — same 404,
      // so learners can't distinguish "hidden" from "doesn't exist".
      return NextResponse.json(
        { error: "Mission not found." },
        { status: 404 },
      );
    }

    const questions = QuestionRepo.listByMission(mission.id, true);
    const flashcards = FlashcardRepo.listByMission(mission.id, true);
    const badge = BadgeRepo.getByMission(mission.id);
    const progress = sessionId ? ProgressRepo.get(sessionId, mission.id) : null;

    // Quiz answers are stripped for the learner-facing question list —
    // correctAnswer/explanation are only sent after an answer is submitted (see /api/quizzes).
    const safeQuestions = questions.map(
      ({ correctAnswer, explanation, ...rest }) => rest,
    );

    return NextResponse.json({
      mission,
      questions: safeQuestions,
      flashcards,
      badge,
      progress,
    });
  } catch (err) {
    console.error("[/api/missions/[slug]] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to load mission." },
      { status: 500 },
    );
  }
}
