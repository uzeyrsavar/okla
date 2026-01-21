'use client'

import { Heart, Bookmark, MapPin, Building2, Star } from "lucide-react"
import { schoolTypes } from "@/app/schoolType"

interface SchoolHeaderProps {
  schoolData: schoolTypes,
  isFavorited: boolean,
  isSaved: boolean,
  onFavoriteToggle: () => void,
  onSaveToggle: () => void
}

export function SchoolHeader({
  schoolData,
  isFavorited,
  isSaved,
  onFavoriteToggle,
  onSaveToggle
}: SchoolHeaderProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6 shadow-soft animate-fade-in-up card-hover">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div className="flex-1">
          {/* Okul Türü Badge */}
          <div className="mb-3">
            <span className="badge badge-primary">
              {schoolData.KURUM_TUR_ADI}
            </span>
          </div>
          
          {/* Okul Adı */}
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            {schoolData.KURUM_ADI}
          </h1>
          
          {/* Konum ve Tür Bilgileri */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{schoolData.IL_ADI} / {schoolData.ILCE_ADI}</span>
            </span>
            <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg">
              <Building2 className="w-4 h-4 text-primary" />
              <span>{schoolData.KURUM_TUR_ADI}</span>
            </span>
          </div>
        </div>
        
        {/* Aksiyon Butonları */}
        <div className="flex gap-3">
          <button
            onClick={onFavoriteToggle}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 focus-ring ${
              isFavorited
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? 'Favorilerde' : 'Favorilere Ekle'}
          </button>
          <button
            onClick={onSaveToggle}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 focus-ring ${
              isSaved
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Kaydedildi' : 'Kaydet'}
          </button>
        </div>
      </div>

      {/* Puan ve Okul Kodu Bilgisi */}
      <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-border">
        <div className="flex items-center gap-3 bg-accent/10 px-4 py-2.5 rounded-xl">
          <div className="p-2 bg-accent/20 rounded-lg">
            <Star className="w-6 h-6 text-accent fill-accent" />
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">{schoolData.KURUM_TUR_KODU || 'N/A'}</span>
            <span className="text-sm text-muted-foreground ml-2">Taban Puan</span>
          </div>
        </div>
        
        <div className="h-10 w-px bg-border hidden sm:block" />
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Okul Kodu:</span>
          <span className="bg-secondary px-3 py-1 rounded-lg font-mono">{schoolData.KURUM_SIRA}</span>
        </div>
      </div>
    </div>
  )
}
