import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
          <QrCode className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 – Seite nicht gefunden</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben. Vielleicht hilft Ihnen einer dieser Links weiter:
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button size="lg">
            Zur Startseite
          </Button>
        </Link>
        <Link href="/#generator">
          <Button variant="outline" size="lg">
            QR-Code erstellen
          </Button>
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 text-left max-w-md mx-auto">
        <Link href="/qr-code-whatsapp" className="text-primary hover:underline">
          WhatsApp QR-Code →
        </Link>
        <Link href="/qr-code-wifi" className="text-primary hover:underline">
          WiFi QR-Code →
        </Link>
        <Link href="/qr-code-visitenkarte" className="text-primary hover:underline">
          Visitenkarte QR-Code →
        </Link>
        <Link href="/qr-code-sepa" className="text-primary hover:underline">
          SEPA QR-Code →
        </Link>
      </div>
    </div>
  )
}
