'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { StrategicLocation } from '@/types/db';

// Custom Marker Icon khusus Pusat Pemerintahan / Balai Desa
const createCivicIcon = (color: string) => {
  return new L.DivIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, ${color}, #b91c1c);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3.5px solid white;
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    className: 'custom-civic-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

const defaultIcon = new L.DivIcon({
  html: `
    <div style="
      background-color: #10b981;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
    </div>
  `,
  className: 'custom-default-icon',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -11],
});

interface BoundaryMapProps {
  locations?: StrategicLocation[];
  center?: [number, number];
  zoom?: number;
}

export default function BoundaryMap({
  locations = [],
  center = [-7.7695, 109.9814], // Titik Pusat Desa Surorejo
  zoom = 14, // Zoom sedikit lebih meluas agar batas tetangga kelihatan
}: BoundaryMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center rounded-2xl">
        <span className="text-neutral-400 font-medium">Memuat Peta Batas Wilayah...</span>
      </div>
    );
  }

  // Hanya ambil fasilitas pemerintahan & strategis desa untuk profil wilayah
  const civicLocations = locations.filter(
    (loc) => loc.category === 'pemerintahan' || loc.category === 'ibadah'
  );

  // Jika tidak ada data di DB, berikan fallback pin Kantor Desa Surorejo
  const displayMarkers = civicLocations.length > 0 ? civicLocations.map(loc => ({
    id: `loc-${loc.id}`,
    position: [loc.latitude, loc.longitude] as [number, number],
    title: loc.name,
    description: loc.description || 'Pusat Fasilitas Desa Surorejo',
    isCivic: loc.category === 'pemerintahan',
  })) : [
    {
      id: 'default-center',
      position: center,
      title: 'Balai Desa Surorejo',
      description: 'Pusat Pemerintahan & Administrasi Desa Surorejo, Kec. Butuh, Kab. Purworejo',
      isCivic: true,
    }
  ];

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm border border-neutral-200 z-0">
      {/* Badge Overlay di atas peta */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 text-neutral-900 px-4 py-2 rounded-xl shadow-lg border border-neutral-200 flex items-center gap-2 pointer-events-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
        </span>
        <span className="text-xs sm:text-sm font-bold">Peta Wilayah & Pusat Pemerintahan</span>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {displayMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.isCivic ? createCivicIcon('#ef4444') : defaultIcon}
          >
            <Popup className="rounded-xl">
              <div className="p-1 min-w-[170px]">
                <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase bg-red-50 px-2 py-0.5 rounded border border-red-200 mb-1 inline-block">
                  {marker.isCivic ? 'Pemerintahan Desa' : 'Fasilitas Desa'}
                </span>
                <h4 className="font-extrabold text-neutral-900 text-sm mb-1">{marker.title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
