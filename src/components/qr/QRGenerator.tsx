"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  QrCode, Download, FileImage, FileCode, FileText, Loader2,
  Globe, FileText as FileTextIcon, Mail, Phone, MessageSquare, MessageCircle, Wifi, 
  MapPin, Instagram, Facebook, Youtube, Music, Linkedin,
  CreditCard, Calendar, Video, Bitcoin
} from "lucide-react"
import { qrTypes, getQRTypeById, type QRType } from "@/lib/qrTypes"
import { generateQRDataURL, type QRConfig, type DotStyle, type ErrorCorrectionLevel } from "@/lib/qrGenerator"
import { trackQRCodeGenerated } from "@/lib/analytics"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, FileText: FileTextIcon, Mail, Phone, MessageSquare, MessageCircle, Wifi,
  MapPin, Instagram, Facebook, Youtube, Music, Linkedin,
  CreditCard, Calendar, Video, Bitcoin,
}

interface QRGeneratorProps {
  defaultType?: string
}

const defaultConfig: QRConfig = {
  data: "https://fastqrcodegen.online",
  width: 300,
  height: 300,
  dotsColor: "#000000",
  backgroundColor: "#ffffff",
  dotsStyle: "square",
  cornerSquareStyle: "square",
  cornerSquareColor: "#000000",
  cornerDotStyle: "square",
  cornerDotColor: "#000000",
  errorCorrectionLevel: "M",
}

