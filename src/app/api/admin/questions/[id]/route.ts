import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { QuestionRepo } from "@/lib/repo";

const patchSchema = z.object({
  missionId: z.string().min(1).optional(),
  type: z.enum(["mcq", "true_false", "scenario"]).optional(),
  question: z.string().min(1).max(1000).optional(),
  options: z.array(z.string().min(1)).min(2).max(6).optional(),
  correctAnswer: z.string().min(1).optional(),
  explanation: z.string().min(1).max(1000).optional(),
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
        { error: "Invalid question data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const existing = QuestionRepo.getById(id);
    if (!existing)
      return NextResponse.json(
        { error: "Question not found." },
        { status: 404 },
      );

    const nextOptions = parsed.data.options ?? existing.options;
    const nextCorrect = parsed.data.correctAnswer ?? existing.correctAnswer;
    if (!nextOptions.includes(nextCorrect)) {
      return NextResponse.json(
        { error: "correctAnswer must be one of the options." },
        { status: 400 },
      );
    }

    const updated = QuestionRepo.update(id, parsed.data);
    return NextResponse.json({ question: updated });
  } catch (err) {
    console.error("[/api/admin/questions/[id]] PATCH failed:", err);
    return NextResponse.json(
      { error: "Failed to update question." },
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
    const ok = QuestionRepo.remove(id);
    if (!ok)
      return NextResponse.json(
        { error: "Question not found." },
        { status: 404 },
      );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/admin/questions/[id]] DELETE failed:", err);
    return NextResponse.json(
      { error: "Failed to delete question." },
      { status: 500 },
    );
  }
}
