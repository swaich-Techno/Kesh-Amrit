import type { Metadata } from "next";
import { Instagram, MessageCircle, Phone, Truck } from "lucide-react";

import { OrderForm } from "@/components/OrderForm";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { brand } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Keshamrit | WhatsApp Herbal Hair Oil Ordering",
  description:
    "Contact Keshamrit for herbal hair oil ordering, COD details, Instagram, and WhatsApp support."
};

export default function ContactPage() {
  return (
    <>
      <section className="section-shell grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div>
          <p className="eyebrow mb-4">
            <MessageCircle aria-hidden="true" className="size-4" />
            Contact
          </p>
          <h1 className="font-display text-4xl font-black leading-tight text-leaf-900 sm:text-5xl lg:text-6xl">
            Talk to Keshamrit on WhatsApp.
          </h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-ink/68">
            For ordering, COD confirmation, usage questions, and delivery support,
            WhatsApp is the fastest path.
          </p>

          <div className="mt-8 grid gap-3">
            <a
              className="safe-card flex min-h-16 items-center gap-4 p-4"
              href={whatsappLink()}
              rel="noreferrer"
              target="_blank"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-ink/52">
                  WhatsApp / Phone
                </span>
                <span className="block font-display text-xl font-black text-leaf-900">
                  {brand.whatsappDisplay}
                </span>
              </span>
            </a>
            <a
              className="safe-card flex min-h-16 items-center gap-4 p-4"
              href={`https://www.instagram.com/${brand.instagram}/`}
              rel="noreferrer"
              target="_blank"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-gold-50 text-gold-600">
                <Instagram aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-ink/52">
                  Instagram
                </span>
                <span className="block font-display text-xl font-black text-leaf-900">
                  @{brand.instagram}
                </span>
              </span>
            </a>
          </div>
        </div>

        <OrderForm source="contact" />
      </section>

      <section className="bg-leaf-50 py-16">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-gold-600">
              COD support
            </p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight text-leaf-900">
              Keep ordering personal, fast, and familiar.
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-ink/64">
              Order inquiries are prepared for WhatsApp and can be stored in
              Supabase for super-admin sales tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppCTA />
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-leaf-700/12 bg-white px-3 py-2 text-sm font-extrabold text-leaf-900">
              <Truck aria-hidden="true" className="size-4 text-gold-600" />
              COD available
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