export default function QRGenerator({ defaultType = "url" }: QRGeneratorProps) {
  const [selectedType, setSelectedType] = useState<QRType | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [config, setConfig] = useState<QRConfig>(defaultConfig)
  const [logo, setLogo] = useState<string | null>(null)
  const [previewURL, setPreviewURL] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("inhalt")
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Initialize with default type
  useEffect(() => {
    const type = getQRTypeById(defaultType)
    if (type) {
      setSelectedType(type)
    }
  }, [defaultType])
  
  // Generate QR code preview
  useEffect(() => {
    if (!selectedType) {
      setPreviewURL("")
      return
    }
    
    const generatePreview = async () => {
      setIsGenerating(true)
      try {
        const qrData = selectedType.encode(formData)
        if (!qrData) {
          setPreviewURL("")
          return
        }
        
        const fullConfig: QRConfig = {
          ...config,
          data: qrData,
          logo: logo || undefined,
        }
        
        const dataURL = await generateQRDataURL(fullConfig)
        setPreviewURL(dataURL)
        trackQRCodeGenerated(selectedType.id)
      } catch {
        setPreviewURL("")
      } finally {
        setIsGenerating(false)
      }
    }
    
    const timeoutId = setTimeout(generatePreview, 300)
    return () => clearTimeout(timeoutId)
  }, [selectedType, formData, config, logo])
  
  const handleDownload = useCallback(async (format: "png" | "svg" | "jpeg" | "webp" | "pdf") => {
    if (!previewURL || !selectedType) return
    
    setIsDownloading(true)
    try {
      if (format === "pdf") {
        const jspdfModule = await import("jspdf")
        const { jsPDF } = jspdfModule
        
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })
        
        const pageWidth = pdf.internal.pageSize.getWidth()
        const qrSize = 80
        const x = (pageWidth - qrSize) / 2
        const y = 40
        
        pdf.addImage(previewURL, "PNG", x, y, qrSize, qrSize)
        pdf.setFontSize(10)
        pdf.setTextColor(128)
        pdf.text("Erstellt mit FastQRCodeGen.online", pageWidth / 2, 280, { align: "center" })
        
        pdf.save(`qrcode-${selectedType.id}.pdf`)
      } else {
        const link = document.createElement("a")
        link.href = previewURL
        link.download = `qrcode-${selectedType.id}.${format === "jpeg" ? "jpg" : format}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } finally {
      setIsDownloading(false)
    }
  }, [previewURL, selectedType])
  
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }
  
  // Group types by category
  const groupedTypes = qrTypes.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = []
    }
    acc[type.category].push(type)
    return acc
  }, {} as Record<string, QRType[]>)
  
  const categoryLabels: Record<string, string> = {
    basic: "Grundlagen",
    social: "Soziale Medien",
    business: "Geschäft",
    payment: "Zahlung",
    advanced: "Erweitert",
  }
  
  return (
    <section id="generator" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Badge variant="secondary" className="mb-4">
            Kostenlos • Keine Registrierung • 2026
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            QR-Code erstellen
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wählen Sie einen Typ, füllen Sie die Daten aus und laden Sie Ihren QR-Code herunter.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inhalt">Inhalt</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inhalt" className="mt-4 space-y-4">
                {/* Type Selector */}
                <div className="space-y-4">
                  {Object.entries(groupedTypes).map(([category, types]) => (
                    <div key={category}>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                        {categoryLabels[category] || category}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {types.map((type) => {
                          const Icon = iconMap[type.icon] || Globe
                          const isSelected = selectedType?.id === type.id
                          
                          return (
                            <Card
                              key={type.id}
                              className={cn(
                                "cursor-pointer transition-all hover:border-primary hover:shadow-sm",
                                isSelected && "border-primary bg-primary/5 shadow-sm"
                              )}
                              onClick={() => {
                                setSelectedType(type)
                                setFormData({})
                              }}
                            >
                              <CardContent className="flex flex-col items-center gap-2 p-3 text-center">
                                <div className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-lg",
                                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                  {type.name}
                                </p>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Form Fields */}
                {selectedType && selectedType.fields.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedType.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedType.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedType.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <Label htmlFor={`field-${field.name}`}>
                            {field.label}
                            {field.required && <span className="ml-1 text-destructive">*</span>}
                          </Label>
                          {field.type === "textarea" ? (
                            <Textarea
                              id={`field-${field.name}`}
                              placeholder={field.placeholder}
                              value={formData[field.name] || ""}
                              onChange={(e) => updateFormData(field.name, e.target.value)}
                              required={field.required}
                              rows={3}
                            />
                          ) : field.type === "select" ? (
                            <Select 
                              value={formData[field.name] || field.defaultValue || ""} 
                              onValueChange={(value) => updateFormData(field.name, value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={`field-${field.name}`}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={formData[field.name] || ""}
                              onChange={(e) => updateFormData(field.name, e.target.value)}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="design" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Design anpassen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Size */}
                    <div className="space-y-2">
                      <Label>Größe: {config.width} × {config.height} px</Label>
                      <Slider
                        value={[config.width]}
                        onValueChange={([value]) => updateConfig({ width: value, height: value })}
                        min={128}
                        max={1024}
                        step={64}
                      />
                    </div>
                    
                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Punkt-Farbe</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.dotsColor}
                            onChange={(e) => updateConfig({ dotsColor: e.target.value })}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            value={config.dotsColor}
                            onChange={(e) => updateConfig({ dotsColor: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Hintergrund</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={config.backgroundColor}
                            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                            className="w-12 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            value={config.backgroundColor}
                            onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Dot Style */}
                    <div className="space-y-2">
                      <Label>Punkt-Stil</Label>
                      <Select 
                        value={config.dotsStyle} 
                        onValueChange={(value: DotStyle) => updateConfig({ dotsStyle: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Quadratisch</SelectItem>
                          <SelectItem value="dots">Punkte</SelectItem>
                          <SelectItem value="rounded">Abgerundet</SelectItem>
                          <SelectItem value="classy">Klassisch</SelectItem>
                          <SelectItem value="extra-rounded">Stark Rund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Error Correction */}
                    <div className="space-y-2">
                      <Label>Fehlerkorrektur</Label>
                      <Select 
                        value={config.errorCorrectionLevel} 
                        onValueChange={(value: ErrorCorrectionLevel) => updateConfig({ errorCorrectionLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Niedrig (7%)</SelectItem>
                          <SelectItem value="M">Mittel (15%)</SelectItem>
                          <SelectItem value="Q">Quartil (25%)</SelectItem>
                          <SelectItem value="H">Hoch (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Höhere Werte ermöglichen Logos im QR-Code
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="logo" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Logo hochladen</h3>
                        <p className="text-sm text-muted-foreground">
                          Fügen Sie ein Logo in die Mitte Ihres QR-Codes ein.
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                setLogo(event.target?.result as string)
                                updateConfig({ errorCorrectionLevel: "H" })
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-4 py-8 hover:border-primary hover:bg-muted"
                        >
                          {logo ? (
                            <img src={logo} alt="Logo" className="h-20 w-20 object-contain" />
                          ) : (
                            <div className="text-center">
                              <p className="text-sm font-medium text-muted-foreground">
                                Klicken zum Hochladen
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PNG, JPG, SVG bis 2MB
                              </p>
                            </div>
                          )}
                        </label>
                        {logo && (
                          <button
                            onClick={() => setLogo(null)}
                            className="text-sm text-destructive hover:underline"
                          >
                            Logo entfernen
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div 
                  className="flex aspect-square w-full max-w-[300px] items-center justify-center overflow-hidden rounded-lg"
                  style={{ backgroundColor: config.backgroundColor }}
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
                  {logo && (
                    <p className="text-xs text-muted-foreground">
                      Mit Logo • Fehlerkorrektur: H
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Download Panel */}
            {previewURL && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleDownload("png")} 
                    disabled={isDownloading}
                    className="flex-1"
                  >
                    {isDownloading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    PNG Download
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" disabled={isDownloading}>
                        Andere Formate
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload("svg")}>
                        <FileCode className="mr-2 h-4 w-4" /> SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("jpeg")}>
                        <FileImage className="mr-2 h-4 w-4" /> JPEG
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                        <FileText className="mr-2 h-4 w-4" /> PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  PNG & SVG sind für den Druck optimiert
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
