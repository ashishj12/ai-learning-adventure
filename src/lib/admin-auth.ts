import crypto from "node:crypto";
import { NextRequest } from "next/server";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "adventure-admin";
const SECRET = process.env.ADMIN_COOKIE_SECRET || "dev-only-secret-change-me";
export const ADMIN_COOKIE_NAME = "aila_admin";

function expectedToken() {
  return crypto.createHmac("sha256", SECRET).update(ADMIN_PASSCODE).digest("hex");
}

export function verifyPasscode(candidate: string): boolean {
  if (!candidate) return false;
  // Constant-time-ish comparison to avoid trivial timing leaks on a local admin passcode.
  const a = Buffer.from(candidate);
  const b = Buffer.from(ADMIN_PASSCODE);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getSessionToken(): string {
  return expectedToken();
}

export function isAdminRequest(req: NextRequest): boolean {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie) return false;
  try {
    const a = Buffer.from(cookie);
    const b = Buffer.from(expectedToken());
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
