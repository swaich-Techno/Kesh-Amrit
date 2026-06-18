"use client";

import { Loader2, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { product } from "@/data/site";
import { orderMessageFromForm, whatsappLink } from "@/lib/whatsapp";

const initialState = {
  name: "",
  phone: "",
  city: "",
  quantity: "1",
  address: ""
};

type SubmitState = "idle" | "saving" | "success" | "error";

export function OrderForm({
  compact = false,
  source = "website"
}: {
  compact?: boolean;
  source?: string;
}) {
  const [form, setForm] = useState(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [status, setStatus] = useState("");

  const total = useMemo(() => {
    const quantity = Number(form.quantity) || 1;
    return quantity * product.price;
  }, [form.quantity]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("saving");
    setStatus("Saving inquiry and preparing WhatsApp message...");

    const quantity = Math.max(1, Number(form.quantity) || 1);
    const message = orderMessageFromForm({ ...form, quantity: String(quantity) });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          quantity,
          productName: product.name,
          unitPrice: product.price,
          source,
          whatsappMessage: message
        })
      });

      const result = (await response.json()) as {
        ok?: boolean;
        demoMode?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Order could not be saved.");
      }

      setSubmitState("success");
      setStatus(
        result.demoMode
          ? "Demo mode: WhatsApp message is ready. Add Supabase env vars to store live orders."
          : "Saved to Supabase. Opening WhatsApp order chat."
      );
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    } catch (error) {
      setSubmitState("error");
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try WhatsApp directly."
      );
    }
  }

  return (
    <form className="safe-card grid gap-4 p-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-xs font-black uppercase text-gold-600">
          WhatsApp ordering
        </p>
        <h2 className="mt-2 font-display text-2xl font-black text-leaf-900">
          Confirm your COD inquiry
        </h2>
        {!compact ? (
          <p className="mt-2 text-sm font-semibold leading-6 text-ink/62">
            Your details are prepared for WhatsApp and saved to Supabase when
            backend keys are configured.
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-black text-ink" htmlFor="name">
          Name
        </label>
        <input
          autoComplete="name"
          className="mt-2 min-h-12 w-full rounded-lg border border-leaf-700/16 bg-white px-3 font-bold outline-none transition-colors focus:border-gold-600"
          id="name"
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your name"
          required
          value={form.name}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-black text-ink" htmlFor="phone">
            Phone
          </label>
          <input
            autoComplete="tel"
            className="mt-2 min-h-12 w-full rounded-lg border border-leaf-700/16 bg-white px-3 font-bold outline-none transition-colors focus:border-gold-600"
            id="phone"
            inputMode="tel"
            onChange={(event) => updateField("phone", event.target.value)}
            pattern="[0-9+\\-\\s]{8,18}"
            placeholder="+91"
            required
            value={form.phone}
          />
        </div>
        <div>
          <label className="text-sm font-black text-ink" htmlFor="city">
            City
          </label>
          <input
            autoComplete="address-level2"
            className="mt-2 min-h-12 w-full rounded-lg border border-leaf-700/16 bg-white px-3 font-bold outline-none transition-colors focus:border-gold-600"
            id="city"
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="City"
            required
            value={form.city}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[0.65fr_1fr]">
        <div>
          <label className="text-sm font-black text-ink" htmlFor="order-quantity">
            Quantity
          </label>
          <input
            className="mt-2 min-h-12 w-full rounded-lg border border-leaf-700/16 bg-white px-3 font-bold outline-none transition-colors focus:border-gold-600"
            id="order-quantity"
            inputMode="numeric"
            min={1}
            onChange={(event) => updateField("quantity", event.target.value)}
            required
            type="number"
            value={form.quantity}
          />
        </div>
        <div className="rounded-lg border border-leaf-700/12 bg-leaf-50 px-4 py-3">
          <p className="text-xs font-black uppercase text-ink/52">
            Estimated order value
          </p>
          <p className="mt-1 font-display text-2xl font-black text-leaf-900">
            Rs. {total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div>
        <label className="text-sm font-black text-ink" htmlFor="address">
          Address
        </label>
        <textarea
          autoComplete="street-address"
          className="mt-2 min-h-28 w-full rounded-lg border border-leaf-700/16 bg-white px-3 py-3 font-bold outline-none transition-colors focus:border-gold-600"
          id="address"
          onChange={(event) => updateField("address", event.target.value)}
          placeholder="Delivery address"
          required
          value={form.address}
        />
      </div>

      <button
        className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitState === "saving"}
        type="submit"
      >
        {submitState === "saving" ? (
          <Loader2 aria-hidden="true" className="size-5 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="size-5" />
        )}
        Save and open WhatsApp
      </button>

      <p
        aria-live="polite"
        className={
          submitState === "error"
            ? "min-h-5 text-sm font-bold text-red-700"
            : "min-h-5 text-sm font-bold text-leaf-700"
        }
      >
        {status}
      </p>
    </form>
  );
}
