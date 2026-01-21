"use client"

import { Button } from "@/app/components/ui"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 lg:p-16 text-center">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Hemen baslayin
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-primary-foreground mb-6 text-balance">
              Dogru okulu bulmaya hazir misiniz?
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-pretty">
              Binlerce aile OKLA ile cocuklari icin en uygun okulu buldu. Simdi sira sizde!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105"
              >
                Ucretsiz Hesap Olustur
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-medium rounded-xl border-white/20 text-primary-foreground hover:bg-white/10 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Demo Izle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
