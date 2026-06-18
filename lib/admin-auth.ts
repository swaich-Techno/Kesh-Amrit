import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const cookieName = "kesh_erp_admin";
const sessionSubject = "keshamrit-super-admin";

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPER_ADMIN_PASSWORD || "";
}

export function isAdminConfigured() {
  return Boolean(process.env.SUPER_ADMIN_PASSWORD && getAdminSecret());
}

export function createAdminSessionToken() {
  const secret = getAdminSecret();

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update(sessionSubject).digest("hex");
}

export async function isSuperAdminAuthenticated() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookieName)?.value || "";
  const expected = createAdminSessionToken();

  if (!cookieValue || !expected || cookieValue.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
}

export async function setSuperAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSuperAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = process.env.SUPER_ADMIN_PASSWORD || "";
  return Boolean(configuredPassword && password === configuredPassword);
}
