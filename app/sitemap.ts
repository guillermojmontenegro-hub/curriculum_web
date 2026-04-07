import type { MetadataRoute } from "next";

import { getAllArticleSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";

  const articleUrls = getAllArticleSlugs().map((slug) => ({
    url: `${baseUrl}/articulos/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/articulos`,
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...articleUrls
  ];
}
