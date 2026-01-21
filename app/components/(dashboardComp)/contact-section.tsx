"use client"

import React from "react"
import { useState } from "react"
import { Button, Input, Textarea, Label } from "@/app/components/ui"
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section
      id="iletisim"
      className="py-20 lg:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Iletisim
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-6 text-balance">
              Bizimle iletisime gecin
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-pretty">
              Sorulariniz, onerileriniz veya geri bildirimleriniz icin bize ulasabilirsiniz. En kisa surede size donus yapacagiz.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">E-posta</div>
                  <div className="text-muted-foreground">destek@okla.com.tr</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Canli Destek</div>
                  <div className="text-muted-foreground">Hafta ici 09:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 rounded-3xl bg-card border border-border shadow-xl shadow-primary/5"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      placeholder="Adiniz"
                      className="rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@mail.com"
                      className="rounded-xl h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Konu</Label>
                  <Input
                    id="subject"
                    placeholder="Mesajinizin konusu"
                    className="rounded-xl h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mesaj</Label>
                  <Textarea
                    id="message"
                    placeholder="Mesajinizi buraya yazin..."
                    className="rounded-xl min-h-32 resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl h-12 text-base font-medium transition-all duration-300 hover:scale-[1.02]"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Gonderildi!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Gonder
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
