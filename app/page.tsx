import Link from "next/link";
import { ArrowRight, BadgeCheck, BarChart3, Leaf, MessageCircle } from "lucide-react";

import { ProductBottle } from "@/components/ProductBottle";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustBadge } from "@/components/TrustBadge";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { brand, homeHighlights, reviews, trustBadges } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <section className="section-shell grid min-h-[calc(100dvh-72px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
        <div className="animate-reveal">
          <p className="eyebrow mb-5">
            <Leaf aria-hidden="true" className="size-4" />
            Minimal herbal commerce
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-black leading-[1.04] text-leaf-900 sm:text-6xl lg:text-7xl">
            {brand.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-ink/70 sm:text-xl">
            {brand.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppCTA />
            <Link className="button-secondary" href="/product">
              View product
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {trustBadges.map((badge) => (
              <TrustBadge icon={badge.icon} key={badge.label} label={badge.label} />
            ))}
          </div>
        </div>

        <div className="hero-media-stage animate-reveal">
          <div className="absolute inset-x-0 bottom-4 h-24 rounded-[50%] bg-leaf-900/10 blur-xl" />
          <ProductBottle />
          <div className="safe-card absolute left-0 top-8 max-w-[220px] p-4">
            <p className="text-xs font-black uppercase text-gold-600">
              WhatsApp-first
            </p>
            <p className="mt-1 text-sm font-extrabold leading-6 text-leaf-900">
              Clear product, COD inquiry, direct customer support.
            </p>
          </div>
          <div className="safe-card absolute bottom-10 right-0 max-w-[230px] p-4">
            <p className="text-xs font-black uppercase text-gold-600">
              ERP ready
            </p>
            <p className="mt-1 text-sm font-extrabold leading-6 text-leaf-900">
              Supabase orders power sales and monthly revenue views.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white/62 py-16">
        <div className="section-shell">
          <SectionHeading
            align="center"
            body="Product trust, WhatsApp ordering, and a backend sales record without extra campaign clutter."
            eyebrow="Reduced to what sells"
            title="One product. One order path. One clean backend."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {homeHighlights.map((item) => (
              <article className="safe-card p-5" key={item.title}>
                <span className="grid size-11 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                  <item.icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-5 font-display text-xl font-black text-leaf-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-ink/64">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow mb-4">
            <BadgeCheck aria-hidden="true" className="size-4" />
            Safe product language
          </p>
          <h2 className="font-display text-4xl font-black leading-tight text-leaf-900">
            Honest herbal care without exaggerated medical promises.
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-ink/68">
            The copy stays focused on nourishment, routine, consistency, and
            support. Individual results may vary.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              city={review.city}
              key={review.name}
              name={review.name}
              quote={review.quote}
              tag={review.tag}
            />
          ))}
        </div>
      </section>

      <section className="bg-leaf-900 py-16 text-white">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-gold-100">
              Order flow
            </p>
            <h2 className="mt-2 font-display text-3xl font-black leading-tight sm:text-4xl">
              Customer submits once. Supabase records it. WhatsApp closes it.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="button-primary on-light" href="/order">
              <MessageCircle aria-hidden="true" className="size-5" />
              Start ordering
            </Link>
            <Link className="button-secondary on-dark" href="/contact">
              Contact brand
              <BarChart3 aria-hidden="true" className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
