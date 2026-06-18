import { NextResponse } from "next/server";

import {
  isAdminConfigured,
  setSuperAdminCookie,
  verifyAdminPassword
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const payload = (await request.json()) as { password?: string };

  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Super admin is not configured. Add SUPER_ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Vercel."
      },
      { status: 503 }
    );
  }

  if (!verifyAdminPassword(payload.password || "")) {
    return NextResponse.json(
      { ok: false, error: "Invalid super admin password." },
      { status: 401 }
    );
  }

  await setSuperAdminCookie();
  return NextResponse.json({ ok: true });
}
