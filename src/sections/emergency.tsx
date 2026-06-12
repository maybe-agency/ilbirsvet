import { Clock3, PhoneCall } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { clinic, type SiteDictionary } from "@/data/site";

export function Emergency({ dictionary }: { dictionary: SiteDictionary }) {
  const { emergency, actions } = dictionary;

  return (
    <section className="bg-white py-3 sm:py-5">
      <div className="container-shell relative overflow-hidden rounded-lg bg-[#063b50] text-white">
        <div className="pointer-events-none absolute -right-8 -top-20 text-[18rem] font-black leading-none text-white/[0.035]">
          24/7
        </div>
        <div className="relative z-10 grid min-w-0 gap-14 px-5 py-16 sm:px-9 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-12 lg:py-20">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-xs font-extrabold uppercase text-[#65dcf4]">
              <Clock3 className="size-5" aria-hidden="true" />
              {emergency.eyebrow}
            </p>
            <h2 className="mt-6 max-w-3xl text-[1.75rem] font-extrabold leading-tight text-balance min-[360px]:text-4xl sm:text-6xl">
              {emergency.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#c6e4ec] sm:text-lg">
              {emergency.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={clinic.whatsapp}
                external
                variant="light"
              >
                {actions.appointment}
              </ButtonLink>
              <ButtonLink
                href={clinic.phoneHref}
                variant="glass"
                icon={<PhoneCall className="size-4" aria-hidden="true" />}
                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                {clinic.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 border-y border-white/15 min-[360px]:grid-cols-3 min-[360px]:py-8">
            {emergency.stats.map((stat) => (
              <div
                key={stat.value}
                className="flex min-w-0 items-center justify-between gap-4 border-b border-white/15 px-2 py-4 last:border-b-0 min-[360px]:block min-[360px]:border-r min-[360px]:border-b-0 min-[360px]:px-3 min-[360px]:py-0 min-[360px]:last:border-r-0 sm:px-6"
              >
                <p className="text-2xl font-black text-[#65dcf4] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="max-w-28 text-right text-xs leading-5 text-[#a9d2de] min-[360px]:mt-3 min-[360px]:text-left sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
