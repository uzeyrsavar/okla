'use client'

import { useEffect, useState } from "react"
import {
  MessageCircle,
  Star,
  User,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Edit3,
  Trash2,
  Send,
  MoreVertical
} from "lucide-react"
import { GetSchoolComments } from "@/app/lib/yorumlar"
import { yorumlarTypes } from "@/app/yorumTypes"




interface CommentSectionProps {
  schoolSıra:number,
}

export function CommentSection({ schoolSıra }: CommentSectionProps) {
  const [newRating, setNewRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [yorumlar, setYorumlar] = useState<yorumlarTypes[] | null>([])


  async function OkulYorumlarınıÇek(sıra:number) {
    const commentsData = await GetSchoolComments(sıra)

    if(commentsData){
      setYorumlar(commentsData)
    }else{
      alert('olmadı')
    }
  }

  useEffect(()=>{
    OkulYorumlarınıÇek(schoolSıra)
  },[schoolSıra])


  const renderStars = (count: number, size: "sm" | "md" | "lg" = "sm", interactive = false) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    }

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setNewRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-all duration-150 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= (interactive ? (hoverRating || newRating) : count)
                  ? 'text-accent fill-accent'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        Yorumlar
        <span className="text-sm font-normal text-muted-foreground ml-2">( yorum)</span>
      </h2>

      {/* Yorum Yazma Alanı */}
      <div className="mb-8 p-5 bg-secondary/30 rounded-xl border border-border/50">
        <div className="flex gap-4">
          {/* Kullanıcı Avatar */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
            <User className="w-6 h-6 text-primary" />
          </div>

          <div className="flex-1">
            {/* Yıldız Verme */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Değerlendirmeniz
              </label>
              <div className="flex items-center gap-3">
                {renderStars(newRating, "lg", true)}
                {newRating > 0 && (
                  <span className="text-sm text-muted-foreground animate-fade-in">
                    {newRating === 1 && "Çok Kötü"}
                    {newRating === 2 && "Kötü"}
                    {newRating === 3 && "Orta"}
                    {newRating === 4 && "İyi"}
                    {newRating === 5 && "Mükemmel"}
                  </span>
                )}
              </div>
            </div>

            {/* Yorum Textarea */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="textarea-field mb-4"
              rows={4}
              placeholder="Bu okul hakkında düşüncelerinizi paylaşın..."
            />

            {/* Gönder Butonu */}
            <div className="flex justify-end">
              <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5 focus-ring">
                <Send className="w-4 h-4" />
                Yorum Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Yorumlar Listesi */}
      <div className="space-y-4">

        {
          !yorumlar &&
          <div>Yorum Yok</div>
        }

        
        {
          yorumlar &&

        yorumlar.map((yorum, index) => (
          <div
            key={yorum.YORUM_ID}
            className="border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-200 hover:shadow-soft animate-fade-in-up"
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className="flex gap-4">
              {/* Kullanıcı Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                yorum.USER_METADATA.picture === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
              }`}>
                <User className={`w-6 h-6 ${
                  yorum.USER_METADATA.picture === 'primary' ? 'text-primary' : 'text-accent'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                {/* Kullanıcı Bilgisi ve Yıldızlar */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{yorum.USER_METADATA.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{yorum.YORUM_TARİH}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* {renderStars(yorum.yildiz)} */}
                    
                    {/* Dropdown Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === yorum.YORUM_ID ? null : yorum.YORUM_ID)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                      
                      {activeDropdown === yorum.YORUM_ID && (
                        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-medium py-1 z-10 min-w-[140px] animate-scale-in">
                          <button className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-secondary transition-colors text-foreground">
                            <Edit3 className="w-4 h-4" />
                            Düzenle
                          </button>
                          <button className="w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-secondary transition-colors text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Sil
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Yorum Metni */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {yorum.YORUM_METNİ}
                </p>

                {/* Aksiyon Butonları */}
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Beğen</span>
                    <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-md ml-1">
                      {yorum.YORUM_BEGENI_SAYISI}
                    </span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
                    <ThumbsDown className="w-4 h-4" />
                    <span>Beğenme</span>
                    <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-md ml-1">
                      {yorum.YORUM_REPORT_SAYISI}
                    </span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
                    <Flag className="w-4 h-4" />
                    <span>Raporla</span>
                  </button>

                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 ml-auto">
                    <Edit3 className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daha Fazla Yorum Yükle */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all duration-200">
          Daha Fazla Yorum Yükle
        </button>
      </div>
    </div>
  )
}
