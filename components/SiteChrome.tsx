"use client";

import { usePathname } from "next/navigation";

import { Footer } from "./Footer";
import { MobileBottomBar } from "./MobileBottomBar";
import { Navbar } from "./Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/erp")) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <div className="pb-24 lg:pb-0">
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
