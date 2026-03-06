import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "LinkedIn QR-Code erstellen – Kostenlos 2026",
  description: "LinkedIn QR-Code kostenlos erstellen. Profil per Scan verlinken.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-linkedin" },
}

export default function LinkedInQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="linkedin" />
    </div>
  )
}
