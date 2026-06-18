import type { MetadataRoute } from "next";

import { siteUrl } from "@/data/site";

const routes = ["", "/product", "/order", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-06-17"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
