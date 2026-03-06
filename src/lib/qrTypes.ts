export interface QRTypeField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "url" | "password" | "textarea" | "select" | "number"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  defaultValue?: string
}

export interface QRType {
  id: string
  name: string
  description: string
  icon: string
  category: "basic" | "social" | "business" | "payment" | "advanced"
  fields: QRTypeField[]
  encode: (data: Record<string, string>) => string
}

export const qrTypes: QRType[] = [
  {
    id: "url",
    name: "URL / Website",
    description: "Weiterleitung zu einer Website",
    icon: "Globe",
    category: "basic",
    fields: [
      {
        name: "url",
        label: "URL",
        type: "url",
        placeholder: "https://beispiel.de",
        required: true,
      },
    ],
    encode: (data) => data.url || "",
  },
  {
    id: "text",
    name: "Text",
    description: "Beliebiger Text oder Nachricht",
    icon: "FileText",
    category: "basic",
    fields: [
      {
        name: "text",
        label: "Text",
        type: "textarea",
        placeholder: "Geben Sie Ihren Text ein...",
        required: true,
      },
    ],
    encode: (data) => data.text || "",
  },
  {
    id: "email",
    name: "E-Mail",
    description: "E-Mail-Adresse mit Betreff und Inhalt",
    icon: "Mail",
    category: "basic",
    fields: [
      {
        name: "email",
        label: "E-Mail-Adresse",
        type: "email",
        placeholder: "info@beispiel.de",
        required: true,
      },
      {
        name: "subject",
        label: "Betreff",
        type: "text",
        placeholder: "Betreff der E-Mail",
      },
      {
        name: "body",
        label: "Nachricht",
        type: "textarea",
        placeholder: "Inhalt der E-Mail",
      },
    ],
    encode: (data) => {
      const params = new URLSearchParams()
      if (data.subject) params.set("subject", data.subject)
      if (data.body) params.set("body", data.body)
      const queryString = params.toString()
      return queryString ? `mailto:${data.email}?${queryString}` : `mailto:${data.email}`
    },
  },
  {
    id: "phone",
    name: "Telefon",
    description: "Telefonnummer zum Anrufen",
    icon: "Phone",
    category: "basic",
    fields: [
      {
        name: "phone",
        label: "Telefonnummer",
        type: "tel",
        placeholder: "+49 123 456789",
        required: true,
      },
    ],
    encode: (data) => `tel:${data.phone?.replace(/\s/g, "") || ""}`,
  },
  {
    id: "sms",
    name: "SMS",
    description: "SMS mit vordefiniertem Text",
    icon: "MessageSquare",
    category: "basic",
    fields: [
      {
        name: "phone",
        label: "Telefonnummer",
        type: "tel",
        placeholder: "+49 123 456789",
        required: true,
      },
      {
        name: "message",
        label: "Nachricht",
        type: "textarea",
        placeholder: "Ihre SMS-Nachricht",
      },
    ],
    encode: (data) => {
      const phone = data.phone?.replace(/\s/g, "") || ""
      return data.message ? `sms:${phone}?body=${encodeURIComponent(data.message)}` : `sms:${phone}`
    },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "WhatsApp-Chat starten",
    icon: "MessageCircle",
    category: "social",
    fields: [
      {
        name: "phone",
        label: "Telefonnummer",
        type: "tel",
        placeholder: "+49 123 456789",
        required: true,
      },
      {
        name: "message",
        label: "Nachricht",
        type: "textarea",
        placeholder: "Vorgefertigte Nachricht",
      },
    ],
    encode: (data) => {
      const phone = data.phone?.replace(/[\s+-]/g, "") || ""
      return data.message 
        ? `https://wa.me/${phone}?text=${encodeURIComponent(data.message)}`
        : `https://wa.me/${phone}`
    },
  },
  {
    id: "wifi",
    name: "WLAN / WiFi",
    description: "WLAN-Zugangsdaten teilen",
    icon: "Wifi",
    category: "basic",
    fields: [
      {
        name: "ssid",
        label: "WLAN-Name (SSID)",
        type: "text",
        placeholder: "MeinWLAN",
        required: true,
      },
      {
        name: "password",
        label: "Passwort",
        type: "password",
        placeholder: "WLAN-Passwort",
        required: true,
      },
      {
        name: "encryption",
        label: "Verschlüsselung",
        type: "select",
        defaultValue: "WPA",
        options: [
          { value: "WPA", label: "WPA/WPA2" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "Ohne Passwort" },
        ],
      },
      {
        name: "hidden",
        label: "Verstecktes Netzwerk",
        type: "select",
        defaultValue: "false",
        options: [
          { value: "false", label: "Nein" },
          { value: "true", label: "Ja" },
        ],
      },
    ],
    encode: (data) => {
      const encryption = data.encryption || "WPA"
      const hidden = data.hidden === "true"
      const password = data.password || ""
      return `WIFI:T:${encryption};S:${data.ssid};P:${password};H:${hidden};;`
    },
  },
  {
    id: "vcard",
    name: "Visitenkarte (vCard)",
    description: "Kontaktdaten als digitale Visitenkarte",
    icon: "Contact",
    category: "business",
    fields: [
      {
        name: "firstName",
        label: "Vorname",
        type: "text",
        placeholder: "Max",
        required: true,
      },
      {
        name: "lastName",
        label: "Nachname",
        type: "text",
        placeholder: "Mustermann",
        required: true,
      },
      {
        name: "organization",
        label: "Firma / Organisation",
        type: "text",
        placeholder: "Musterfirma GmbH",
      },
      {
        name: "title",
        label: "Position / Titel",
        type: "text",
        placeholder: "Geschäftsführer",
      },
      {
        name: "phone",
        label: "Telefon",
        type: "tel",
        placeholder: "+49 123 456789",
      },
      {
        name: "email",
        label: "E-Mail",
        type: "email",
        placeholder: "max@beispiel.de",
      },
      {
        name: "website",
        label: "Website",
        type: "url",
        placeholder: "https://beispiel.de",
      },
      {
        name: "street",
        label: "Straße und Hausnummer",
        type: "text",
        placeholder: "Musterstraße 123",
      },
      {
        name: "city",
        label: "Stadt",
        type: "text",
        placeholder: "Berlin",
      },
      {
        name: "zip",
        label: "Postleitzahl",
        type: "text",
        placeholder: "10115",
      },
      {
        name: "country",
        label: "Land",
        type: "text",
        placeholder: "Deutschland",
      },
    ],
    encode: (data) => {
      const lines: string[] = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${data.lastName || ""};${data.firstName || ""};;;`,
        `FN:${data.firstName || ""} ${data.lastName || ""}`.trim(),
      ]
      if (data.organization) lines.push(`ORG:${data.organization}`)
      if (data.title) lines.push(`TITLE:${data.title}`)
      if (data.phone) lines.push(`TEL:${data.phone}`)
      if (data.email) lines.push(`EMAIL:${data.email}`)
      if (data.website) lines.push(`URL:${data.website}`)
      const address = [data.street, data.city, data.zip, data.country].filter(Boolean).join(",")
      if (address) lines.push(`ADR:;;${data.street || ""};${data.city || ""};${data.country || ""};${data.zip || ""};${data.country || ""}`)
      lines.push("END:VCARD")
      return lines.join("\n")
    },
  },
  {
    id: "location",
    name: "Standort",
    description: "GPS-Koordinaten oder Adresse",
    icon: "MapPin",
    category: "basic",
    fields: [
      {
        name: "latitude",
        label: "Breitengrad",
        type: "text",
        placeholder: "52.5200",
        required: true,
      },
      {
        name: "longitude",
        label: "Längengrad",
        type: "text",
        placeholder: "13.4050",
        required: true,
      },
      {
        name: "label",
        label: "Ortsname (optional)",
        type: "text",
        placeholder: "Berlin, Deutschland",
      },
    ],
    encode: (data) => {
      const lat = data.latitude || ""
      const lng = data.longitude || ""
      const label = data.label || ""
      return label 
        ? `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`
        : `geo:${lat},${lng}`
    },
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Instagram-Profil verlinken",
    icon: "Instagram",
    category: "social",
    fields: [
      {
        name: "username",
        label: "Benutzername",
        type: "text",
        placeholder: "beispiel_user",
        required: true,
      },
    ],
    encode: (data) => `https://instagram.com/${data.username?.replace("@", "") || ""}`,
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Facebook-Seite oder Profil",
    icon: "Facebook",
    category: "social",
    fields: [
      {
        name: "username",
        label: "Benutzername oder Seiten-ID",
        type: "text",
        placeholder: "beispiel_seite",
        required: true,
      },
    ],
    encode: (data) => `https://facebook.com/${data.username || ""}`,
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "YouTube-Kanal oder Video",
    icon: "Youtube",
    category: "social",
    fields: [
      {
        name: "url",
        label: "YouTube URL",
        type: "url",
        placeholder: "https://youtube.com/@beispiel",
        required: true,
      },
    ],
    encode: (data) => data.url || "",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "TikTok-Profil verlinken",
    icon: "Music",
    category: "social",
    fields: [
      {
        name: "username",
        label: "Benutzername",
        type: "text",
        placeholder: "beispiel_user",
        required: true,
      },
    ],
    encode: (data) => `https://tiktok.com/@${data.username?.replace("@", "") || ""}`,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "LinkedIn-Profil oder Firma",
    icon: "Linkedin",
    category: "social",
    fields: [
      {
        name: "url",
        label: "LinkedIn URL",
        type: "url",
        placeholder: "https://linkedin.com/in/beispiel",
        required: true,
      },
    ],
    encode: (data) => data.url || "",
  },
  {
    id: "pdf",
    name: "PDF-Dokument",
    description: "PDF-Datei verlinken",
    icon: "FileText",
    category: "advanced",
    fields: [
      {
        name: "url",
        label: "PDF URL",
        type: "url",
        placeholder: "https://beispiel.de/dokument.pdf",
        required: true,
      },
    ],
    encode: (data) => data.url || "",
  },
  {
    id: "appstore",
    name: "App Store",
    description: "iOS App im App Store",
    icon: "Apple",
    category: "business",
    fields: [
      {
        name: "appId",
        label: "App ID",
        type: "text",
        placeholder: "id123456789",
        required: true,
      },
    ],
    encode: (data) => `https://apps.apple.com/app/${data.appId || ""}`,
  },
  {
    id: "playstore",
    name: "Play Store",
    description: "Android App im Google Play Store",
    icon: "Play",
    category: "business",
    fields: [
      {
        name: "packageId",
        label: "Paket-ID",
        type: "text",
        placeholder: "com.beispiel.app",
        required: true,
      },
    ],
    encode: (data) => `https://play.google.com/store/apps/details?id=${data.packageId || ""}`,
  },
  {
    id: "sepa",
    name: "SEPA-Überweisung",
    description: "EPC-QR-Code für Banküberweisung",
    icon: "CreditCard",
    category: "payment",
    fields: [
      {
        name: "name",
        label: "Kontoinhaber",
        type: "text",
        placeholder: "Max Mustermann",
        required: true,
      },
      {
        name: "iban",
        label: "IBAN",
        type: "text",
        placeholder: "DE89 3704 0044 0532 0130 00",
        required: true,
      },
      {
        name: "bic",
        label: "BIC",
        type: "text",
        placeholder: "COBADEFFXXX",
      },
      {
        name: "amount",
        label: "Betrag (EUR)",
        type: "text",
        placeholder: "100.00",
      },
      {
        name: "reference",
        label: "Verwendungszweck",
        type: "text",
        placeholder: "Rechnung 12345",
      },
    ],
    encode: (data) => {
      const lines = [
        "BCD",
        "002",
        "1",
        "SCT",
        data.bic || "",
        data.name || "",
        data.iban?.replace(/\s/g, "") || "",
        `EUR${data.amount || ""}`,
        "",
        "",
        data.reference || "",
        "",
      ]
      return lines.join("\n")
    },
  },
  {
    id: "event",
    name: "Kalender-Event",
    description: "Termin in den Kalender eintragen",
    icon: "Calendar",
    category: "business",
    fields: [
      {
        name: "title",
        label: "Titel",
        type: "text",
        placeholder: "Team-Meeting",
        required: true,
      },
      {
        name: "location",
        label: "Ort",
        type: "text",
        placeholder: "Berlin",
      },
      {
        name: "start",
        label: "Beginn (YYYYMMDDTHHmm)",
        type: "text",
        placeholder: "20260115T100000",
        required: true,
      },
      {
        name: "end",
        label: "Ende (YYYYMMDDTHHmm)",
        type: "text",
        placeholder: "20260115T120000",
        required: true,
      },
      {
        name: "description",
        label: "Beschreibung",
        type: "textarea",
        placeholder: "Details zum Termin",
      },
    ],
    encode: (data) => {
      const lines = [
        "BEGIN:VEVENT",
        `SUMMARY:${data.title || ""}`,
        `DTSTART:${data.start || ""}`,
        `DTEND:${data.end || ""}`,
      ]
      if (data.location) lines.push(`LOCATION:${data.location}`)
      if (data.description) lines.push(`DESCRIPTION:${data.description}`)
      lines.push("END:VEVENT")
      return lines.join("\n")
    },
  },
  {
    id: "zoom",
    name: "Zoom-Meeting",
    description: "Zoom-Meeting beitreten",
    icon: "Video",
    category: "business",
    fields: [
      {
        name: "url",
        label: "Zoom Meeting URL",
        type: "url",
        placeholder: "https://zoom.us/j/123456789",
        required: true,
      },
    ],
    encode: (data) => data.url || "",
  },
  {
    id: "bitcoin",
    name: "Bitcoin / Krypto",
    description: "Kryptowährungs-Adresse",
    icon: "Bitcoin",
    category: "payment",
    fields: [
      {
        name: "address",
        label: "Wallet-Adresse",
        type: "text",
        placeholder: "bc1q...",
        required: true,
      },
      {
        name: "amount",
        label: "Betrag (BTC)",
        type: "text",
        placeholder: "0.001",
      },
      {
        name: "label",
        label: "Label",
        type: "text",
        placeholder: "Spende",
      },
    ],
    encode: (data) => {
      const params = new URLSearchParams()
      if (data.amount) params.set("amount", data.amount)
      if (data.label) params.set("label", data.label)
      const queryString = params.toString()
      return queryString ? `bitcoin:${data.address}?${queryString}` : `bitcoin:${data.address}`
    },
  },
]

export function getQRTypeById(id: string): QRType | undefined {
  return qrTypes.find((type) => type.id === id)
}

export function getQRTypesByCategory(category: QRType["category"]): QRType[] {
  return qrTypes.filter((type) => type.category === category)
}

export const qrCategories: { id: QRType["category"]; name: string; description: string }[] = [
  { id: "basic", name: "Grundlagen", description: "Häufig verwendete QR-Code-Typen" },
  { id: "social", name: "Soziale Medien", description: "Profile und Seiten in sozialen Netzwerken" },
  { id: "business", name: "Geschäft", description: "Professionelle Anwendungen" },
  { id: "payment", name: "Zahlung", description: "Geldtransfers und Finanztransaktionen" },
  { id: "advanced", name: "Erweitert", description: "Spezielle Anwendungen" },
]
