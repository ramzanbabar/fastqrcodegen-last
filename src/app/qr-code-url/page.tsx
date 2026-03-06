import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "URL QR-Code erstellen – Kostenlos 2026",
  description: "Erstellen Sie kostenlos QR-Codes für URLs und Websites. Direkter Download als PNG, SVG oder PDF. Keine Registrierung erforderlich.",
  alternates: {
    canonical: "https://fastqrcodegen.online/qr-code-url",
  },
}

export default function URLQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="url" />
    </div>
  )
}
