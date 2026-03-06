"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  Globe, FileText, Mail, Phone, MessageSquare, MessageCircle, Wifi, 
  Contact, MapPin, Instagram, Facebook, Youtube, Music, Linkedin,
  CreditCard, Calendar, Video, Bitcoin, Apple, Play
} from "lucide-react"
import type { QRType } from "@/lib/qrTypes"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  Contact,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Music,
  Linkedin,
  CreditCard,
  Calendar,
  Video,
  Bitcoin,
  Apple,
  Play,
}

interface QRTypeSelectorProps {
  types: QRType[]
  selectedType: string
  onSelect: (typeId: string) => void
}

export default function QRTypeSelector({ types, selectedType, onSelect }: QRTypeSelectorProps) {
  const groupedTypes = useMemo(() => {
    const groups: Record<string, QRType[]> = {}
    types.forEach((type) => {
      if (!groups[type.category]) {
        groups[type.category] = []
      }
      groups[type.category].push(type)
    })
    return groups
  }, [types])
  
  const categoryLabels: Record<string, string> = {
    basic: "Grundlagen",
    social: "Soziale Medien",
    business: "Geschäft",
    payment: "Zahlung",
    advanced: "Erweitert",
  }
  
  return (
    <div className="space-y-4">
      {Object.entries(groupedTypes).map(([category, categoryTypes]) => (
        <div key={category}>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">
            {categoryLabels[category] || category}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categoryTypes.map((type) => {
              const Icon = iconMap[type.icon] || Globe
              const isSelected = selectedType === type.id
              
              return (
                <Card
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary hover:shadow-sm",
                    isSelected && "border-primary bg-primary/5 shadow-sm"
                  )}
                  onClick={() => onSelect(type.id)}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-3 text-center">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {type.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
