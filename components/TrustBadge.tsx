import type { LucideIcon } from "lucide-react";

export function TrustBadge({
  label,
  icon: Icon
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-leaf-700/12 bg-white/82 px-3 py-2 text-sm font-extrabold text-leaf-900 shadow-sm">
      <Icon aria-hidden="true" className="size-4 text-gold-600" />
      <span>{label}</span>
    </div>
  );
}
