import { NextRequest, NextResponse } from "next/server";
import { listMissionsWithMeta } from "@/lib/repo";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    const missions = listMissionsWithMeta(sessionId, true);
    return NextResponse.json({ missions });
  } catch (err) {
    console.error("[/api/missions] GET failed:", err);
    return NextResponse.json({ error: "Failed to load missions." }, { status: 500 });
  }
}
