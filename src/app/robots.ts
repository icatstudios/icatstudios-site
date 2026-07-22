import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://icatstudios.com/sitemap.xml",
    host: "https://icatstudios.com",
  };
}
