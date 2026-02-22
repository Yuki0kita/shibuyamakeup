"use client";

import { useEffect, useRef, useState } from "react";
import { X, Navigation, MapPin } from "lucide-react";
import { SPOTS } from "@/lib/mockData";
import { RecoveryIcon } from "@/components/RecoveryIcon";
import type { Spot } from "@/types";

interface MapScreenProps {
  initialSpot?: Spot;
  onSelectSpot: (spot: Spot) => void;
  onClose: () => void;
}

const LV_COLOR: Record<number, string> = {
  1: "#B5B0A8",
  2: "#8FA8B8",
  3: "#C8956C",
};

const LV_EMOJI: Record<number, string> = {
  1: "🧻",
  2: "🪞",
  3: "👑",
};

export function MapScreen({ initialSpot, onSelectSpot, onClose }: MapScreenProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(
    initialSpot ?? null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    let isMounted = true;

    (async () => {
      const L = (await import("leaflet")).default;

      // Fix default marker icon path issue with Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
      });

      if (!mapRef.current || mapInstance.current || !isMounted) return;

      const centerLat = initialSpot?.lat ?? 35.6595;
      const centerLng = initialSpot?.lng ?? 139.7005;

      const map = L.map(mapRef.current, {
        center: [centerLat, centerLng],
        zoom: 15,
        zoomControl: false,
      });

      // OpenStreetMap tiles - same as Colab/Folium
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Zoom control - bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Add markers
      SPOTS.filter((s) => s.is_active).forEach((spot) => {
        const color = LV_COLOR[spot.recovery_level];
        const emoji = LV_EMOJI[spot.recovery_level];

        // Custom DivIcon
        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 36px;
              height: 36px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              background: ${color};
              border: 2px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <span style="
                transform: rotate(45deg);
                font-size: 16px;
                line-height: 1;
              ">${emoji}</span>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const marker = L.marker([spot.lat, spot.lng], { icon }).addTo(map);

        marker.on("click", () => {
          if (isMounted) setSelectedSpot(spot);
        });
      });

      mapInstance.current = map;
      if (isMounted) setIsLoaded(true);
    })();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [initialSpot]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        maxWidth: 430,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "52px 16px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background:
            "linear-gradient(to bottom, rgba(250,250,248,0.95) 70%, transparent)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-1)",
          }}
          aria-label="閉じる"
        >
          <X size={16} color="var(--text-secondary)" />
        </button>

        <div
          style={{
            background: "var(--surface)",
            borderRadius: 12,
            padding: "8px 14px",
            boxShadow: "var(--shadow-1)",
            border: "1px solid var(--border)",
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              margin: 0,
              color: "var(--text-primary)",
            }}
          >
            <MapPin
              size={12}
              style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }}
              color="var(--accent)"
            />
            渋谷区 回復スポットマップ
          </p>
          <p
            style={{
              fontSize: 10,
              color: "var(--text-tertiary)",
              margin: 0,
            }}
          >
            {SPOTS.length}件 表示中
          </p>
        </div>
      </header>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          top: 128,
          right: 16,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {([3, 2, 1] as const).map((lv) => (
          <div
            key={lv}
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: 8,
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <span style={{ fontSize: 12 }}>{LV_EMOJI[lv]}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: LV_COLOR[lv],
              }}
            >
              Lv{lv}
            </span>
          </div>
        ))}
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{ flex: 1, width: "100%" }}
      />

      {/* Loading overlay */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <p style={{ color: "var(--text-tertiary)", fontSize: 13 }}>
            地図を読み込み中...
          </p>
        </div>
      )}

      {/* Bottom spot card */}
      {selectedSpot && (
        <div
          className="animate-fade-up"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px 16px 32px",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            borderRadius: "20px 20px 0 0",
            boxShadow: "var(--shadow-2)",
            zIndex: 10,
          }}
        >
          {/* Drag indicator */}
          <div
            style={{
              width: 36,
              height: 4,
              background: "var(--border)",
              borderRadius: 999,
              margin: "0 auto 14px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <RecoveryIcon level={selectedSpot.recovery_level} size="md" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedSpot.name}
              </p>
              <p
                className="text-caption"
                style={{ color: "var(--text-secondary)", margin: 0 }}
              >
                {selectedSpot.area} ·{" "}
                {selectedSpot.distance != null
                  ? `徒歩 約${Math.ceil(selectedSpot.distance / 80)}分`
                  : ""}
              </p>
            </div>
            <button
              onClick={() => setSelectedSpot(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <X size={16} color="var(--text-tertiary)" />
            </button>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="btn-secondary"
              style={{ flex: 1 }}
              onClick={() => onSelectSpot(selectedSpot)}
            >
              詳細を見る
            </button>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.lat},${selectedSpot.lng}`;
                window.open(url, "_blank");
              }}
            >
              <Navigation size={14} />
              ナビする
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
