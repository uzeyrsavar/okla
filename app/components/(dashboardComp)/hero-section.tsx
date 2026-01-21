"use client"

import { Button } from "@/app/components/ui"
import { ArrowRight, Search, Star, Users, School } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-8  duration-700">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Yeni: Okul karşılaştırma özelliği eklendi
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-in text-4xl sm:text-5xl lg:text-7xl font-bold font-serif text-foreground leading-tight mb-6  duration-700 delay-100 text-balance">
            Doğru okulu bulmak
            <span className="text-primary"> artık çok kolay</span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto  duration-700 delay-200 leading-relaxed text-pretty">
            Binlerce okul, gerçek deneyimler ve detaylı değerlendirmeler. 
            Geleceğiniz için en doğru kararı verin.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in relative max-w-2xl mx-auto mb-12  duration-700 delay-300">
            <div className="flex items-center bg-card border border-border rounded-2xl p-2 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Okul adı, şehir veya ilçe ara..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-3"
                />
              </div>
              <Button size="lg" className="px-8 rounded-xl transition-all duration-300 hover:scale-105"
              onClick={()=> router.push('/okullar')}>
                Ara
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-16  duration-700 delay-400">
            <Button size="lg" className="px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
              Ücretsiz Başla
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Nasıl Çalışır?
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12  duration-700 delay-500">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 hover:bg-card transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <School className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl lg:text-4xl font-bold text-foreground mb-1">15,000+</span>
              <span className="text-muted-foreground text-sm">Kayıtlı Okul</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 hover:bg-card transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <span className="text-3xl lg:text-4xl font-bold text-foreground mb-1">250,000+</span>
              <span className="text-muted-foreground text-sm">Değerlendirme</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 hover:bg-card transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl lg:text-4xl font-bold text-foreground mb-1">500,000+</span>
              <span className="text-muted-foreground text-sm">Aktif Kullanıcı</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
