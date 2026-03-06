import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "QR Code Generator 2026 – Kostenlos & Sofort | FastQRCodeGen.online",
  description: "QR-Code kostenlos erstellen 2026: 21 Typen. Sofort-Download als PNG, SVG & PDF. Kein Account. 100% gratis.",
  alternates: { canonical: "https://fastqrcodegen.online" },
}

const features = [
  { icon: "⚡", title: "Blitzschnell", description: "QR-Codes in unter 3 Sekunden" },
  { icon: "🔒", title: "100% Privat", description: "Alle Daten bleiben lokal" },
  { icon: "📱", title: "21 QR-Typen", description: "URL, WhatsApp, WiFi & mehr" },
  { icon: "💰", title: "Kostenlos", description: "Keine Registrierung nötig" },
]

const stats = [
  { value: "1M+", label: "QR-Codes erstellt" },
  { value: "21", label: "QR-Code Typen" },
  { value: "100%", label: "Kostenlos" },
  { value: "0", label: "Registrierung" },
]

const faqs = [
  {
    q: "Ist der QR-Code Generator wirklich kostenlos?",
    a: "Ja, unser QR-Code Generator ist 100% kostenlos. Keine versteckten Gebühren, keine Registrierungspflicht und keine Limits."
  },
  {
    q: "Werden meine Daten gespeichert?",
    a: "Nein, alle QR-Codes werden direkt in Ihrem Browser erstellt. Ihre Daten verlassen niemals Ihr Gerät."
  },
  {
    q: "Welche Dateiformate werden unterstützt?",
    a: "Sie können QR-Codes als PNG, SVG, JPEG und PDF herunterladen. PNG und SVG eignen sich besonders für Drucke."
  },
  {
    q: "Kann ich ein Logo in den QR-Code einfügen?",
    a: "Ja, Sie können ein eigenes Logo hochladen. Wir empfehlen dann die hohe Fehlerkorrektur (H) für beste Scan-Ergebnisse."
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              🎉 QR Code Generator 2026 – Neu & Verbessert
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              QR-Code kostenlos erstellen
              <span className="block text-primary">in 3 Sekunden</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Der schnellste QR-Code Generator für 2026. 21 Typen, unbegrenzte Anpassungen, 
              Download als PNG, SVG & PDF. Kein Account nötig.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link 
                href="#generator"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Jetzt QR-Code erstellen
              </Link>
              <Link 
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
              >
                Alle Features ansehen
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Generator */}
      <QRGenerator />

      {/* Features */}
      <section id="features" className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Warum FastQRCodeGen.online?
            </h2>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Häufig gestellte Fragen
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Bereit, Ihren QR-Code zu erstellen?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Starten Sie jetzt und erstellen Sie in wenigen Sekunden Ihren professionellen QR-Code.
          </p>
          <Link 
            href="#generator"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
          >
            Jetzt kostenlos starten
          </Link>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "FastQRCodeGen.online",
            "description": "Kostenloser QR-Code Generator 2026. Erstellen Sie QR-Codes in Sekunden.",
            "url": "https://fastqrcodegen.online",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })
        }}
      />
    </>
  )
}
