import { clinic, type SiteDictionary } from "@/data/site";
import { Instagram, MessageCircle, Phone } from "./icons";
import { Logo } from "./logo";

export function Footer({ dictionary }: { dictionary: SiteDictionary }) {
  return (
    <footer id="contacts" className="bg-[#032634] text-white">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-6 max-w-md text-sm leading-6 text-slate-400">
            Круглосуточная ветеринарная помощь, диагностика и лечение домашних животных в Бишкеке.
          </p>
          <div className="mt-7 flex gap-2">
            <a href={clinic.whatsapp} target="_blank" rel="noreferrer" className="footer-icon" aria-label="WhatsApp">
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
            <a href={clinic.instagram} target="_blank" rel="noreferrer" className="footer-icon" aria-label="Instagram">
              <Instagram className="size-5" aria-hidden="true" />
            </a>
            <a href={clinic.phoneHref} className="footer-icon" aria-label="Позвонить">
              <Phone className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold">Контакты</h2>
          <address className="mt-5 space-y-3 text-sm not-italic text-slate-400">
            <p>{clinic.address}</p>
            <p>{clinic.city}</p>
            <a className="flex min-h-11 items-center hover:text-white" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
            <a className="flex min-h-11 items-center hover:text-white" href={clinic.whatsapp}>WhatsApp</a>
            <a className="flex min-h-11 items-center hover:text-white" href={clinic.instagram}>Instagram</a>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-bold">Режим работы</h2>
          <p className="mt-5 text-3xl font-bold text-sky-400">24/7</p>
          <p className="mt-2 text-sm text-slate-400">Круглосуточно, без выходных</p>
          <nav className="mt-6 grid" aria-label="Навигация в подвале">
            {dictionary.navigation.map((item) => (
              <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-sm text-slate-400 hover:text-white">{item.label}</a>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ветеринарная клиника «Илбирс»</p>
          <p>Бишкек, Кыргызстан</p>
        </div>
      </div>
    </footer>
  );
}
