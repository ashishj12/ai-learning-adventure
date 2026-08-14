import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { FlashcardRepo, MissionRepo } from "@/lib/repo";

const flashcardSchema = z.object({
  missionId: z.string().min(1),
  concept: z.string().min(1).max(200),
  definition: z.string().min(1).max(500),
  example: z.string().min(1).max(500),
  tip: z.string().min(1).max(500),
  isEnabled: z.boolean(),
  sortOrder: z.number().int(),
});

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const missionId = req.nextUrl.searchParams.get("missionId");
    if (!missionId)
      return NextResponse.json(
        { error: "missionId is required." },
        { status: 400 },
      );
    const flashcards = FlashcardRepo.listByMission(missionId, false);
    return NextResponse.json({ flashcards });
  } catch (err) {
    console.error("[/api/admin/flashcards] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to load flashcards." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const json = await req.json().catch(() => null);
    const parsed = flashcardSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid flashcard data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    if (!MissionRepo.getById(parsed.data.missionId)) {
      return NextResponse.json(
        { error: "Mission not found." },
        { status: 404 },
      );
    }
    const flashcard = FlashcardRepo.create(parsed.data);
    return NextResponse.json({ flashcard }, { status: 201 });
  } catch (err) {
    console.error("[/api/admin/flashcards] POST failed:", err);
    return NextResponse.json(
      { error: "Failed to create flashcard." },
      { status: 500 },
    );
  }
}
