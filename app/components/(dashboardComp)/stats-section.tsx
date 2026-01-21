"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 15000, suffix: "+", label: "Kayitli Okul", description: "Turkiye genelinde" },
  { value: 81, suffix: "", label: "Il", description: "Tum sehirlerden" },
  { value: 250, suffix: "K+", label: "Degerlendirme", description: "Gercek kullanicilardan" },
  { value: 98, suffix: "%", label: "Memnuniyet", description: "Kullanici memnuniyeti" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("tr-TR")}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section id="veriler" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Rakamlarla OKLA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foreground mb-6 text-balance">
            Turkiye&apos;nin en buyuk okul veritabani
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Her gun buyuyen topluluğumuzla birlikte egitim dunyasina isik tutuyoruz
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative p-8 rounded-2xl bg-card border border-border text-center hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 lg:mt-20 p-8 lg:p-12 rounded-3xl bg-primary/5 border border-primary/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Guvenilir ve Seffaf
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Tum degerlendirmeler gercek kullanicilar tarafindan yapilmakta ve dogrulanmaktadir.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">SSL</div>
                <div className="text-xs text-muted-foreground">Guvenli Baglanti</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">KVKK</div>
                <div className="text-xs text-muted-foreground">Uyumlu</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7/24</div>
                <div className="text-xs text-muted-foreground">Destek</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
