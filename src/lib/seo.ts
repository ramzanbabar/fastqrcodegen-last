import type { Metadata } from "next"

export const siteConfig = {
  name: "FastQRCodeGen.online",
  url: "https://fastqrcodegen.online",
  ogImage: "https://fastqrcodegen.online/og-image.png",
  links: {
    twitter: "https://twitter.com/fastqrcodegen",
    github: "https://github.com/fastqrcodegen",
  },
  creator: "FastQRCodeGen Team",
}

export function generateSEOMetadata(options: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const { title, description, path = "", image, noIndex = false } = options
  
  const url = `${siteConfig.url}${path}`
  const ogImage = image || siteConfig.ogImage
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
      creator: "@fastqrcodegen",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

export function generateArticleMetadata(options: {
  title: string
  description: string
  path: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}): Metadata {
  const { title, description, path, publishedTime, modifiedTime, authors, tags } = options
  
  const url = `${siteConfig.url}${path}`
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors || [siteConfig.creator],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      creator: "@fastqrcodegen",
    },
    robots: { index: true, follow: true },
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateHowToSchema(options: {
  name: string
  description: string
  steps: { name: string; text: string }[]
  totalTime?: string
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    totalTime: options.totalTime,
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export function generateSoftwareApplicationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: "Kostenloser QR-Code Generator mit 21 verschiedenen Typen. Erstellen Sie QR-Codes für URLs, WiFi, Visitenkarten, WhatsApp und mehr.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1523",
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "German",
    },
  }
}
