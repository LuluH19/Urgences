'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Composant de la carte (chargé côté client uniquement)
function MapContent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

useEffect(() => {
  if (typeof window === 'undefined' || !mapRef.current) return

  const initMap = async () => {
    if (mapInstanceRef.current) return

    const L = (await import('leaflet')).default

    // Fix icons
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    // 🔑 IMPORTANT: reset Leaflet container
    ;(mapRef.current as any)._leaflet_id = null

    const map = L.map(mapRef.current).setView([48.8566, 2.3522], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    mapInstanceRef.current = map
  }

  initMap()

  return () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }
  }
}, [])


  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div 
        ref={mapRef} 
        className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg border-2 border-gray-300 shadow-md"
        aria-label="Carte interactive des hôpitaux"
      />
    </>
  )
}

// Export avec chargement dynamique (SSR désactivé)
const MapComponent = dynamic(() => Promise.resolve(MapContent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>
  )
})

export default MapComponent