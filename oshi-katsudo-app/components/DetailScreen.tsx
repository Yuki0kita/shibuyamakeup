"use client";

import { ChevronLeft, Navigation, MapPin, Clock } from "lucide-react";
import { RecoveryIcon } from "@/components/RecoveryIcon";
import { TagChips } from "@/components/TagChips";
import type { Spot } from "@/types";

interface DetailScreenProps {
  spot: Spot;
  onBack: () => void;
  onNavigate: () => void;
  onPost: () => void;
}

const SOURCE_LABEL: Record<string, string> = {
  TOKYO_TOILET: "TOKYO TOILET",
  INSTABASE: "個室スペース",
  COMMERCIAL: "商業施設",
};

const LV_LABEL: Record<number, string> = {
  1: "かるく整う",
  2: "しっかり整う",
  3: "フル復活",
};

export function DetailScreen({
  spot,
  onBack,
  onNavigate,
  onPost,
}: DetailScreenProps) {
  const distanceText =
    spot.distance != null
      ? `${spot.distance}m（徒歩 約${Math.ceil(spot.distance / 80)}分）`
      : "距離不明";

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Photo area */}
      <div
        style={{
          height: 220,
          background: "linear-gradient(135deg, var(--surface-2) 0%, var(--accent-light) 100%)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: 52,
            left: 20,
            background: "rgba(255,255,255,0.85)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
          aria-label="戻る"
        >
          <ChevronLeft size={18} color="var(--text-secondary)" />
        </button>

        {/* Recovery level badge */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.9)",
            borderRadius: 16,
            padding: "8px 14px",
          }}
        >
          <RecoveryIcon level={spot.recovery_level} size="sm" />
          <div>
            <p
              style={{
                fontSize: 10,
                color: "var(--text-tertiary)",
                margin: 0,
                letterSpacing: "0.08em",
              }}
            >
              RECOVERY LEVEL {spot.recovery_level}
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {LV_LABEL[spot.recovery_level]}
            </p>
          </div>
        </div>

        {/* Photo placeholder */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            opacity: 0.2,
          }}
        >
          {spot.source === "TOKYO_TOILET"
            ? "🚿"
            : spot.source === "INSTABASE"
            ? "🚪"
            : "🏢"}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "20px 20px 120px",
          overflow: "auto",
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              letterSpacing: "0.08em",
              marginBottom: 4,
            }}
          >
            {SOURCE_LABEL[spot.source]} · {spot.area}
          </p>
          <h1 className="text-h1" style={{ margin: 0 }}>
            {spot.name}
          </h1>
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <Navigation size={13} color="var(--text-secondary)" />
            <span
              className="text-caption"
              style={{ color: "var(--text-secondary)" }}
            >
              {distanceText}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <MapPin size={13} color="var(--text-secondary)" />
            <span
              className="text-caption"
              style={{ color: "var(--text-secondary)" }}
            >
              {spot.area}
            </span>
          </div>
        </div>

        {/* Tags */}
        <section style={{ marginBottom: 20 }}>
          <TagChips tags={spot.tags} max={spot.tags.length} accent />
        </section>

        {/* Notes */}
        {spot.notes && (
          <section
            style={{
              background: "var(--surface-2)",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "var(--text-tertiary)",
                marginBottom: 6,
                letterSpacing: "0.08em",
              }}
            >
              注意事項
            </p>
            <p
              className="text-body"
              style={{ color: "var(--text-secondary)", margin: 0 }}
            >
              {spot.notes}
            </p>
          </section>
        )}

        {/* Feature flags */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {spot.mirror_flag && (
            <span className="chip">🪞 鏡あり</span>
          )}
          {spot.lighting_flag && (
            <span className="chip">💡 照明良好</span>
          )}
          {spot.stay_flag && (
            <span className="chip">⏱ 滞在可</span>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "16px 20px 32px",
          background: "linear-gradient(to top, var(--bg) 70%, transparent)",
          display: "flex",
          gap: 12,
        }}
      >
        <button
          className="btn-secondary"
          onClick={onPost}
          style={{ flex: 1 }}
        >
          整った
        </button>
        <button
          className="btn-primary"
          onClick={onNavigate}
          style={{ flex: 2 }}
        >
          <Navigation size={16} />
          ナビする
        </button>
      </div>
    </div>
  );
}
