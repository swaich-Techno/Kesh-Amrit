import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Leaf, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";

import { ProductBottle } from "@/components/ProductBottle";
import { SectionHeading } from "@/components/SectionHeading";
import { StepCard } from "@/components/StepCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { brand, howToUse, product } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Keshamrit Herbal Hair Oil | Product and WhatsApp Order",
  description:
    "View Keshamrit Herbal Hair Oil benefits, usage steps, COD information, and WhatsApp ordering."
};

export default function ProductPage() {
  return (
    <>
      <section className="section-shell grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-16">
        <div className="safe-card grid min-h-[560px] place-items-center overflow-hidden bg-leaf-50 p-6">
          <ProductBottle />
        </div>
        <div className="grid content-center gap-6">
          <p className="eyebrow">
            <Leaf aria-hidden="true" className="size-4" />
            {product.badge}
          </p>
          <div>
            <h1 className="font-display text-4xl font-black leading-tight text-leaf-900 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-8 text-ink/70">
              A premium herbal oiling routine focused on nourishment,
              consistency, and clear ordering support.
            </p>
          </div>
          <div className="safe-card grid gap-5 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black text-ink/54">{product.size}</p>
                <p className="mt-1 font-display text-4xl font-black text-leaf-900">
                  {formatPrice(product.price)}
                </p>
              </div>
              <span className="rounded-full bg-gold-50 px-3 py-1 text-sm font-black text-gold-600">
                COD
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link className="button-primary" href="/order">
                <MessageCircle aria-hidden="true" className="size-5" />
                WhatsApp ordering
              </Link>
              <WhatsAppCTA variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/62 py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            body="Benefits are written as supportive cosmetic-care language, not cure or fixed-outcome claims."
            eyebrow="Benefits"
            title="Simple, safe product promises."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {product.benefits.map((benefit) => (
              <article className="safe-card flex gap-3 p-5" key={benefit}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-leaf-700"
                />
                <p className="font-extrabold leading-7 text-leaf-900">{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <SectionHeading
          body="A focused product page needs enough ingredient context to build trust without becoming noisy."
          eyebrow="Herbal-inspired story"
          title="Clean ingredient cues"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.ingredients.map((ingredient) => (
            <article className="safe-card p-5" key={ingredient.name}>
              <span className="grid size-11 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <Leaf aria-hidden="true" className="size-5" />
              </span>
              <h2 className="mt-5 font-display text-xl font-black text-leaf-900">
                {ingredient.name}
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-ink/64">
                {ingredient.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-leaf-900 py-16 text-white">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto mb-4 bg-white/10 text-gold-100">
              Usage routine
            </p>
            <h2 className="font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Four simple steps for regular oiling.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 text-ink md:grid-cols-2 lg:grid-cols-4">
            {howToUse.map((step) => (
              <StepCard
                body={step.body}
                key={step.step}
                step={step.step}
                title={step.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-6 py-16 lg:grid-cols-[1fr_0.85fr]">
        <article className="safe-card p-6">
          <p className="eyebrow mb-4">
            <PackageCheck aria-hidden="true" className="size-4" />
            COD ordering
          </p>
          <h2 className="font-display text-3xl font-black text-leaf-900">
            Submit details, then continue the order on WhatsApp.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-ink/68">
            The order form saves the inquiry to Supabase when configured and
            opens a pre-filled WhatsApp message for final confirmation.
          </p>
          <div className="mt-6">
            <Link className="button-primary" href="/order">
              Open ordering page
              <MessageCircle aria-hidden="true" className="size-5" />
            </Link>
          </div>
        </article>
        <article className="safe-card p-6">
          <p className="eyebrow mb-4">
            <ShieldCheck aria-hidden="true" className="size-4" />
            Disclaimer
          </p>
          <p className="text-xl font-black leading-8 text-leaf-900">
            {brand.safeDisclaimer}
          </p>
          <p className="mt-4 text-sm font-semibold leading-7 text-ink/62">
            Consistency and proper usage are important. This page avoids strong
            medical claims such as fixed outcomes or cure language.
          </p>
        </article>
      </section>
    </>
  );
}
