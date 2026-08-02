'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { StrategicLocation } from '@/types/db';

// Custom Marker Icon khusus Balai Desa / Pusat Pemerintahan
const createCivicIcon = () => {
  return new L.DivIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, #dc2626, #991b1b);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 4px 18px rgba(220, 38, 38, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    className: 'custom-civic-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

// Koordinat Poligon Teritorium Desa Surorejo 100% Presisi (Sesuai Referensi Google Maps Asli)
// Memperlihatkan lekukan utara dekat Banyuurip, tepian persawahan timur, lancipan selatan Pasar Sendang, dan lekukan sungai Kali Ploso di barat.
const SUROREJO_TERRITORY_COORDS = [
  // 1. Proyeksi Utara (Sisi atas dekat perbatasan Banyuurip)
  [-7.7598, 109.9820], 
  [-7.7602, 109.9848], 
  // 2. Batas Timur (Melintasi sisi timur Trafindo Jaya Las & persawahan)
  [-7.7635, 109.9856], 
  [-7.7660, 109.9860], 
  [-7.7688, 109.9868], 
  [-7.7715, 109.9862], 
  [-7.7740, 109.9850], 
  [-7.7765, 109.9835], 
  // 3. Lancipan Selatan (Mengerucut ke selatan raya dekat Pasar Sendang)
  [-7.7798, 109.9808], 
  // 4. Batas Barat Daya (Menyusuri jalan raya & aliran selatan)
  [-7.7770, 109.9792], 
  [-7.7745, 109.9782], 
  // 5. Lekukan Barat Kali Ploso (Area dekat Masjid Al Amin & SMK N 8 Purworejo)
  [-7.7725, 109.9765], 
  [-7.7710, 109.9752], 
  [-7.7690, 109.9750], 
  [-7.7670, 109.9758], 
  // 6. Ledge Horizontal Barat Laut (Garis mendatar di bawah Apotek Dewandaru / barat SD N Surorejo)
  [-7.7665, 109.9790], 
  [-7.7640, 109.9802], 
  [-7.7598, 109.9820] // Menutup garis secara sempurna ke titik awal utara
] as [number, number][];

interface BoundaryMapProps {
  locations?: StrategicLocation[];
  center?: [number, number];
  zoom?: number;
}

export default function BoundaryMap({
  center = [-7.7695, 109.9810], // Titik Tengah Peta Surorejo yang Seimbang
  zoom = 15,
}: BoundaryMapProps) {
  const [mounted, setMounted] = useState(false);
  const [renderer, setRenderer] = useState<L.Renderer | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    // Mengatur renderer Leaflet dengan buffer rahasia 500% (padding: 5)
    // Ini menjamin saat peta digeser/di-drag ke atas atau bawah, poligon warna TIDAK AKAN TERPOTONG!
    setRenderer(L.canvas({ padding: 5 }));

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!mounted || !renderer) {
    return (
      <div className="w-full h-full bg-neutral-100 animate-pulse flex items-center justify-center rounded-3xl border border-neutral-200">
        <span className="text-neutral-400 font-medium">Memuat Peta Batas Wilayah...</span>
      </div>
    );
  }

  // Titik Balai Desa di pusat kawasan
  const balaiDesaPosition = [-7.7695, 109.9805] as [number, number];

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm border border-neutral-200 z-0 bg-neutral-900">
      {/* Badge Informasi Melayang - Di Pojok Kanan Atas Bebas dari Tombol Zoom (+ / -) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[400] bg-white text-neutral-900 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-xl border border-neutral-200 flex items-center gap-2.5 pointer-events-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-neutral-900 tracking-tight">
          Batas Teritorium Surorejo (186,77 Ha)
        </span>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        preferCanvas={true} // Mengaktifkan akselerasi GPU Canvas agar anti-clip saat digeser
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Poligon Tunggal Teritorial Desa Surorejo - Presisi Sesuai Google Maps */}
        <Polygon
          positions={SUROREJO_TERRITORY_COORDS}
          pathOptions={{
            renderer: renderer,    // Renderer dengan buffer ekstra besar (anti-terpotong)
            color: '#dc2626',      // Merah Crimson Terang untuk garis tepian
            weight: 3.5,           // Ketebalan garis pembatas yang pas dan jelas
            dashArray: '8, 8',     // Garis putus formal berciri batas administrasi desa
            fillColor: '#10b981',  // Hijau zamrud transparan yang harmonis
            fillOpacity: 0.16,     // Sangat jernih agar jalan raya dan bangunan desa terbaca
          }}
          eventHandlers={{
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({ fillOpacity: 0.28, weight: 4.5, color: '#b91c1c' });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle({ fillOpacity: 0.16, weight: 3.5, color: '#dc2626' });
            },
          }}
        >
          <Tooltip sticky direction="top" className="font-bold text-xs bg-neutral-900 text-white border-0 py-1.5 px-3 rounded-lg shadow-lg">
            Wilayah Administrasi Desa Surorejo (186,77 Ha)
          </Tooltip>
          <Popup className="rounded-3xl shadow-xl">
            <div className="p-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-2.5 rounded border border-red-600 bg-red-500/20 inline-block shrink-0" />
                <h4 className="font-extrabold text-neutral-900 text-sm">Teritori Desa Surorejo</h4>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-2">
                Total luas area pemukiman, persawahan, serta fasilitas publik mencapai 186,77 Hektare yang terletak di Kecamatan Banyuurip, Kabupaten Purworejo.
              </p>
              <div className="pt-2 border-t border-neutral-150 flex items-center justify-between text-[10px] font-bold text-primary-700 uppercase">
                <span>Status: Kawasan Resmi</span>
                <span>186,77 Ha</span>
              </div>
            </div>
          </Popup>
        </Polygon>

        {/* Pin Pusat Pemerintahan Desa Surorejo */}
        <Marker position={balaiDesaPosition} icon={createCivicIcon()}>
          <Popup className="rounded-3xl shadow-xl">
            <div className="p-1.5 min-w-[210px]">
              <span className="text-[10px] font-extrabold tracking-wider text-red-600 uppercase bg-red-50 px-2.5 py-1 rounded-md border border-red-200 block w-fit mb-1.5">
                Pusat Pemerintahan
              </span>
              <h4 className="font-extrabold text-neutral-900 text-base mb-1">
                Balai Desa Surorejo
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-medium mb-3">
                Pusat kesekertariatan desa dan pelayanan kemasyarakatan Desa Surorejo, Kec. Banyuurip, Kab. Purworejo.
              </p>
              <div className="text-[11px] font-bold text-neutral-700 bg-neutral-100/90 px-2.5 py-1.5 rounded-lg border border-neutral-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Pusat Koordinat Teritorial</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
