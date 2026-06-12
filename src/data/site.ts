import { blogCards } from "./articles";

export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

export const clinic = {
  name: "Ветеринарная клиника Илбирс",
  shortName: "Илбирс",
  address: "ул. Радищева 12",
  city: "Бишкек",
  phoneDisplay: "0 702 54 20 84",
  phoneHref: "tel:+996702542084",
  whatsapp: "https://wa.me/996702542084",
  instagram: "https://www.instagram.com/ilbirsvet/",
  website: "https://ilbirsvet.kg",
  coordinates: { latitude: 42.8477, longitude: 74.621 },
} as const;

const ru = {
  navigation: [
    { label: "Контакты", href: "/#contacts" },
    { label: "Наши услуги", href: "/#services" },
    { label: "Прайс", href: "/#offers" },
    { label: "Блог", href: "/#blog" },
  ],
  hero: {
    eyebrow: "Ветеринарная помощь 24/7",
    title: "Ветеринарная клиника Илбирс",
    subtitle: "Круглосуточная ветеринарная помощь в Бишкеке",
    address: "ул. Радищева 12",
    description:
      "Ветеринарная клиника «Илбирс» в Бишкеке оказывает круглосуточную помощь животным. Мы предоставляем услуги диагностики, рентгена, УЗИ, хирургии, вакцинации, лабораторных исследований и экстренной ветеринарной помощи. Клиника работает 24 часа в сутки и принимает домашних животных без выходных.",
    features: [
      { title: "24/7", text: "Круглосуточно", icon: "clock" },
      { title: "Рентген", text: "Современная диагностика", icon: "scan" },
      { title: "УЗИ", text: "Быстрое обследование", icon: "activity" },
      { title: "Хирургия", text: "Плановые и экстренные операции", icon: "cross" },
    ],
  },
  offers: {
    title: "Выгодные предложения",
    subtitle:
      "Следите за акциями нашей клиники, чтобы всегда быть в курсе действующих предложений.",
    items: [
      {
        title: "Рентген",
        price: "700",
        description:
          "Современный рентген-аппарат позволяет получать высококачественные снимки.",
        icon: "scan",
      },
      {
        title: "Кастрация",
        price: "1800",
        description:
          "Кастрация котов помогает предотвратить нежелательные последствия поведения домашнего животного.",
        icon: "shield",
      },
      {
        title: "Стерилизация",
        price: "2500",
        description:
          "Стерилизация кошек помогает избежать бесконтрольного размножения домашних животных.",
        icon: "heart",
      },
    ],
  },
  emergency: {
    eyebrow: "Мы работаем круглосуточно",
    title: "Круглосуточная ветеринарная клиника в Бишкеке",
    description:
      "Мы всегда готовы оказать высококвалифицированную ветеринарную помощь вашим питомцам независимо от времени суток.",
    stats: [
      { value: "24/7", label: "без выходных" },
      { value: "1 адрес", label: "в Бишкеке" },
      { value: "4", label: "направления помощи" },
    ],
  },
  services: {
    title: "Наши услуги",
    subtitle:
      "Диагностика, лечение и профилактика в одном месте — от первичного приема до сложной операции.",
    groups: [
      {
        title: "Поликлиника",
        icon: "stethoscope",
        items: [
          "Прием врача", "Вакцинация", "Терапия", "Консультации",
          "Стоматология", "Чипирование", "Рентген", "УЗИ",
          "Оксигенотерапия", "Интенсивная терапия",
        ],
      },
      {
        title: "Хирургия",
        icon: "cross",
        items: [
          "Стерилизация", "Кастрация", "Полостные операции",
          "Косметические операции", "Онкологические операции",
        ],
      },
      {
        title: "Специалисты",
        icon: "users",
        items: [
          "Кардиолог", "Онколог", "Дерматолог", "Невропатолог",
          "Эндокринолог", "Репродуктолог", "Стоматолог", "Герпетолог",
        ],
      },
      {
        title: "Лаборатория",
        icon: "flask",
        items: [
          "Анализ крови", "Анализ мочи", "Анализ кала",
          "Бактериологический посев", "Экспресс-тесты",
          "Парвовирусный энтерит", "Чума плотоядных",
        ],
      },
    ],
  },
  blog: {
    title: "Полезные статьи",
    subtitle:
      "Просто и понятно рассказываем о здоровье, профилактике и уходе за питомцами.",
    posts: blogCards,
  },
  actions: {
    appointment: "Записаться на прием",
    allArticles: "Все статьи",
    readArticle: "Читать статью",
  },
} as const;

export type SiteDictionary = typeof ru;
const dictionaries: Record<Locale, SiteDictionary | null> = { ru, en: null };

export function getDictionary(locale: Locale = defaultLocale): SiteDictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]!;
}
