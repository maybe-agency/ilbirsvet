import type { Metadata } from "next";
import { MessageCircle, ReceiptText } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PriceCatalog } from "@/components/price-catalog";
import { clinic, getDictionary } from "@/data/site";
import { getPriceItems } from "@/lib/google-sheets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute:
      "Прайс ветеринарной клиники Илбирс | Ветеринарные услуги в Бишкеке",
  },
  description:
    "Актуальные цены на ветеринарные услуги клиники Илбирс в Бишкеке: прием врача, рентген, УЗИ, хирургия, стоматология, лаборатория, вакцинация и другие услуги.",
  alternates: { canonical: "/price" },
  openGraph: {
    type: "website",
    locale: "ru_KG",
    url: "/price",
    title:
      "Прайс ветеринарной клиники Илбирс | Ветеринарные услуги в Бишкеке",
    description:
      "Актуальные цены на ветеринарные услуги клиники Илбирс в Бишкеке.",
  },
};

export default async function PricePage() {
  const dictionary = getDictionary("ru");
  const items = await getPriceItems();
  const categories = new Set(items.map((item) => item.category)).size;

  return (
    <>
      <Header dictionary={dictionary} />
      <main className="min-h-screen bg-[#f5fbfc]">
        <header className="border-b border-[#dcebf0] bg-white">
          <div className="container-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-[#08789f]">
                <ReceiptText className="size-4" aria-hidden="true" />
                Актуальные цены
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-balance text-[#062c3c] sm:text-6xl">
                Прайс ветеринарной клиники «Илбирс»
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#517180] sm:text-lg">
                Стоимость приема, диагностики, лечения и профилактических
                процедур в Бишкеке. Итоговую цену врач уточняет после осмотра
                питомца.
              </p>
            </div>

            {items.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-32 rounded-lg bg-[#dff5fb] p-5">
                  <p className="text-3xl font-black text-[#08789f]">
                    {items.length}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase text-[#517180]">
                    услуг
                  </p>
                </div>
                <div className="min-w-32 rounded-lg bg-[#dff7e9] p-5">
                  <p className="text-3xl font-black text-[#087e68]">
                    {categories}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase text-[#517180]">
                    категорий
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {items.length > 0 ? (
          <PriceCatalog items={items} />
        ) : (
          <section className="container-shell py-16 sm:py-24">
            <div className="mx-auto max-w-2xl rounded-lg border border-[#dcebf0] bg-white p-7 text-center shadow-[0_18px_55px_rgba(4,57,78,0.07)] sm:p-12">
              <span className="mx-auto grid size-14 place-items-center rounded-lg bg-[#dff5fb] text-[#08789f]">
                <ReceiptText className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold text-[#062c3c] sm:text-3xl">
                Прайс-лист временно недоступен.
              </h2>
              <p className="mt-4 leading-7 text-[#517180]">
                Пожалуйста, свяжитесь с клиникой для уточнения цен.
              </p>
              <ButtonLink
                href={clinic.whatsapp}
                external
                icon={<MessageCircle className="size-4" aria-hidden="true" />}
                className="mt-7"
              >
                Написать в WhatsApp
              </ButtonLink>
            </div>
          </section>
        )}
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
