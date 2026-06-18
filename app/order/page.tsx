import type { Metadata } from "next";
import { Leaf, MessageCircle, ShieldCheck } from "lucide-react";

import { OrderForm } from "@/components/OrderForm";
import { SectionHeading } from "@/components/SectionHeading";
import { product } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "WhatsApp Ordering | Keshamrit Herbal Hair Oil",
  description:
    "Place a Keshamrit Herbal Hair Oil COD inquiry through a Supabase-backed WhatsApp order form."
};

export default function OrderPage() {
  return (
    <>
      <section className="section-shell grid gap-8 py-12 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
        <div className="grid gap-5">
          <p className="eyebrow">
            <MessageCircle aria-hidden="true" className="size-4" />
            WhatsApp ordering
          </p>
          <h1 className="font-display text-4xl font-black leading-tight text-leaf-900 sm:text-5xl lg:text-6xl">
            Save the inquiry. Continue on WhatsApp.
          </h1>
          <p className="text-lg font-semibold leading-8 text-ink/68">
            The customer enters order details once. The backend can save it to
            Supabase, then WhatsApp carries the human confirmation.
          </p>
          <div className="safe-card grid gap-4 p-5">
            <div className="flex items-center gap-4">
              <div className="grid size-20 shrink-0 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <Leaf aria-hidden="true" className="size-9" />
              </div>
              <div>
                <p className="font-display text-xl font-black text-leaf-900">
                  {product.name}
                </p>
                <p className="text-sm font-black text-gold-600">
                  {formatPrice(product.price)} / {product.size}
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg bg-leaf-50 p-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-leaf-700"
              />
              <p className="text-sm font-bold leading-6 text-ink/64">
                Individual results may vary. Final COD, availability, and
                delivery details are confirmed on WhatsApp.
              </p>
            </div>
          </div>
        </div>
        <OrderForm source="whatsapp" />
      </section>

      <section className="bg-white/62 py-16">
        <div className="section-shell">
          <SectionHeading
            align="center"
            body="This route is the main conversion page. It supports SEO, order tracking, and a familiar customer handoff."
            eyebrow="Conversion flow"
            title="Built for mobile ordering, not browsing noise."
          />
        </div>
      </section>
    </>
  );
}
