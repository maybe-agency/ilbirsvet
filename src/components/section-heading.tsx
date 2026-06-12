export function SectionHeading({
  title,
  subtitle,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <header className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`mb-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-[#0aa6ce]" />
        <span className="text-[11px] font-extrabold uppercase text-[#08789f]">
          Ветеринарная клиника Илбирс
        </span>
      </div>
      <h2 className="text-3xl font-extrabold leading-tight text-balance text-[#062c3c] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-base leading-7 text-[#517180] sm:text-lg">{subtitle}</p>}
    </header>
  );
}
