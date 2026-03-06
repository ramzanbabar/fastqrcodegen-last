import type { QRConfig, DotStyle, CornerSquareStyle, CornerDotStyle } from "./qrGenerator"

export interface QRTemplate {
  id: string
  name: string
  description: string
  config: Partial<QRConfig>
  preview: string
}

export const qrTemplates: QRTemplate[] = [
  {
    id: "classic",
    name: "Klassisch",
    description: "Zeitloses schwarz-weiß Design",
    preview: "⬛",
    config: {
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "square",
      cornerSquareStyle: "square",
      cornerDotStyle: "square",
    },
  },
  {
    id: "rounded",
    name: "Abgerundet",
    description: "Moderne abgerundete Punkte",
    preview: "🔘",
    config: {
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "dotted",
    name: "Gepunktet",
    description: "Verspielte Punkte-Optik",
    preview: "⚪",
    config: {
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "dots",
      cornerSquareStyle: "dot",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "classy",
    name: "Elegant",
    description: "Raffinierte Klasse-Optik",
    preview: "✨",
    config: {
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "classy",
      cornerSquareStyle: "square",
      cornerDotStyle: "square",
    },
  },
  {
    id: "extra-rounded",
    name: "Sehr Rund",
    description: "Maximal abgerundetes Design",
    preview: "🟢",
    config: {
      dotsColor: "#000000",
      backgroundColor: "#ffffff",
      dotsStyle: "extra-rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "purple-gradient",
    name: "Lila Traum",
    description: "Elegantes lila Design",
    preview: "💜",
    config: {
      dotsColor: "#7c3aed",
      backgroundColor: "#f5f3ff",
      dotsStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "blue-corporate",
    name: "Business Blau",
    description: "Professionelles Firmen-Design",
    preview: "💙",
    config: {
      dotsColor: "#1e40af",
      backgroundColor: "#eff6ff",
      dotsStyle: "classy-rounded",
      cornerSquareStyle: "square",
      cornerDotStyle: "square",
    },
  },
  {
    id: "green-nature",
    name: "Natur Grün",
    description: "Frisches, natürliches Design",
    preview: "💚",
    config: {
      dotsColor: "#059669",
      backgroundColor: "#ecfdf5",
      dotsStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "orange-energy",
    name: "Energie Orange",
    description: "Lebendiges, energetisches Design",
    preview: "🧡",
    config: {
      dotsColor: "#ea580c",
      backgroundColor: "#fff7ed",
      dotsStyle: "classy",
      cornerSquareStyle: "square",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "red-bold",
    name: "Mutig Rot",
    description: "Auffälliges, mutiges Design",
    preview: "❤️",
    config: {
      dotsColor: "#dc2626",
      backgroundColor: "#fef2f2",
      dotsStyle: "square",
      cornerSquareStyle: "square",
      cornerDotStyle: "square",
    },
  },
  {
    id: "instagram",
    name: "Instagram Style",
    description: "Bunter Gradient-Look",
    preview: "📸",
    config: {
      dotsColor: "#e1306c",
      backgroundColor: "#fafafa",
      dotsStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Invertiert für dunkle Hintergründe",
    preview: "🌙",
    config: {
      dotsColor: "#ffffff",
      backgroundColor: "#1f2937",
      dotsStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
    },
  },
]

export function getTemplateById(id: string): QRTemplate | undefined {
  return qrTemplates.find((template) => template.id === id)
}

export function applyTemplate(config: QRConfig, templateId: string): QRConfig {
  const template = getTemplateById(templateId)
  if (!template) return config
  
  return {
    ...config,
    ...template.config,
  }
}

export const dotStyles: { id: DotStyle; name: string; description: string }[] = [
  { id: "square", name: "Quadratisch", description: "Klassische quadratische Punkte" },
  { id: "dots", name: "Kreise", description: "Runde Kreise als Punkte" },
  { id: "rounded", name: "Abgerundet", description: "Abgerundete Quadrate" },
  { id: "classy", name: "Elegant", description: "Stilvolle elegante Punkte" },
  { id: "classy-rounded", name: "Elegant Rund", description: "Abgerundete elegante Punkte" },
  { id: "extra-rounded", name: "Sehr Rund", description: "Stark abgerundete Punkte" },
]

export const cornerSquareStyles: { id: CornerSquareStyle; name: string; description: string }[] = [
  { id: "square", name: "Quadratisch", description: "Klassische Ecken" },
  { id: "dot", name: "Kreis", description: "Runde Ecken" },
  { id: "extra-rounded", name: "Abgerundet", description: "Stark abgerundete Ecken" },
]

export const cornerDotStyles: { id: CornerDotStyle; name: string; description: string }[] = [
  { id: "square", name: "Quadratisch", description: "Klassische Eckpunkte" },
  { id: "dot", name: "Kreis", description: "Runde Eckpunkte" },
]
