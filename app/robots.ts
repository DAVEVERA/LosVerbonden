import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://losverbonden.nl/sitemap.xml",
    host: "https://losverbonden.nl",
  };
}
