"use client";

import { Loader2, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";

export function AdminLoginForm({ isConfigured }: { isConfigured: boolean }) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("Checking super admin access...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Login failed.");
      }

      window.location.reload();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Login failed.");
      setIsLoading(false);
    }
  }

  return (
    <form className="safe-card mx-auto grid max-w-md gap-4 p-5" onSubmit={handleSubmit}>
      <div>
        <span className="grid size-11 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
          <LockKeyhole aria-hidden="true" className="size-5" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-black text-leaf-900">
          Super admin login
        </h1>
        <p className="mt-2 text-sm font-semibold leading-7 text-ink/64">
          ERP access is for Keshamrit sales and monthly revenue review.
        </p>
      </div>
      {!isConfigured ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold leading-6 text-red-800">
          Add <code>SUPER_ADMIN_PASSWORD</code> and{" "}
          <code>ADMIN_SESSION_SECRET</code> in Vercel before using ERP login.
        </div>
      ) : null}
      <div>
        <label className="text-sm font-black text-ink" htmlFor="admin-password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className="mt-2 min-h-12 w-full rounded-lg border border-leaf-700/16 bg-white px-3 font-bold outline-none transition-colors focus:border-gold-600"
          disabled={!isConfigured}
          id="admin-password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter super admin password"
          required
          type="password"
          value={password}
        />
      </div>
      <button
        className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!isConfigured || isLoading}
        type="submit"
      >
        {isLoading ? (
          <Loader2 aria-hidden="true" className="size-5 animate-spin" />
        ) : (
          <LockKeyhole aria-hidden="true" className="size-5" />
        )}
        Open ERP
      </button>
      <p aria-live="polite" className="min-h-5 text-sm font-bold text-leaf-700">
        {status}
      </p>
    </form>
  );
}
