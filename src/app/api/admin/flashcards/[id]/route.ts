import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { FlashcardRepo } from "@/lib/repo";

const patchSchema = z.object({
  missionId: z.string().min(1).optional(),
  concept: z.string().min(1).max(200).optional(),
  definition: z.string().min(1).max(500).optional(),
  example: z.string().min(1).max(500).optional(),
  tip: z.string().min(1).max(500).optional(),
  isEnabled: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    const json = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid flashcard data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const updated = FlashcardRepo.update(id, parsed.data);
    if (!updated)
      return NextResponse.json(
        { error: "Flashcard not found." },
        { status: 404 },
      );
    return NextResponse.json({ flashcard: updated });
  } catch (err) {
    console.error("[/api/admin/flashcards/[id]] PATCH failed:", err);
    return NextResponse.json(
      { error: "Failed to update flashcard." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    const ok = FlashcardRepo.remove(id);
    if (!ok)
      return NextResponse.json(
        { error: "Flashcard not found." },
        { status: 404 },
      );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/admin/flashcards/[id]] DELETE failed:", err);
    return NextResponse.json(
      { error: "Failed to delete flashcard." },
      { status: 500 },
    );
  }
}
