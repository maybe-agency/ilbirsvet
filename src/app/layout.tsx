import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { clinic } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(clinic.website),
  title: {
    default: "Ветеринарная клиника Илбирс в Бишкеке — круглосуточно 24/7",
    template: "%s | Ветеринарная клиника Илбирс",
  },
  description:
    "Круглосуточная ветеринарная клиника «Илбирс» в Бишкеке: ветеринар, рентген и УЗИ животных, хирургия, вакцинация, лаборатория. Ул. Радищева 12.",
  keywords: [
    "ветеринарная клиника Бишкек",
    "ветклиника Бишкек",
    "ветеринар Бишкек",
    "круглосуточная ветеринарная клиника Бишкек",
    "ветеринарная помощь Бишкек",
    "рентген для животных Бишкек",
    "УЗИ животных Бишкек",
  ],
  alternates: {
    canonical: "/",
    languages: { ru: "/" },
  },
  openGraph: {
    type: "website",
    locale: "ru_KG",
    url: "/",
    siteName: clinic.name,
    title: "Ветеринарная клиника Илбирс в Бишкеке — 24/7",
    description:
      "Круглосуточная ветеринарная помощь, диагностика и лечение домашних животных в Бишкеке.",
    images: [{
      url: "/images/ilbirs-hero-editorial-v2.jpg",
      width: 1122,
      height: 1402,
      alt: "Ветеринарная клиника Илбирс в Бишкеке",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ветеринарная клиника Илбирс в Бишкеке — 24/7",
    description: "Круглосуточная ветеринарная помощь животным. Ул. Радищева 12.",
    images: ["/images/ilbirs-hero-editorial-v2.jpg"],
  },
  category: "health",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  "@id": `${clinic.website}/#clinic`,
  name: clinic.name,
  url: clinic.website,
  image: `${clinic.website}/images/ilbirs-hero-editorial-v2.jpg`,
  telephone: "+996702542084",
  priceRange: "$$",
  currenciesAccepted: "KGS",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address,
    addressLocality: clinic.city,
    addressCountry: "KG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinic.coordinates.latitude,
    longitude: clinic.coordinates.longitude,
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  }],
  sameAs: [clinic.instagram],
  areaServed: { "@type": "City", name: "Бишкек" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${manrope.variable} scroll-smooth antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
