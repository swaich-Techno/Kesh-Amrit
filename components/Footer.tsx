import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

import { brand, footerLinks } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-leaf-700/10 bg-leaf-900 text-white">
      <div className="section-shell grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-white text-leaf-900">
              <span className="font-display text-lg font-black">K</span>
            </span>
            <div>
              <p className="font-display text-xl font-black">{brand.name}</p>
              <p className="text-sm font-semibold text-white/70">
                Herbal hair oil routine demo
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/74">
            Minimal commerce website experience created for Keshamrit by B Socio.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/58">
            Product language is intentionally claim-safe and routine-led for a
            premium herbal care pitch.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase text-gold-100">
            Pages
          </p>
          <div className="grid gap-2">
            {footerLinks.map((link) => (
              <Link
                className="min-h-9 w-fit text-sm font-bold text-white/76 transition-colors hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase text-gold-100">
            Contact
          </p>
          <div className="grid gap-3 text-sm font-bold text-white/76">
            <a
              className="inline-flex min-h-10 items-center gap-2 hover:text-white"
              href={whatsappLink()}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {brand.whatsappDisplay}
            </a>
            <a
              className="inline-flex min-h-10 items-center gap-2 hover:text-white"
              href={`https://www.instagram.com/${brand.instagram}/`}
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden="true" className="size-4" />
              @{brand.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
