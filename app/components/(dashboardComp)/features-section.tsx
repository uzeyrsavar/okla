"use client"

import { 
  Search, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Sparkles, 
  MapPin 
} from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Akilli Arama",
    description: "Sehir, ilce, okul turu ve puan araligina gore filtreleyerek aradiginiz okulu kolayca bulun.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageSquare,
    title: "Gercek Yorumlar",
    description: "Ogrenci ve velilerden gelen dogrulanmis yorumlarla okullar hakkinda gercek bilgi edinin.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BarChart3,
    title: "Detayli Karsilastirma",
    description: "Okullari yan yana karsilastirin, puanlari ve ozellikleri detayli analiz edin.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Shield,
    title: "Guvenilir Veriler",
    description: "MEB verileri ve kullanici degerlendirmeleriyle desteklenen guvenilir bilgi kaynagi.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "Kisisellestirilmis Oneriler",
    description: "Tercihlerinize gore size en uygun okullari yapay zeka destekli onerilerle kesfedin.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    title: "Konum Bazli Arama",
    description: "Bulundugunuz konuma en yakin okullari harita uzerinde goruntueleyin.",
    color: "bg-chart-3/10 text-chart-3",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="ozellikler"
      className="py-20 lg:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Ozellikler
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-6 text-balance">
            Her sey tek platformda
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            OKLA ile dogru okulu bulmak icin ihtiyaciniz olan tum araclar elinizin altinda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
