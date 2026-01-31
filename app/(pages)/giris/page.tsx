export const dynamic = 'force-dynamic'


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mail, Lock, User, ArrowRight, Github, 
  Chrome, ChevronLeft, AlertCircle, Eye, EyeOff 
} from 'lucide-react';
import {  getCurrentUser, login, loginOnGoogle } from '@/app/lib/auth';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/app/lib/supabase';

// lib/auth içerisindeki fonksiyonlarını import ettiğini varsayıyorum
// import { login, loginOnGoogle, register } from '@/app/lib/auth'; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)



 useEffect(() => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      router.replace('/home')
    }
  })

  return () => subscription.unsubscribe()
}, [])


  const handleAction = async (e:any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        console.log("Giriş yapılıyor:", formData.email);
      } else {
        // await register(formData.firstName, formData.lastName, formData.email, formData.password);
        console.log("Kayıt olunuyor:", formData.firstName, formData.lastName);
      }
      router.push('/home');
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin. login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginOnGoogle();
      router.push('/home');
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin. handle google');
    }
  };


  if (loading) return <div>Yükleniyor...</div>
  


  if(!session)
    return (
  
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      {/* Arka Plan Süslemeleri */}
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        {/* Logo Bölümü */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-4">
            <span className="font-bold text-xl">OkLa</span>
          </div>
          <h1 className="text-2xl font-extrabold text-indigo-950 tracking-tight">
            {isLogin ? 'Tekrar Hoş Geldin!' : 'Aramıza Katıl'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Eğitim yolculuğuna kaldığın yerden devam et.' : 'Hayalindeki okulu bulmak için ilk adımı at.'}
          </p>
        </div>

        {/* Ana Kart */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-8 md:p-10">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleAction} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">İsim</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text"
                      required
                      placeholder="Arda"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Soyisim</label>
                  <div className="relative group">
                    <input 
                      type="text"
                      required
                      placeholder="Yılmaz"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 ml-1">E-posta Adresi</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="email"
                  required
                  placeholder="arda@örnek.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-slate-700">Şifre</label>
                {isLogin && (
                  <button type="button" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700">
                    Şifremi Unuttum
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center gap-2 px-1">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={e => setFormData({...formData, rememberMe: e.target.checked})}
                />
                <label htmlFor="remember" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Beni Hatırla
                </label>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
            >
              {isLoading ? 'İşlem yapılıyor...' : (isLogin ? 'Giriş Yap' : 'Hesap Oluştur')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-medium">Veya</span></div>
          </div>

          <button 
            onClick={handleGoogle}
            className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            Google ile devam et
          </button>
        </div>

        {/* Alt Değiştirme Linki */}
        <p className="text-center mt-8 text-sm text-slate-500">
          {isLogin ? "Henüz bir hesabın yok mu?" : "Zaten üye misin?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-bold hover:underline"
          >
            {isLogin ? 'Hemen Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>

    
  );
}