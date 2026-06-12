import { DataIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { SiteDictionary } from "@/data/site";

const styles = [
  {
    card: "bg-[#dff5fb] text-[#062c3c] lg:col-span-7",
    icon: "bg-white/70 text-[#0788b5]",
    body: "text-[#315d6d]",
    dot: "bg-[#0aa6ce]",
  },
  {
    card: "bg-[#063b50] text-white lg:col-span-5",
    icon: "bg-white/10 text-[#65dcf4]",
    body: "text-[#c6e4ec]",
    dot: "bg-[#65dcf4]",
  },
  {
    card: "bg-[#fff3e8] text-[#493526] lg:col-span-5",
    icon: "bg-white/70 text-[#d67232]",
    body: "text-[#735a48]",
    dot: "bg-[#e7894c]",
  },
  {
    card: "bg-[#dff7e9] text-[#123d35] lg:col-span-7",
    icon: "bg-white/70 text-[#087e68]",
    body: "text-[#426b62]",
    dot: "bg-[#12a783]",
  },
] as const;

export function Services({ dictionary }: { dictionary: SiteDictionary }) {
  return (
    <section id="services" className="bg-[#f5fbfc] py-16 sm:py-20">
      <div className="container-shell">
        <SectionHeading
          title={dictionary.services.title}
          subtitle={dictionary.services.subtitle}
        />
        <div className="mt-12 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {dictionary.services.groups.map((group, index) => {
            const style = styles[index];
            return (
              <article
                key={group.title}
                className={`relative min-h-[330px] min-w-0 overflow-hidden rounded-lg p-6 shadow-[0_18px_55px_rgba(4,57,78,0.055)] sm:p-8 ${style.card}`}
              >
                <div className="relative z-10 flex min-w-0 items-center gap-4 pr-7">
                    <span className={`grid size-12 shrink-0 place-items-center rounded-md ${style.icon}`}>
                      <DataIcon name={group.icon} className="size-6" />
                    </span>
                    <h3 className="min-w-0 text-xl font-extrabold min-[360px]:text-2xl">
                      {group.title}
                    </h3>
                </div>
                <span className="pointer-events-none absolute right-5 top-5 text-4xl font-black leading-none opacity-10 min-[360px]:text-5xl">
                  0{index + 1}
                </span>
                <ul className="mt-9 grid min-w-0 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={`flex min-w-0 items-start gap-3 text-sm leading-6 ${style.body}`}
                    >
                      <span className={`mt-2 size-1.5 shrink-0 rounded-full ${style.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
