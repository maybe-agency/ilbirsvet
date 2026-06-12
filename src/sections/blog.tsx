import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, DataIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import type { SiteDictionary } from "@/data/site";

const colorMap = {
  sky: "bg-[#c9f1f8] text-[#08789f]",
  mint: "bg-[#dff7e9] text-[#087e68]",
  coral: "bg-[#ffe5df] text-[#d95d50]",
} as const;

export function Blog({ dictionary }: { dictionary: SiteDictionary }) {
  return (
    <section id="blog" className="bg-white py-16 sm:py-20">
      <div className="container-shell">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title={dictionary.blog.title}
            subtitle={dictionary.blog.subtitle}
          />
          <span className="text-xs font-extrabold uppercase text-[#87a4af]">
            Журнал о здоровье животных
          </span>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {dictionary.blog.posts.map((post, index) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-lg border border-[#dcebf0] bg-white shadow-[0_18px_55px_rgba(4,57,78,0.07)]"
            >
              {post.image && post.href ? (
                <Link
                  href={post.href}
                  className="relative block aspect-[16/9] overflow-hidden"
                  aria-label={`Читать статью: ${post.title}`}
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
              ) : (
                <div
                  className={`relative grid aspect-[16/9] place-items-center overflow-hidden ${colorMap[post.color]}`}
                >
                  <span className="absolute -right-2 -top-8 text-[9rem] font-black leading-none opacity-[0.07]">
                    0{index + 1}
                  </span>
                  <DataIcon
                    name={post.icon}
                    className="size-16 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4 text-[11px] font-extrabold uppercase">
                  <span className="text-[#08789f]">{post.category}</span>
                  <span className="text-[#8ba4ae]">
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold leading-7 text-[#062c3c]">
                  {post.href ? (
                    <Link
                      href={post.href}
                      className="inline-flex min-h-11 items-center py-1 hover:text-[#08789f]"
                    >
                      {post.title}
                    </Link>
                  ) : (
                    post.title
                  )}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5b7985]">
                  {post.excerpt}
                </p>
                {post.href ? (
                  <Link
                    href={post.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-extrabold text-[#08789f]"
                  >
                    {dictionary.actions.readArticle}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#9ab0b8]">
                    Материал готовится
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
