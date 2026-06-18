"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { brand, navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { WhatsAppCTA } from "./WhatsAppCTA";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-leaf-700/10 bg-white/88 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="section-shell flex min-h-[72px] items-center justify-between gap-4"
      >
        <Link
          aria-label="Keshamrit home"
          className="group flex items-center gap-3"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-11 place-items-center rounded-lg bg-leaf-700 text-white shadow-soft">
            <span className="font-display text-lg font-black">K</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-black text-leaf-900">
              {brand.name}
            </span>
            <span className="block text-xs font-bold text-clay-700">
              Herbal Hair Care
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={cn(
                  "min-h-11 rounded-full px-3 py-3 text-sm font-extrabold text-leaf-900/78 transition-colors hover:bg-leaf-50 hover:text-leaf-900",
                  isActive && "bg-leaf-50 text-leaf-900"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppCTA className="px-4" label="Order now" />
        </div>

        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-lg border border-leaf-700/15 bg-white text-leaf-900 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-leaf-700/10 bg-white lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                className="min-h-12 rounded-lg px-3 py-3 font-extrabold text-leaf-900 hover:bg-leaf-50"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <WhatsAppCTA label="Order now" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
