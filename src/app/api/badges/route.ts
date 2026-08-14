import { NextResponse } from "next/server";
import { BadgeRepo } from "@/lib/repo";

export async function GET() {
  try {
    const badges = BadgeRepo.listAll();
    return NextResponse.json({ badges });
  } catch (err) {
    console.error("[/api/badges] GET failed:", err);
    return NextResponse.json({ error: "Failed to load badges." }, { status: 500 });
  }
}
