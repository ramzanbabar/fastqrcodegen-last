"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { QRConfig, DotStyle, CornerSquareStyle, CornerDotStyle, ErrorCorrectionLevel } from "@/lib/qrGenerator"

interface QRCustomizerProps {
  config: QRConfig
  onChange: (updates: Partial<QRConfig>) => void
}

const dotStyles: { value: DotStyle; label: string }[] = [
  { value: "square", label: "Quadratisch" },
  { value: "dots", label: "Punkte" },
  { value: "rounded", label: "Abgerundet" },
  { value: "classy", label: "Klassisch" },
  { value: "classy-rounded", label: "Klassisch Rund" },
  { value: "extra-rounded", label: "Stark Rund" },
]

const cornerStyles: { value: CornerSquareStyle; label: string }[] = [
  { value: "square", label: "Quadratisch" },
  { value: "dot", label: "Punkt" },
  { value: "extra-rounded", label: "Stark Rund" },
]

const cornerDotStyles: { value: CornerDotStyle; label: string }[] = [
  { value: "square", label: "Quadratisch" },
  { value: "dot", label: "Punkt" },
]

const errorLevels: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: "L", label: "Niedrig (7%)" },
  { value: "M", label: "Mittel (15%)" },
  { value: "Q", label: "Quartil (25%)" },
  { value: "H", label: "Hoch (30%)" },
]

export default function QRCustomizer({ config, onChange }: QRCustomizerProps) {
  return (
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
            onValueChange={([value]) => onChange({ width: value, height: value })}
            min={128}
            max={1024}
            step={64}
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dots-color">Punkt-Farbe</Label>
            <div className="flex gap-2">
              <Input
                id="dots-color"
                type="color"
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                value={config.dotsColor}
                onChange={(e) => onChange({ dotsColor: e.target.value })}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bg-color">Hintergrund</Label>
            <div className="flex gap-2">
              <Input
                id="bg-color"
                type="color"
                value={config.backgroundColor === "transparent" ? "#ffffff" : config.backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                value={config.backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
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
            onValueChange={(value: DotStyle) => onChange({ dotsStyle: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dotStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Corner Square Style */}
        <div className="space-y-2">
          <Label>Eckpunkt-Stil</Label>
          <Select 
            value={config.cornerSquareStyle} 
            onValueChange={(value: CornerSquareStyle) => onChange({ cornerSquareStyle: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cornerStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Corner Dot Style */}
        <div className="space-y-2">
          <Label>Eckpunkt-Punkt-Stil</Label>
          <Select 
            value={config.cornerDotStyle} 
            onValueChange={(value: CornerDotStyle) => onChange({ cornerDotStyle: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cornerDotStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Corner Color */}
        <div className="space-y-2">
          <Label htmlFor="corner-color">Eckpunkt-Farbe</Label>
          <div className="flex gap-2">
            <Input
              id="corner-color"
              type="color"
              value={config.cornerSquareColor}
              onChange={(e) => onChange({ cornerSquareColor: e.target.value, cornerDotColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
            <Input
              value={config.cornerSquareColor}
              onChange={(e) => onChange({ cornerSquareColor: e.target.value, cornerDotColor: e.target.value })}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        {/* Error Correction */}
        <div className="space-y-2">
          <Label>Fehlerkorrektur</Label>
          <Select 
            value={config.errorCorrectionLevel} 
            onValueChange={(value: ErrorCorrectionLevel) => onChange({ errorCorrectionLevel: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {errorLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Höhere Werte ermöglichen Logos im QR-Code
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
