import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "WLAN QR-Code erstellen – Kostenlos 2026",
  description: "WLAN QR-Code kostenlos erstellen. Teilen Sie Ihr WiFi mit einem Scan. Download als PNG, SVG & PDF.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-wifi" },
}

export default function WiFiQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="wifi" />
    </div>
  )
}
