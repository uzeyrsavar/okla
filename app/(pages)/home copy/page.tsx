'use client'

import React, { useState, useEffect } from 'react';
import { 
  Search, Star, TrendingUp, MessageSquare, Calculator, 
  History, ArrowRight, MapPin, Filter, Bell, 
  User, Bookmark, Compass, Sparkles, ChevronRight
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { Session, UserMetadata } from '@supabase/supabase-js';

const IL_LISTESI = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']; // Örnek kısa liste

const OklaHomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [user,setUser] = useState<UserMetadata | null>([])
  const [userName , setUserName] = useState()
  const [userPicture, setUserPicture] = useState(null)
  const [userEmail , setUserEmail] = useState()


  async function getUser() {
    const { data: { subscription } } =
    supabase.auth.onAuthStateChange((_, session) => {
      if (!session?.user) {
        window.location.href = '/giris'
      }if(session){
        const name =
        session.user.user_metadata?.name ||
        session.user.user_metadata?.full_name ||
        session.user.email

      setUserName(name)

      const user = session.user.user_metadata
      setUser(user)
      }

      
    })

  return () => subscription.unsubscribe()
  }

    useEffect(() => {
  

  getUser()
}, [])


  // Scroll takibi (Header efekti için)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    {
      title: 'Okul Bul',
      desc: 'Hayalindeki okulu keşfet',
      icon: <Compass className="w-6 h-6" />,
      color: 'bg-blue-500',
      size: 'col-span-2 row-span-2',
      image: '/oklaSchoolPng.png',
      href: '/okullar'
    },
    {
      title: 'Puanla',
      desc: 'Deneyimini paylaş',
      icon: <Star className="w-5 h-5" />,
      color: 'bg-amber-500',
      size: 'col-span-1 row-span-1',
      image: '/oklaStar.png',
      href: '/okullar'
    },
    {
      title: 'Karşılaştır',
      desc: 'En iyisini seç',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-indigo-500',
      size: 'col-span-1 row-span-1',
      image: '/oklaTartı.png',
      href: '/okullar'
    },
    {
      title: 'Okla Kit',
      desc: 'Araçlar & Rehberler',
      icon: <Calculator className="w-5 h-5" />,
      color: 'bg-rose-500',
      size: 'col-span-2 row-span-1',
      image: '/oklaHesap.png',
      href: '/okullar'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg group-hover:rotate-6 transition-transform">
                <span className="font-bold text-lg">o</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-indigo-950">okla</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">Keşfet</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Topluluk</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Rehber</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-900">{userName}</p>
                <p className="text-[10px] text-slate-500">Öğrenci</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arda" alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        {/* Welcome Section & Search */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                Selam {userName}! <span className="animate-bounce">👋</span>
              </h1>
              <p className="text-slate-500 mt-1">Bugün geleceğin için harika bir okul bulalım.</p>
            </div>

            {/* Compact Search Bar */}
            <div className="relative group w-full md:w-96">
              <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl flex items-center px-4 py-3 shadow-sm group-focus-within:border-indigo-500 transition-all">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Okul veya şehir ara..." 
                  className="bg-transparent border-none outline-none flex-1 px-3 text-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-full md:h-[400px]">
          {quickActions.map((item, idx) => (
             <div 
              key={idx}
              className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 cursor-pointer
                ${item.size} ${item.image ? 'text-white' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5'}`}
            >
                <a href={`${item.href}`}>
              {item.image && (
                <div className="absolute inset-0 z-0">
                  <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
              )}
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-lg ${item.color} text-white`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${!item.image && 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm ${item.image ? 'text-slate-200' : 'text-slate-500'}`}>{item.desc}</p>
                </div>
              </div>

              {!item.image && (
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <ArrowRight className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                </div>
              )}
            
            </a>
            </div>
            
          ))}

        </div>

        {/* Trending / Recommended Section (Replaces Stats) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Trending Schools */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Popüler Okullar
              </h2>
              <button className="text-sm font-semibold text-indigo-600 hover:underline">Tümünü Gör</button>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="group bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-indigo-200 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">İstanbul Erkek Lisesi</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Fatih, İstanbul
                      </span>
                      <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> 4.9
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Activity / Tips Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Hızlı Erişim</h2>
            <div className="bg-indigo-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <h4 className="text-lg font-bold mb-2">Okla Rehber 📚</h4>
               <p className="text-indigo-100 text-sm mb-4">LGS tercihleri yaparken nelere dikkat etmelisin?</p>
               <button className="w-full py-3 bg-white text-indigo-900 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                 Hemen Oku
               </button>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-6">
               <h4 className="font-bold mb-4">Son Aramaların</h4>
               <div className="space-y-4">
                 {['Ankara Fen', 'İzmir Atatürk Lisesi'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm text-slate-600 hover:text-indigo-600 cursor-pointer group">
                     <History className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                     {item}
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 bg-slate-400 rounded-lg flex items-center justify-center text-white text-xs">o</div>
            <span className="font-bold">okla</span>
            <span className="text-sm text-slate-500 ml-4">© 2026 Tüm hakları saklıdır.</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Yardım</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OklaHomePage;