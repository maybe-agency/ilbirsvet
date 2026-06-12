import { ButtonLink } from "@/components/button-link";
import { DataIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { clinic, type SiteDictionary } from "@/data/site";

const styles = [
  {
    card: "border-[#063b50] bg-[#063b50] text-white",
    icon: "bg-[#65dcf4]/15 text-[#65dcf4]",
    title: "text-white",
    price: "text-[#65dcf4]",
    body: "text-[#c6e4ec]",
    button: "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20",
  },
  {
    card: "border-[#b9e8f2] bg-[#c9f1f8] text-[#062c3c]",
    icon: "bg-white/70 text-[#08789f]",
    title: "text-[#062c3c]",
    price: "text-[#08789f]",
    body: "text-[#315d6d]",
    button: "border-white/80 bg-white/55",
  },
  {
    card: "border-[#c9ecda] bg-[#dff7e9] text-[#123d35]",
    icon: "bg-white/70 text-[#087e68]",
    title: "text-[#123d35]",
    price: "text-[#087e68]",
    body: "text-[#426b62]",
    button: "border-white/80 bg-white/55 text-[#123d35]",
  },
] as const;

export function Offers({ dictionary }: { dictionary: SiteDictionary }) {
  return (
    <section id="offers" className="bg-white py-16 sm:py-20">
      <div className="container-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title={dictionary.offers.title}
            subtitle={dictionary.offers.subtitle}
          />
          <p className="max-w-xs text-sm leading-6 text-[#6b8995]">
            Актуальные цены и специальные условия для плановых процедур.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {dictionary.offers.items.map((offer, index) => {
            const style = styles[index];
            return (
              <article
                key={offer.title}
                className={`group flex min-h-[390px] flex-col overflow-hidden rounded-lg border p-6 shadow-[0_18px_55px_rgba(4,57,78,0.08)] transition-transform hover:-translate-y-1 sm:p-8 ${style.card}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`grid size-14 place-items-center rounded-md ${style.icon}`}>
                    <DataIcon name={offer.icon} className="size-7" />
                  </span>
                  <span className="text-6xl font-black leading-none opacity-[0.08]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className={`mt-8 text-2xl font-extrabold ${style.title}`}>
                  {offer.title}
                </h3>
                <p className={`mt-3 text-5xl font-black ${style.price}`}>
                  {offer.price}
                  <span className="ml-2 text-sm font-extrabold">сомов</span>
                </p>
                <p className={`mt-6 flex-1 text-sm leading-6 ${style.body}`}>
                  {offer.description}
                </p>
                <ButtonLink
                  href={clinic.whatsapp}
                  external
                  variant="secondary"
                  className={`mt-7 w-full ${style.button}`}
                >
                  {dictionary.actions.appointment}
                </ButtonLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
