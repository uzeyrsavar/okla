'use client'

import { useRouter } from "next/navigation"
import { supabase } from "./lib/supabase"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data?.user) {
        router.replace('/home')
      } else {
        router.replace('/dashboard')
      }

      setLoading(false)
    }

    checkUser()
  }, [])

  if (loading) return <div>Yükleniyor...</div>

  return null
}
