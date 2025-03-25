import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inviocefreetool.com"
  const currentDate = new Date()

  // Main tools
  const tools = [
    { path: "/invoice-generator", priority: 0.9 },
    { path: "/file-converter", priority: 0.9 },
    { path: "/youtube-tools", priority: 0.9 },
    { path: "/url-shortener", priority: 0.9 },
    { path: "/newsletter-generator", priority: 0.9 },
  ]

  // Info pages
  const infoPages = [
    { path: "/about", priority: 0.7 },
    { path: "/privacy", priority: 0.5 },
    { path: "/terms", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
  ]

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}${tool.path}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: tool.priority,
    })),
    ...infoPages.map((page) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
  ]
}

