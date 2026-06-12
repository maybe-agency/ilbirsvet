import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { DataIcon, Instagram, MessageCircle } from "@/components/icons";
import { clinic, type SiteDictionary } from "@/data/site";

export function Hero({ dictionary }: { dictionary: SiteDictionary }) {
  const { hero, actions } = dictionary;

  return (
    <section id="top" className="bg-[#edf8fb] pb-5">
      <div className="hero-scene container-shell relative min-h-[860px] overflow-hidden rounded-lg lg:min-h-[720px]">
        <Image
          src="/images/ilbirs-hero-editorial-v2.jpg"
          alt="Собака и кошка в современной ветеринарной клинике Илбирс в Бишкеке"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-center"
        />
        <div className="hero-wash absolute inset-0" />
        <div className="absolute inset-x-0 top-0 hidden h-px bg-white/70 lg:block" />

        <div className="relative z-10 flex min-h-[860px] flex-col px-5 py-8 sm:px-9 lg:min-h-[720px] lg:px-12 lg:py-10">
          <div className="flex items-start justify-between gap-5">
            <p className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-white/65 px-3 py-2 text-xs font-extrabold text-[#073b50] shadow-sm backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#0dbb8a] shadow-[0_0_0_5px_rgba(13,187,138,0.13)]" />
              {hero.eyebrow}
            </p>
            <div className="hidden text-right text-xs font-bold uppercase text-[#0b526c]/60 lg:block">
              <p>Бишкек</p>
              <p className="mt-1 text-[#073b50]">{hero.address}</p>
            </div>
          </div>

          <div className="mt-12 max-w-[39rem] lg:mt-14">
            <p className="mb-4 text-xs font-extrabold uppercase text-[#08789f]">
              Здоровье питомца начинается здесь
            </p>
            <h1 className="text-[2.75rem] font-extrabold leading-[1.02] text-balance text-[#062c3c] sm:text-6xl lg:text-[4.65rem]">
              Ветеринарная клиника{" "}
              <span className="text-[#0788b5]">Илбирс</span>
            </h1>
            <p className="mt-5 max-w-lg text-xl font-semibold leading-8 text-[#174a5d] sm:text-2xl">
              {hero.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#285b6d] sm:text-[15px]">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={clinic.whatsapp} external>
                {actions.appointment}
              </ButtonLink>
              <ButtonLink
                href={clinic.whatsapp}
                external
                variant="glass"
                icon={<MessageCircle className="size-4" aria-hidden="true" />}
              >
                WhatsApp
              </ButtonLink>
              <ButtonLink
                href={clinic.instagram}
                external
                variant="ghost"
                icon={<Instagram className="size-4" aria-hidden="true" />}
              >
                Instagram
              </ButtonLink>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-8 lg:grid-cols-4 lg:gap-0">
            {hero.features.map((feature, index) => (
              <div
                key={feature.title}
                className="group min-h-28 border border-white/60 bg-white/58 p-4 shadow-[0_14px_35px_rgba(3,67,91,0.08)] backdrop-blur-lg first:rounded-l-lg last:rounded-r-lg lg:border-r-0 lg:last:border-r"
              >
                <div className="flex items-start justify-between gap-3">
                  <DataIcon
                    name={feature.icon}
                    className="size-5 text-[#0788b5]"
                  />
                  <span className="text-[10px] font-extrabold text-[#0b526c]/35">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm font-extrabold text-[#062c3c]">
                  {feature.title}
                </p>
                <p className="mt-1 max-w-36 text-xs leading-4 text-[#39687a]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute right-5 top-24 hidden text-[12rem] font-black leading-none text-white/15 lg:block">
          24
        </div>
      </div>
    </section>
  );
}
