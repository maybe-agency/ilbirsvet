import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { clinic } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: clinic.website,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${clinic.website}/images/ilbirs-hero-editorial-v2.jpg`],
      alternates: { languages: { ru: clinic.website } },
    },
    ...articles.map((article) => ({
      url: `${clinic.website}/blog/${article.slug}`,
      lastModified: article.modifiedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${clinic.website}${article.image}`],
      alternates: {
        languages: { ru: `${clinic.website}/blog/${article.slug}` },
      },
    })),
  ];
}
