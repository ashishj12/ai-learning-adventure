import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { MissionRepo } from "@/lib/repo";

const patchSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().min(1).max(200).optional(),
  level: z.enum(["Beginner", "Basic Understanding", "Applied Practice", "Responsible Use", "Builder Mindset"]).optional(),
  objective: z.string().min(1).max(500).optional(),
  lessonContent: z.string().min(1).optional(),
  scenario: z.string().min(1).optional(),
  sortOrder: z.number().int().optional(),
  isPublished: z.boolean().optional(),
  isEnabled: z.boolean().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    const json = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid mission data.", details: parsed.error.flatten() }, { status: 400 });
    }
    const updated = MissionRepo.update(id, parsed.data);
    if (!updated) return NextResponse.json({ error: "Mission not found." }, { status: 404 });
    return NextResponse.json({ mission: updated });
  } catch (err) {
    console.error("[/api/admin/missions/[id]] PATCH failed:", err);
    return NextResponse.json({ error: "Failed to update mission." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    const ok = MissionRepo.remove(id);
    if (!ok) return NextResponse.json({ error: "Mission not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/admin/missions/[id]] DELETE failed:", err);
    return NextResponse.json({ error: "Failed to delete mission." }, { status: 500 });
  }
}
