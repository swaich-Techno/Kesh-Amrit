import { cn } from "@/lib/utils";

export function ProductBottle({
  className,
  compact = false,
  spinning = false
}: {
  className?: string;
  compact?: boolean;
  spinning?: boolean;
}) {
  return (
    <div
      aria-label="Keshamrit herbal hair oil bottle mockup"
      className={cn(
        "product-bottle",
        compact && "scale-[0.82]",
        spinning ? "animate-slowSpin" : "animate-floatBottle",
        className
      )}
      role="img"
    >
      <div className="product-bottle-body">
        <div className="product-bottle-label">
          <span className="font-display text-2xl font-black">Keshamrit</span>
          <span className="mt-1 text-xs font-black uppercase text-gold-600">
            Herbal Hair Oil
          </span>
          <span className="mt-5 text-sm font-extrabold text-leaf-900">
            Nourish. Massage. Repeat.
          </span>
        </div>
      </div>
    </div>
  );
}
