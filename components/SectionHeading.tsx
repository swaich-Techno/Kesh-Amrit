export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={align === "center" ? "eyebrow mx-auto mb-4" : "eyebrow mb-4"}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-black leading-tight text-leaf-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-base font-semibold leading-8 text-ink/68 sm:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
