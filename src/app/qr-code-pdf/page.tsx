import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "PDF QR-Code erstellen – Kostenlos 2026",
  description: "PDF QR-Code kostenlos erstellen. Dokumente per Scan verlinken.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-pdf" },
}

export default function PDFQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="pdf" />
    </div>
  )
}
