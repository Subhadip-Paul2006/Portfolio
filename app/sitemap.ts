import type { MetadataRoute } from "next"

// Minimal sitemap — single-page portfolio, so only the root URL matters.
// Next renders this as a valid /sitemap.xml at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://jess.vc",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
