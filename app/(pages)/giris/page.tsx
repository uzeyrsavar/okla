'use client'

import { useState } from 'react'
import { login } from '@/app/lib/auth' 
import { loginOnGoogle } from '@/app/lib/auth'

import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await login(email, password)
      alert('Giriş başarılı')
      router.push('/okullar')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleGoogle = async () =>{
    try {
        await loginOnGoogle()
        router.push('/okullar')
    }catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div>

        <button onClick={handleGoogle}>loginOnGoogle</button>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Şifre"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Giriş Yap</button>

      {error && <p>{error}</p>}
    </div>
  )
}
