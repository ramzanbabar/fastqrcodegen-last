import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fastqrcodegen.online"
  
  const staticPages = [
    "",
    "/qr-code-url",
    "/qr-code-whatsapp",
    "/qr-code-wifi",
    "/qr-code-visitenkarte",
    "/qr-code-email",
    "/qr-code-text",
    "/qr-code-instagram",
    "/qr-code-youtube",
    "/qr-code-tiktok",
    "/qr-code-linkedin",
    "/qr-code-pdf",
    "/qr-code-mit-logo",
    "/qr-code-farbe-aendern",
    "/qr-code-sepa",
    "/qr-code-event",
    "/bulk-qr-code",
    "/qr-code-scanner",
    "/blog",
    "/blog/was-ist-ein-qr-code",
    "/blog/qr-code-marketing-2026",
    "/blog/qr-code-restaurant-2026",
    "/blog/qr-code-visitenkarte-erstellen",
    "/impressum",
    "/datenschutz",
    "/nutzungsbedingungen",
    "/ueber-uns",
    "/kontakt",
  ]

  return staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : 0.8,
  }))
}
