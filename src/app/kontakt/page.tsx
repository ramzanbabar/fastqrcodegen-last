"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, CheckCircle } from "lucide-react"

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          Kontakt 2026
        </Badge>
        <h1 className="text-3xl font-bold mb-4">
          Kontaktieren Sie uns
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Haben Sie Fragen, Anregungen oder Feedback? Wir freuen uns von Ihnen zu hören.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Nachricht gesendet!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.
              </p>
              <Button 
                onClick={() => setSubmitted(false)} 
                variant="outline" 
                className="mt-4"
              >
                Neue Nachricht senden
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Ihr Name" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ihre@email.de" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Betreff</Label>
                <Input 
                  id="subject" 
                  placeholder="Worum geht es?" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea 
                  id="message" 
                  placeholder="Ihre Nachricht an uns..."
                  rows={6}
                  required 
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Wird gesendet..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Nachricht senden
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">E-Mail</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              info@fastqrcodegen.online
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <svg className="h-8 w-8 text-primary mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <h3 className="font-semibold mb-1">Standort</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Berlin, Deutschland
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
