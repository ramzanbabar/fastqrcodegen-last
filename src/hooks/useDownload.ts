"use client"

import { useState, useCallback } from "react"
import { downloadQRCode, type QRConfig } from "@/lib/qrGenerator"
import { trackQRCodeDownload } from "@/lib/analytics"

export type DownloadFormat = "png" | "svg" | "jpeg" | "webp" | "pdf"

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  
  const download = useCallback(async (
    config: QRConfig,
    format: DownloadFormat,
    filename?: string
  ) => {
    setIsDownloading(true)
    setDownloadError(null)
    
    try {
      await downloadQRCode(config, format, filename || "qrcode")
      trackQRCodeDownload(format)
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : "Download fehlgeschlagen"
      setDownloadError(message)
      return false
    } finally {
      setIsDownloading(false)
    }
  }, [])
  
  const downloadPNG = useCallback((config: QRConfig, filename?: string) => {
    return download(config, "png", filename)
  }, [download])
  
  const downloadSVG = useCallback((config: QRConfig, filename?: string) => {
    return download(config, "svg", filename)
  }, [download])
  
  const downloadJPEG = useCallback((config: QRConfig, filename?: string) => {
    return download(config, "jpeg", filename)
  }, [download])
  
  const downloadWebP = useCallback((config: QRConfig, filename?: string) => {
    return download(config, "webp", filename)
  }, [download])
  
  const downloadPDF = useCallback((config: QRConfig, filename?: string) => {
    return download(config, "pdf", filename)
  }, [download])
  
  const clearError = useCallback(() => {
    setDownloadError(null)
  }, [])
  
  return {
    isDownloading,
    downloadError,
    download,
    downloadPNG,
    downloadSVG,
    downloadJPEG,
    downloadWebP,
    downloadPDF,
    clearError,
  }
}
