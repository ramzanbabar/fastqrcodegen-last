import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "QR-Code mit Logo erstellen – Kostenlos 2026",
  description: "QR-Code mit Logo kostenlos erstellen. Marken-QR-Code mit Firmenlogo.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-mit-logo" },
}

export default function LogoQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator />
    </div>
  )
}
