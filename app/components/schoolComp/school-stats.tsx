'use client'

import { Users, TrendingUp, Award, GraduationCap } from "lucide-react"
import { schoolTypes } from "@/app/schoolType"

interface SchoolStatsProps {
  schoolData: schoolTypes,
}

export function SchoolStats({ schoolData }: SchoolStatsProps) {
  const stats = [
    {
      label: "Kontenjan",
      value: schoolData.KURUM_TUR_KODU || 120,
      icon: Users,
      color: "primary",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      label: "Yerleşme Oranı",
      value: `%${98.5}`,
      icon: TrendingUp,
      color: "accent",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      label: "Taban Puan",
      value: /* schoolData.PUAN ||  */485.75,
      icon: Award,
      color: "warning",
      bgColor: "bg-warning/10",
      iconColor: "text-warning"
    },
    {
      label: "Başarı Sırası",
      value: "Top 10",
      icon: GraduationCap,
      color: "success",
      bgColor: "bg-success/10",
      iconColor: "text-success"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-card border border-border rounded-xl p-5 shadow-soft animate-fade-in-up card-hover stagger-${index + 1}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
