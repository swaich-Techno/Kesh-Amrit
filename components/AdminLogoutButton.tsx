"use client";

import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button className="button-secondary" onClick={logout} type="button">
      <LogOut aria-hidden="true" className="size-5" />
      Logout
    </button>
  );
}
