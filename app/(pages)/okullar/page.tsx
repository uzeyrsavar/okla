import { Suspense } from 'react'
import OkulSearchClient from './OkulSearchClient'

// Metadata export ekleyin
export const metadata = {
  title: 'Okul Ara',
  description: 'Türkiye genelinde binlerce okul arasında arama yapın'
}

// Dynamic rendering aktif et
export const dynamic = 'force-dynamic'

export default function OkulSearchPage() {
  return (
    <Suspense fallback={<div className="loading-spinner"><div className="spinner"></div></div>}>
      <OkulSearchClient />
    </Suspense>
  )
}