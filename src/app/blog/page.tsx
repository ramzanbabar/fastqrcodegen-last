import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog – QR-Code Tipps & Tricks 2026",
  description: "Aktuelle Artikel rund um QR-Codes: Marketing-Tipps, Anleitungen und Best Practices für 2026.",
}

const blogPosts = [
  {
    slug: "was-ist-ein-qr-code",
    title: "Was ist ein QR-Code? – Alles was Sie wissen müssen",
    excerpt: "Eine umfassende Einführung in QR-Codes: Funktionsweise, Geschichte und Anwendungsmöglichkeiten.",
    date: "2026-01-15",
    category: "Grundlagen",
    readTime: "5 Min."
  },
  {
    slug: "qr-code-marketing-2026",
    title: "QR-Code Marketing 2026 – Trends und Strategien",
    excerpt: "Wie Sie QR-Codes effektiv in Ihrem Marketing einsetzen. Die wichtigsten Trends für 2026.",
    date: "2026-01-20",
    category: "Marketing",
    readTime: "8 Min."
  },
  {
    slug: "qr-code-restaurant-2026",
    title: "QR-Codes für Restaurants – Die digitale Speisekarte",
    excerpt: "Wie Restaurants von digitalen Speisekarten und QR-Codes profitieren können.",
    date: "2026-01-25",
    category: "Branchen",
    readTime: "6 Min."
  },
  {
    slug: "qr-code-visitenkarte-erstellen",
    title: "QR-Code Visitenkarte erstellen – Digitale Networking-Lösung",
    excerpt: "Schritt-für-Schritt Anleitung zur Erstellung einer digitalen Visitenkarte mit QR-Code.",
    date: "2026-02-01",
    category: "Tutorials",
    readTime: "7 Min."
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Blog 2026
        </Badge>
        <h1 className="text-3xl font-bold mb-4">
          QR-Code Blog – Tipps, Tricks & News
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Aktuelle Artikel, Tutorials und Best Practices rund um QR-Codes. Erfahren Sie, wie Sie QR-Codes optimal nutzen.
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <span className="text-sm text-muted-foreground">• {post.readTime} Lesezeit</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
