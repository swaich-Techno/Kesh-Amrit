import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { defaultOrderMessage, whatsappLink } from "@/lib/whatsapp";

type WhatsAppCTAProps = {
  className?: string;
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "ghost";
};

export function WhatsAppCTA({
  className,
  label = "Order on WhatsApp",
  message = defaultOrderMessage,
  variant = "primary"
}: WhatsAppCTAProps) {
  const buttonClass =
    variant === "secondary"
      ? "button-secondary"
      : variant === "ghost"
        ? "button-ghost"
        : "button-primary";

  return (
    <a
      aria-label={label}
      className={cn(buttonClass, className)}
      href={whatsappLink(message)}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
      <span>{label}</span>
    </a>
  );
}
