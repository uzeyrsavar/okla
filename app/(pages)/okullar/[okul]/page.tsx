'use client'

import { useEffect, useState } from "react"
import { SchoolHeader } from "@/app/components/schoolComp/school-header"
import { SchoolInfo } from "@/app//components/schoolComp/school-info"
import { SchoolStats } from "@/app//components/schoolComp/school-stats"
import { CommentSection } from "@/app//components/schoolComp/comment-section"
import { usePathname } from 'next/navigation'
import { FindSchoolOnSlug } from "@/app/lib/okul"

import { schoolTypes } from "@/app/schoolType"
import "./okul.css"

// Örnek okul verisi



type Props = {
  schoolData: schoolTypes | null
}
export default function OkulDetay() {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comments, setComments] = useState([])
  const pathname = usePathname()
  const schoolSlugUrl= pathname.split('/')[2]
  const [schoolData,setSchoolData] = useState<schoolTypes | null>(null)
  const [okulBulunamadı,setOkulBulunamadı] = useState(false)


  async function GetSchoolUrl(url:string){
    const School = await FindSchoolOnSlug(url)
    if(School){
        setSchoolData(School)
        setOkulBulunamadı(false)
        
    }else{
        console.log('Okul bulunamadı')
        setOkulBulunamadı(true)
    }
  }
  
  useEffect(()=>{
    GetSchoolUrl(schoolSlugUrl)
    
  },[pathname])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
  
  {/* Background decorative elements */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl" />
    <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
  </div>

  {/* Loading */}
  {
    !schoolData && !okulBulunamadı &&
    <div className="relative flex items-center justify-center h-screen text-muted-foreground text-lg">
      Okul Yükleniyor...
    </div>
  }

  {/* Not Found */}
  {
    okulBulunamadı &&
    <div className="relative flex flex-col items-center justify-center h-screen gap-4 text-center">
      <p className="text-xl font-semibold text-foreground">Okul Bulunamadı</p>
      <a
        href="/okullar"
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Geri Dön
      </a>
    </div>
  }

  {
    schoolData &&
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1 text-sm mb-8 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 w-fit shadow-sm animate-fade-in"
      >
        <a
          href="/"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
        >
          Ana Sayfa
        </a>
        <span className="text-muted-foreground/50">/</span>
        <a
          href="/okullar"
          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
        >
          Okullar
        </a>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground font-semibold px-2 py-1 bg-primary/10 rounded-lg text-primary">
          {schoolData.KURUM_ADI}
        </span>
      </nav>

      {/* Okul Başlık Bölümü */}
      <SchoolHeader
        schoolData={schoolData}
        isFavorited={isFavorited}
        isSaved={isSaved}
        onFavoriteToggle={() => setIsFavorited(!isFavorited)}
        onSaveToggle={() => setIsSaved(!isSaved)}
      />

      {/* İstatistikler */}
      <SchoolStats schoolData={schoolData} />

      {/* Okul Hakkında Detaylar */}
      <SchoolInfo schoolData={schoolData} />

      {/* Yorumlar Bölümü */}
      <CommentSection schoolSıra={schoolData.KURUM_SIRA} />
    </div>
  }
</div>


  )
}
