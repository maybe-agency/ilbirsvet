import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { articles, getArticle } from "@/data/articles";
import { clinic, getDictionary } from "@/data/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  const url = `/blog/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.description,
    keywords: [...article.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ru_KG",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      section: article.category,
      images: [
        {
          url: article.image,
          width: 1672,
          height: 941,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const dictionary = getDictionary("ru");
  const articleUrl = `${clinic.website}/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: `${clinic.website}${article.image}`,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate,
    mainEntityOfPage: articleUrl,
    inLanguage: "ru",
    keywords: article.keywords.join(", "),
    articleSection: article.category,
    author: {
      "@type": "Organization",
      name: clinic.name,
      url: clinic.website,
    },
    publisher: {
      "@type": "Organization",
      name: clinic.name,
      url: clinic.website,
    },
    about: article.about.map((name) => ({ "@type": "Thing", name })),
  };

  return (
    <>
      <Header dictionary={dictionary} />
      <main className="bg-[#f5fbfc] pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <div className="container-shell pt-5">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 py-3 text-sm font-extrabold text-[#08789f]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Все статьи
          </Link>
        </div>

        <header className="container-shell">
          <div className="relative min-h-[650px] overflow-hidden rounded-lg sm:min-h-[620px]">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[63%_center]"
            />
            <div className="article-hero-wash absolute inset-0" />
            <div className="relative z-10 flex min-h-[650px] max-w-3xl flex-col justify-end px-5 py-10 sm:min-h-[620px] sm:px-10 sm:py-14 lg:px-14">
              <p className="text-xs font-extrabold uppercase text-[#08789f]">
                {article.category}
              </p>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-balance text-[#062c3c] sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#315d6d] sm:text-lg">
                {article.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#517180]">
                <time
                  dateTime={article.publishedDate}
                  className="inline-flex items-center gap-2"
                >
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {article.displayDate}
                </time>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-shell grid gap-12 pt-14 lg:grid-cols-[15rem_minmax(0,48rem)_minmax(16rem,1fr)] lg:items-start">
          <aside className="hidden lg:block">
            <nav
              className="sticky top-28 border-l border-[#b9dce7] pl-5"
              aria-label="Оглавление статьи"
            >
              <p className="text-xs font-extrabold uppercase text-[#08789f]">
                В статье
              </p>
              <ol className="mt-5 grid gap-3">
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm leading-5 text-[#5b7985] hover:text-[#08789f]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="article-copy">
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {article.specialist && (
              <div className="my-10 border-y border-[#b9dce7] py-7">
                <p className="text-sm font-extrabold uppercase text-[#08789f]">
                  {article.specialistLabel}
                </p>
                <p className="mt-3 text-xl font-extrabold text-[#062c3c]">
                  {article.specialist}
                </p>
              </div>
            )}

            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="mt-12 rounded-lg bg-[#dff5fb] p-6 sm:p-8">
              <h2 className="mt-0">{article.urgentTitle}</h2>
              <p>{article.urgentText}</p>
            </div>

            <p className="mt-8 text-sm text-[#78929c]">
              Материал носит информационный характер и не заменяет осмотр
              ветеринарного врача.
            </p>
          </article>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-lg bg-[#063b50] p-6 text-white sm:p-8">
              <p className="text-xs font-extrabold uppercase text-[#65dcf4]">
                {article.ctaEyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-extrabold">
                {article.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#c6e4ec]">
                {article.ctaText}
              </p>
              <ButtonLink
                href={clinic.whatsapp}
                external
                variant="light"
                icon={<MessageCircle className="size-4" aria-hidden="true" />}
                className="mt-6 w-full"
              >
                Записаться в WhatsApp
              </ButtonLink>
              <a
                href={clinic.phoneHref}
                className="mt-2 block min-h-11 py-3 text-center text-sm font-extrabold text-[#65dcf4]"
              >
                {clinic.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
