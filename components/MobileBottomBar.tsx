"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";

import { WhatsAppCTA } from "./WhatsAppCTA";

export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-leaf-700/10 bg-white/94 px-3 py-2 shadow-[0_-14px_30px_rgba(16,41,29,0.12)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-[1fr_auto] gap-2">
        <WhatsAppCTA className="min-h-12 px-3 text-sm" />
        <Link
          aria-label="Open WhatsApp ordering page"
          className="grid min-h-12 min-w-12 place-items-center rounded-lg border border-leaf-700/15 bg-leaf-50 text-leaf-900"
          href="/order"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </Link>
      </div>
      <Link
        className="mx-auto mt-1 flex min-h-8 max-w-md items-center justify-center gap-2 text-xs font-extrabold text-leaf-900/70"
        href="/product"
      >
        <ShoppingBag aria-hidden="true" className="size-3.5" />
        <span>View product details</span>
      </Link>
    </div>
  );
}
