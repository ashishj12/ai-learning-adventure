import { NextRequest, NextResponse } from "next/server";
import { FlashcardRepo, MissionRepo } from "@/lib/repo";

export async function GET(req: NextRequest) {
  try {
    const missionId = req.nextUrl.searchParams.get("missionId");
    if (!missionId) {
      return NextResponse.json(
        { error: "missionId is required." },
        { status: 400 },
      );
    }
    const mission = MissionRepo.getById(missionId);
    if (!mission || !mission.isPublished || !mission.isEnabled) {
      return NextResponse.json(
        { error: "Mission not found." },
        { status: 404 },
      );
    }
    const flashcards = FlashcardRepo.listByMission(missionId, true);
    return NextResponse.json({ flashcards });
  } catch (err) {
    console.error("[/api/flashcards] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to load flashcards." },
      { status: 500 },
    );
  }
}
