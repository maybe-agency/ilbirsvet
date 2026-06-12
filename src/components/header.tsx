import { clinic, type SiteDictionary } from "@/data/site";
import { Instagram, Menu, MessageCircle } from "./icons";
import { Logo } from "./logo";

export function Header({ dictionary }: { dictionary: SiteDictionary }) {
  return (
    <header className="sticky top-0 z-50 bg-[#edf8fb]/92 py-3 backdrop-blur-xl">
      <div className="container-shell flex h-[4.5rem] items-center justify-between gap-3 rounded-lg border border-white/80 bg-white/76 px-3 shadow-[0_8px_30px_rgba(4,57,78,0.06)] sm:gap-6 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {dictionary.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-extrabold uppercase text-[#315d6d] transition-colors hover:text-[#0788b5]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a href={clinic.whatsapp} target="_blank" rel="noreferrer" className="icon-button" aria-label="Написать в WhatsApp" title="WhatsApp">
            <MessageCircle className="size-5" aria-hidden="true" />
          </a>
          <a href={clinic.instagram} target="_blank" rel="noreferrer" className="icon-button" aria-label="Открыть Instagram" title="Instagram">
            <Instagram className="size-5" aria-hidden="true" />
          </a>
          <div className="ml-2 inline-flex h-10 items-center rounded-md border border-[#d4eaf0] bg-[#edf8fb] p-1 text-xs font-bold" aria-label="Выбор языка">
            <span className="rounded bg-[#063b50] px-2.5 py-1.5 text-white shadow-sm">RU</span>
            <span className="cursor-not-allowed px-2.5 py-1.5 text-[#85a6b2]" aria-disabled="true">EN</span>
          </div>
        </div>

        <details className="mobile-menu relative lg:hidden">
          <summary className="icon-button cursor-pointer list-none" aria-label="Открыть меню">
            <Menu className="size-5" aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-14 w-[min(17rem,calc(100vw-2rem))] rounded-md border border-slate-200 bg-white p-3 shadow-xl">
            <nav className="grid" aria-label="Мобильная навигация">
              {dictionary.navigation.map((item) => (
                <a key={item.href} href={item.href} className="rounded px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <a href={clinic.whatsapp} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-sky-600 px-3 py-2.5 text-sm font-bold text-white">
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
              <span className="inline-flex items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-500">
                RU <span className="mx-1 text-slate-300">/</span> EN
              </span>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
