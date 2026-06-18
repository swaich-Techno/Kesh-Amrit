import { NextResponse } from "next/server";

import { clearSuperAdminCookie } from "@/lib/admin-auth";

export async function POST() {
  await clearSuperAdminCookie();
  return NextResponse.json({ ok: true });
}
