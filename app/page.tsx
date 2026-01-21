'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div>
      Hoşgeldiniz
      <button onClick={()=> router.push('/giris')}>Giriş Yap</button>
    </div>
  );
}
