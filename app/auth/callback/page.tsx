'use client'

import { useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      // 🔹 Supabase URL'deki hash'i alır, session'a çevirir
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        // 🔹 URL'deki #access_token'ı temizle
        window.history.replaceState({}, document.title, '/okullar')

        // 🔹 İstediğin sayfaya yönlendir
        router.replace('/okullar')
      } else {
        router.replace('/giris')
      }
    }

    handleAuth()
  }, [router])

  return <p>Giriş yapılıyor...</p>
}
