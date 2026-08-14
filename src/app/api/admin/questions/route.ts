import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { QuestionRepo, MissionRepo } from "@/lib/repo";

const questionSchema = z.object({
  missionId: z.string().min(1),
  type: z.enum(["mcq", "true_false", "scenario"]),
  question: z.string().min(1).max(1000),
  options: z.array(z.string().min(1)).min(2).max(6),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1).max(1000),
  isEnabled: z.boolean(),
  sortOrder: z.number().int(),
});

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const missionId = req.nextUrl.searchParams.get("missionId");
    if (!missionId) return NextResponse.json({ error: "missionId is required." }, { status: 400 });
    const questions = QuestionRepo.listByMission(missionId, false);
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[/api/admin/questions] GET failed:", err);
    return NextResponse.json({ error: "Failed to load questions." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const json = await req.json().catch(() => null);
    const parsed = questionSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid question data.", details: parsed.error.flatten() }, { status: 400 });
    }
    if (!MissionRepo.getById(parsed.data.missionId)) {
      return NextResponse.json({ error: "Mission not found." }, { status: 404 });
    }
    if (!parsed.data.options.includes(parsed.data.correctAnswer)) {
      return NextResponse.json({ error: "correctAnswer must be one of the provided options." }, { status: 400 });
    }
    const question = QuestionRepo.create(parsed.data);
    return NextResponse.json({ question }, { status: 201 });
  } catch (err) {
    console.error("[/api/admin/questions] POST failed:", err);
    return NextResponse.json({ error: "Failed to create question." }, { status: 500 });
  }
}
