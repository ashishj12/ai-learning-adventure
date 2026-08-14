import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { MissionRepo } from "@/lib/repo";

const missionSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens only.",
    ),
  title: z.string().min(1).max(200),
  level: z.enum([
    "Beginner",
    "Basic Understanding",
    "Applied Practice",
    "Responsible Use",
    "Builder Mindset",
  ]),
  objective: z.string().min(1).max(500),
  lessonContent: z.string().min(1),
  scenario: z.string().min(1),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
  isEnabled: z.boolean(),
});

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const missions = MissionRepo.listAll(false);
    return NextResponse.json({ missions });
  } catch (err) {
    console.error("[/api/admin/missions] GET failed:", err);
    return NextResponse.json(
      { error: "Failed to load missions." },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const json = await req.json().catch(() => null);
    const parsed = missionSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid mission data.", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    if (MissionRepo.getBySlug(parsed.data.slug, false)) {
      return NextResponse.json(
        { error: "A mission with this slug already exists." },
        { status: 409 },
      );
    }
    const mission = MissionRepo.create(parsed.data);
    return NextResponse.json({ mission }, { status: 201 });
  } catch (err) {
    console.error("[/api/admin/missions] POST failed:", err);
    return NextResponse.json(
      { error: "Failed to create mission." },
      { status: 500 },
    );
  }
}
