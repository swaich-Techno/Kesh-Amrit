import { BadgeCheck, Quote } from "lucide-react";

export function ReviewCard({
  name,
  city,
  quote,
  tag
}: {
  name: string;
  city: string;
  quote: string;
  tag: string;
}) {
  return (
    <article className="safe-card grid gap-5 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-gold-50 text-gold-600">
          <Quote aria-hidden="true" className="size-5" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-black text-leaf-700">
          <BadgeCheck aria-hidden="true" className="size-3.5" />
          {tag}
        </span>
      </div>
      <p className="text-base font-extrabold leading-7 text-leaf-900">
        “{quote}”
      </p>
      <div>
        <p className="font-display font-black text-ink">{name}</p>
        <p className="text-sm font-bold text-ink/54">{city}</p>
      </div>
    </article>
  );
}
