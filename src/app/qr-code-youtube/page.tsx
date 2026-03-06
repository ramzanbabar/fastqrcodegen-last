import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "YouTube QR-Code erstellen – Kostenlos 2026",
  description: "YouTube QR-Code kostenlos erstellen. Kanal oder Video per Scan verlinken.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-youtube" },
}

export default function YouTubeQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="youtube" />
    </div>
  )
}
