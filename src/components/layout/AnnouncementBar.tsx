"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Sparkles } from "lucide-react"

const ANNOUNCEMENT_KEY = "fastqrcodegen_announcement_dismissed"
const ANNOUNCEMENT_ID = "2026_launch"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const dismissed = localStorage.getItem(ANNOUNCEMENT_KEY)
    if (dismissed !== ANNOUNCEMENT_ID) {
      setIsVisible(true)
    }
  }, [])
  
  const dismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ANNOUNCEMENT_KEY, ANNOUNCEMENT_ID)
    }
    setIsVisible(false)
  }
  
  if (!isVisible) return null
  
  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Sparkles className="h-4 w-4" />
          <span>
            <strong>Neu in 2026:</strong> Jetzt mit 21 QR-Code Typen & Bulk-Generator!{" "}
            <Link 
              href="/bulk-qr-code" 
              className="underline hover:no-underline"
            >
              Jetzt ausprobieren
            </Link>
          </span>
        </div>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/80 hover:text-primary-foreground"
        aria-label="Schließen"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
