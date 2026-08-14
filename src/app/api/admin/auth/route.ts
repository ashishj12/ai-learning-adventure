import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPasscode, getSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

const schema = z.object({ passcode: z.string().min(1) });

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Passcode is required." }, { status: 400 });
    }

    if (!verifyPasscode(parsed.data.passcode)) {
      return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, getSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("[/api/admin/auth] POST failed:", err);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
