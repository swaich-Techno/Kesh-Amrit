import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/erp", "/api"]
      }
    ],
    sitemap: "https://kesh-amrit.vercel.app/sitemap.xml"
  };
}
