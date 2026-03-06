"use client"

import { useEffect, useRef } from "react"
import { appendQRCode, type QRConfig } from "@/lib/qrGenerator"

interface QRCodeStylingPreviewProps {
  config: QRConfig
}

export default function QRCodeStylingPreview({ config }: QRCodeStylingPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !config.data) return

    appendQRCode(config, containerRef.current)
  }, [config])

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center"
      style={{ 
        width: config.width, 
        height: config.height,
        maxWidth: "100%"
      }}
    />
  )
}
