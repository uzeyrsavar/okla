"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ayse Yilmaz",
    role: "Veli",
    location: "Istanbul",
    rating: 5,
    comment: "Cocugum icin en uygun okulu bulmamda cok yardimci oldu. Diger velilerin yorumlari gercekten degerli bilgiler sunuyor.",
    avatar: "AY",
  },
  {
    name: "Mehmet Kaya",
    role: "Ogrenci",
    location: "Ankara",
    rating: 5,
    comment: "Universite tercihlerimi yaparken OKLA'daki yorumlar sayesinde dogru karar verdim. Gercek deneyimleri okumak cok faydali.",
    avatar: "MK",
  },
  {
    name: "Fatma Demir",
    role: "Veli",
    location: "Izmir",
    rating: 5,
    comment: "Okullari karsilastirma ozelligi muhtesem. Her detayi yan yana gorebilmek karar verme surecini cok kolaylastirdi.",
    avatar: "FD",
  },
  {
    name: "Ali Ozturk",
    role: "Ogretmen",
    location: "Bursa",
    rating: 4,
    comment: "Platform olarak cok basarili. Ogretmen olarak da velilere oneriyorum. Seffaf ve guvenilir bir kaynak.",
    avatar: "AO",
  },
  {
    name: "Zeynep Arslan",
    role: "Veli",
    location: "Antalya",
    rating: 5,
    comment: "3 cocugum var ve her biri icin farkli okul arastirdim. OKLA olmasa bu kadar detayli bilgiye ulasamazdim.",
    avatar: "ZA",
  },
  {
    name: "Can Yildiz",
    role: "Ogrenci",
    location: "Konya",
    rating: 5,
    comment: "Lise seciminde cok stresliydim ama yorumlari okuduktan sonra rahatlıkla karar verdim. Tesekkurler OKLA!",
    avatar: "CY",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="yorumlar"
      className="py-20 lg:py-32 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Kullanici Yorumlari
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-6 text-balance">
            Kullanicilarimiz ne diyor?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Binlerce veli ve ogrenci OKLA ile dogru okulu buldu
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} - {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
