"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "fastqrcodegen_consent"

export default function GdprBanner() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])
  
  const acceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      }))
    }
    setIsVisible(false)
  }
  
  const acceptNecessary = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      }))
    }
    setIsVisible(false)
  }
  
  if (!isVisible) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm text-foreground">
              Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu bieten. 
              Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß unserer{" "}
              <Link href="/datenschutz" className="text-primary underline hover:no-underline">
                Datenschutzrichtlinie
              </Link>{" "}
              zu.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={acceptNecessary}
            >
              Nur notwendige
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary-hover"
              onClick={acceptAll}
            >
              Alle akzeptieren
            </Button>
          </div>
          
          <button
            onClick={acceptNecessary}
            className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:text-foreground sm:hidden"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
