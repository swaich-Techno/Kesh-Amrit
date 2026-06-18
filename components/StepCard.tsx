export function StepCard({
  step,
  title,
  body
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <article className="safe-card grid gap-4 p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-lg bg-leaf-700 font-display text-sm font-black text-white">
          {step}
        </span>
        <span className="h-px flex-1 bg-leaf-700/12" />
      </div>
      <h3 className="font-display text-xl font-black text-leaf-900">{title}</h3>
      <p className="text-sm font-semibold leading-7 text-ink/66">{body}</p>
    </article>
  );
}
