import type { Metadata } from "next"
import QRGenerator from "@/components/qr/QRGenerator"

export const metadata: Metadata = {
  title: "SEPA QR-Code erstellen – EPC-QR-Code 2026",
  description: "SEPA QR-Code (EPC) kostenlos erstellen. Banküberweisung per Scan.",
  alternates: { canonical: "https://fastqrcodegen.online/qr-code-sepa" },
}

export default function SEPAQRPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <QRGenerator defaultType="sepa" />
    </div>
  )
}
