"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileImage, FileCode, FileText, Loader2 } from "lucide-react"
import type { QRConfig } from "@/lib/qrGenerator"

type DownloadFormat = "png" | "svg" | "jpeg" | "webp" | "pdf"

interface DownloadPanelProps {
  config: QRConfig
  onDownload?: (format: DownloadFormat) => Promise<void>
}

export default function DownloadPanel({ config, onDownload }: DownloadPanelProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeFormat, setActiveFormat] = useState<DownloadFormat | null>(null)

  const handleDownload = async (format: DownloadFormat) => {
    if (!onDownload) return
    setIsDownloading(true)
    setActiveFormat(format)
    try {
      await onDownload(format)
    } finally {
      setIsDownloading(false)
      setActiveFormat(null)
    }
  }

  const formats: { format: DownloadFormat; label: string; icon: React.ReactNode }[] = [
    { format: "png", label: "PNG", icon: <FileImage className="h-4 w-4 mr-2" /> },
    { format: "svg", label: "SVG", icon: <FileCode className="h-4 w-4 mr-2" /> },
    { format: "jpeg", label: "JPEG", icon: <FileImage className="h-4 w-4 mr-2" /> },
    { format: "webp", label: "WebP", icon: <FileImage className="h-4 w-4 mr-2" /> },
    { format: "pdf", label: "PDF", icon: <FileText className="h-4 w-4 mr-2" /> },
  ]

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button 
          onClick={() => handleDownload("png")} 
          disabled={isDownloading || !onDownload}
          className="flex-1"
        >
          {isDownloading && activeFormat === "png" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          PNG Download
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" disabled={isDownloading || !onDownload}>
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Andere Formate"
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {formats.filter(f => f.format !== "png").map(({ format, label, icon }) => (
              <DropdownMenuItem 
                key={format} 
                onClick={() => handleDownload(format)}
                disabled={isDownloading}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        PNG & SVG sind für den Druck optimiert
      </p>
    </div>
  )
}
