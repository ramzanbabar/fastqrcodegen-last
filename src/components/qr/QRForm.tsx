"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { QRType, QRTypeField } from "@/lib/qrTypes"

interface QRFormProps {
  type: QRType
  data: Record<string, string>
  onChange: (field: string, value: string) => void
}

function FormField({ 
  field, 
  value, 
  onChange 
}: { 
  field: QRTypeField
  value: string
  onChange: (value: string) => void
}) {
  const id = `field-${field.name}`
  
  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </Label>
        <Textarea
          id={id}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          rows={3}
        />
      </div>
    )
  }
  
  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {field.label}
          {field.required && <span className="ml-1 text-destructive">*</span>}
        </Label>
        <Select value={value || field.defaultValue} onValueChange={onChange}>
          <SelectTrigger id={id}>
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
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        type={field.type}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
    </div>
  )
}

export default function QRForm({ type, data, onChange }: QRFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{type.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{type.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {type.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={data[field.name] || ""}
            onChange={(value) => onChange(field.name, value)}
          />
        ))}
      </CardContent>
    </Card>
  )
}
