'use client'

import { Info, MapPin, Building2, Hash, Award, Calendar, Phone, Mail, Globe } from "lucide-react"
import { schoolTypes } from "@/app/schoolType"

export interface SchoolInfoProps{
  schoolData: schoolTypes
}


export function SchoolInfo({ schoolData }: SchoolInfoProps) {
  const infoItems = [
    { label: "Okul Türü", value: schoolData.KURUM_TUR_ADI, icon: Building2 },
    { label: "İl", value: schoolData.IL_ADI, icon: MapPin },
    { label: "İlçe", value: schoolData.ILCE_ADI, icon: MapPin },
    { label: "Okul Kodu", value: schoolData.KURUM_SIRA, icon: Hash },
    { label: "Taban Puan", value: /* schoolData.PUAN ||  */"Belirtilmemiş", icon: Award },
    { label: "Kuruluş Yılı", value: "1964", icon: Calendar },
  ]

  const contactItems = [
    { label: "Telefon", value: "(312) 123 45 67", icon: Phone },
    { label: "E-posta", value: "info@ankarafenlisesi.k12.tr", icon: Mail },
    { label: "Web Sitesi", value: "www.ankarafenlisesi.k12.tr", icon: Globe },
  ]

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-soft animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Info className="w-5 h-5 text-primary" />
        </div>
        Okul Hakkında
      </h2>

      {/* Açıklama */}
      {/* schoolData.ACIKLAMA &&  */(
        <div className="mb-6 p-4 bg-secondary/30 rounded-xl border border-border/50">
          <p className="text-muted-foreground leading-relaxed">
            {/* {schoolData.ACIKLAMA} */}
          </p>
        </div>
      )}

      {/* Detay Bilgileri */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Okul Bilgileri */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            Okul Bilgileri
          </h3>
          {infoItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-2 bg-background rounded-lg group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* İletişim Bilgileri */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
            İletişim Bilgileri
          </h3>
          {contactItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="p-2 bg-background rounded-lg group-hover:bg-accent/10 transition-colors">
                <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}

          {/* Harita Placeholder */}
          <div className="mt-6 h-40 bg-secondary/50 rounded-xl border border-border/50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Harita yakında eklenecek</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
