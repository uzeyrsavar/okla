'use client'
export const dynamic = 'force-dynamic'
import React, { useCallback, useEffect, useState } from "react"
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { okulAra } from '@/app/lib/okul'
import { useRouter } from 'next/navigation'
import './okul-search.css'

import { Session, UserMetadata } from "@supabase/supabase-js"
import { Metadata } from "next"




// İl listesi (örnek)
const IL_LISTESI = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
  'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta',
  'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla',
  'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
  'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van',
  'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
  'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
]

// Okul türleri
const OKUL_TURLERI = [
  'İlkokul',
  'Ortaokul',
  'Anadolu Lisesi',
  'Fen Lisesi',
  'Sosyal Bilimler Lisesi',
  'Mesleki ve Teknik Anadolu Lisesi',
  'İmam Hatip Lisesi',
  'Güzel Sanatlar Lisesi',
  'Spor Lisesi'
]

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
)

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const SchoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="64" height="64">
    <path d="M14 22v-4a2 2 0 1 0-4 0v4"/>
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/>
    <path d="M18 5v17"/>
    <path d="m4 6 8-4 8 4"/>
    <path d="M6 5v17"/>
    <circle cx="12" cy="9" r="2"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="m6 9 6 6 6-6"/>
  </svg>
)



interface Filters {
  text: string
  il: string
  ilce: string
  tur: string
}

interface Okul {
  id: string
  slug: string
  KURUM_ADI: string
  IL_ADI: string
  ILCE_ADI: string
  KURUM_TUR_ADI: string
}

 



const Loading = () => null

export default function OkulSearchPage() {
  const [filters, setFilters] = useState<Filters>({
    text: '',
    il: '',
    ilce: '',
    tur: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<Okul[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [user,setUser] = useState<UserMetadata| null>()

  const router = useRouter()
  const searchParams = useSearchParams()


    
   

  // Veri cekme fonksiyonu
  const fetchData = useCallback(async (reset = false) => {
    setLoading(true)

    try {
      const res = await okulAra({
        ...filters,
        page: reset ? 1 : page,
      })

      if (res) {
        setResults(prev =>
          reset
            ? (res.data?.map((item: any, idx: number) => ({
                id: item.id ?? `${item.slug ?? ''}-${idx}`,
                ...item,
              })) || [])
            : [
                ...prev,
                ...(res.data?.map((item: any, idx: number) => ({
                  id: item.id ?? `${item.slug ?? ''}-${prev.length + idx}`,
                  ...item,
                })) || []),
              ]
        )
        setTotalPages(res.totalPages || 0)
        setTotalCount(res.total || 0)
      }
    } catch (error) {
      console.error('Arama hatasi:', error)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }, [filters, page])

  // Filtre degistiginde sayfa sifirla
  useEffect(() => {
    setPage(1)
  }, [filters])

  // Sayfa degistiginde veri cek
  useEffect(() => {
    fetchData(page === 1)
  }, [page, fetchData])

  // Arama butonuna tiklandiginda
  const handleSearch = () => {
    setPage(1)
    fetchData(true)
  }

  // Enter tusu ile arama
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Filtre degisikligi
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const hasMore = page < totalPages

  return (
    <Suspense fallback={<Loading />}>
      <div className="search-page">
        <div className="search-container">
          {/* Header */}
          <div className="search-header">
            <h1>Okul Ara</h1>
            <p>Turkiye genelinde binlerce okul arasinda arama yapin</p>
          </div>

          {/* Search Box */}
          <div className="search-box">
            <div className="search-main">
              <div className="search-input-wrapper">
                <SearchIcon />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Okul adi yazin..."
                  value={filters.text}
                  onChange={e => handleFilterChange('text', e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button className="search-btn" onClick={handleSearch} disabled={loading}>
                <SearchIcon />
                Ara
              </button>
            </div>

            {/* Filters Toggle */}
            <button 
              className="filters-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon />
              Filtreler
              <ChevronDownIcon />
            </button>

            {/* Filters Grid */}
            {showFilters && (
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Il</label>
                  <select
                    className="filter-select"
                    value={filters.il}
                    onChange={e => handleFilterChange('il', e.target.value)}
                  >
                    <option value="">Tum iller</option>
                    {IL_LISTESI.map(il => (
                      <option key={il} value={il}>{il}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Ilce</label>
                  <input
                    type="text"
                    className="filter-select"
                    placeholder="Ilce yazin..."
                    value={filters.ilce}
                    onChange={e => handleFilterChange('ilce', e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label>Okul Turu</label>
                  <select
                    className="filter-select"
                    value={filters.tur}
                    onChange={e => handleFilterChange('tur', e.target.value)}
                  >
                    <option value="">Tum turler</option>
                    {OKUL_TURLERI.map(tur => (
                      <option key={tur} value={tur}>{tur}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          {!initialLoad && (
            <div className="results-info">
              <p className="results-count">
                <span>{totalCount}</span> okul bulundu
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && results.length === 0 && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && results.length === 0 && !initialLoad && (
            <div className="empty-state">
              <SchoolIcon />
              <h3>Sonuc bulunamadi</h3>
              <p>Arama kriterlerinize uygun okul bulunamadi. Farkli filtreler deneyin.</p>
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 && (
            <div className="results-grid">
              {results.map(okul => (
                <button
                  key={okul.id}
                  className="school-card"
                  onClick={() => router.push(`/okullar/${okul.slug}`)}
                >
                  <div className="school-card-header">
                    <h3 className="school-name">{okul.KURUM_ADI}</h3>
                    <span className="school-type-badge">{okul.KURUM_TUR_ADI}</span>
                  </div>
                  <div className="school-location">
                    <MapPinIcon />
                    <span>{okul.IL_ADI} / {okul.ILCE_ADI}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="load-more-wrapper">
              <button
                className="load-more-btn"
                disabled={loading}
                onClick={() => setPage(p => p + 1)}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
                    Yukleniyor...
                  </>
                ) : (
                  'Daha fazla goster'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}
