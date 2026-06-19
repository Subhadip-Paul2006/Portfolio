import type { MetadataRoute } from "next"

// Robots.txt for production. Disallow nothing — the entire portfolio is
// meant to be indexed — but advertise the sitemap so crawlers can pick up
// every route in one pass.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://jess.vc/sitemap.xml",
    host: "https://jess.vc",
  }
}
