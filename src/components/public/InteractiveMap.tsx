'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { StrategicLocation, Umkm } from '@/types/db';
import Link from 'next/link';

// Custom Marker Icons
const createIcon = (color: string) => {
  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const icons = {
  pemerintahan: createIcon('#ef4444'), // Red
  umkm: createIcon('#3b82f6'),         // Blue
  default: createIcon('#10b981'),      // Green
};

interface InteractiveMapProps {
  locations?: StrategicLocation[];
  umkmData?: Umkm[];
  center?: [number, number];
  zoom?: number;
}

export default function InteractiveMap({
  locations = [],
  umkmData = [],
  center = [-7.726058, 109.969197], // Default to Surorejo coords
  zoom = 15,
}: InteractiveMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix Leaflet's default icon path issues in some Next.js setups (though we use DivIcon mostly)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center rounded-xl">
        <span className="text-neutral-400">Memuat Peta...</span>
      </div>
    );
  }

  const allMarkers = [
    ...locations.map(loc => ({
      id: `loc-${loc.id}`,
      position: [loc.latitude, loc.longitude] as [number, number],
      title: loc.name,
      description: loc.description,
      icon: loc.category === 'pemerintahan' ? icons.pemerintahan : icons.default,
      link: null,
    })),
    ...umkmData
      .filter(u => u.latitude && u.longitude)
      .map(u => ({
        id: `umkm-${u.id}`,
        position: [u.latitude!, u.longitude!] as [number, number],
        title: u.name,
        description: u.category,
        icon: icons.umkm,
        link: `/umkm/${u.slug}`,
      })),
  ];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-neutral-200 z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} // Prevent accidental zooming on mobile scroll
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {allMarkers.map((marker) => (
          <Marker 
            key={marker.id} 
            position={marker.position} 
            icon={marker.icon}
          >
            <Popup className="rounded-xl">
              <div className="p-1 min-w-[150px]">
                <h4 className="font-bold text-neutral-900 mb-1">{marker.title}</h4>
                <p className="text-xs text-neutral-500 mb-2">{marker.description}</p>
                {marker.link && (
                  <Link 
                    href={marker.link}
                    className="inline-block text-xs font-medium text-primary-600 hover:text-primary-700"
                  >
                    Lihat Detail &rarr;
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
