"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { QrCode } from "lucide-react"
import type { QRConfig } from "@/lib/qrGenerator"

interface QRPreviewProps {
  previewURL: string | null
  isGenerating: boolean
  config: QRConfig
}

export default function QRPreview({ previewURL, isGenerating, config }: QRPreviewProps) {
  const hasTransparentBackground = config.backgroundColor === "transparent"
  
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div 
          className={`flex aspect-square w-full max-w-[300px] items-center justify-center overflow-hidden rounded-lg ${
            hasTransparentBackground ? "qr-transparent-bg" : ""
          }`}
          style={!hasTransparentBackground ? { backgroundColor: config.backgroundColor } : undefined}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-48 w-48" />
              <p className="text-sm text-muted-foreground">QR-Code wird generiert...</p>
            </div>
          ) : previewURL ? (
            <img
              src={previewURL}
              alt="QR-Code Vorschau"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <QrCode className="h-16 w-16" />
              <p className="text-sm text-center">
                Füllen Sie das Formular aus, um eine Vorschau zu sehen
              </p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Größe: {config.width} × {config.height} px
          </p>
          {config.logo && (
            <p className="text-xs text-muted-foreground">
              Mit Logo • Fehlerkorrektur: H
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
