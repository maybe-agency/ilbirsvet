import type { MetadataRoute } from "next";
import { clinic } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${clinic.website}/sitemap.xml`,
    host: clinic.website,
  };
}

