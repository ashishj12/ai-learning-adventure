import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { BadgeRepo } from "@/lib/repo";

const patchSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(300).optional(),
  icon: z.string().min(1).max(50).optional(),
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
        { error: "Invalid badge data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const updated = BadgeRepo.update(id, parsed.data);
    if (!updated)
      return NextResponse.json({ error: "Badge not found." }, { status: 404 });
    return NextResponse.json({ badge: updated });
  } catch (err) {
    console.error("[/api/admin/badges/[id]] PATCH failed:", err);
    return NextResponse.json(
      { error: "Failed to update badge." },
      { status: 500 },
    );
  }
}
