"use client";

import { ChevronLeft, Navigation, ChevronRight, Map } from "lucide-react";
import { RecoveryIcon } from "@/components/RecoveryIcon";
import { TagChips } from "@/components/TagChips";
import { getRecommendedSpots } from "@/lib/mockData";
import type { Emotion, Spot } from "@/types";

interface RecommendScreenProps {
  emotion: Emotion;
  onBack: () => void;
  onSelectSpot: (spot: Spot) => void;
  onOpenMap: () => void;
}

const SOURCE_LABEL: Record<string, string> = {
  TOKYO_TOILET: "TOKYO TOILET",
  INSTABASE: "個室スペース",
  COMMERCIAL: "商業施設",
};

export function RecommendScreen({
  emotion,
  onBack,
  onSelectSpot,
  onOpenMap,
}: RecommendScreenProps) {
  const spots = getRecommendedSpots(emotion.id, 3);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav */}
      <header
        style={{
          padding: "52px 20px 0",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            marginTop: 2,
          }}
          aria-label="戻る"
        >
          <ChevronLeft size={18} color="var(--text-secondary)" />
        </button>

        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "var(--text-tertiary)",
              marginBottom: 4,
            }}
          >
            いまのあなた：
            <strong
              style={{ color: "var(--accent)", fontWeight: 700 }}
            >
              {emotion.label}
            </strong>
          </p>
          <h2 className="text-h1" style={{ margin: 0 }}>
            ここなら大丈夫
          </h2>
        </div>

        <button
          onClick={onOpenMap}
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "7px 12px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text-secondary)",
            flexShrink: 0,
            marginTop: 2,
          }}
        >
          <Map size={14} />
          地図
        </button>
      </header>

      {/* Spot list */}
      <div
        style={{
          flex: 1,
          padding: "24px 20px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {spots.map((spot, i) => (
          <SpotCard
            key={spot.id}
            spot={spot}
            rank={i + 1}
            delay={i * 80}
            onSelect={onSelectSpot}
          />
        ))}
      </div>
    </div>
  );
}

function SpotCard({
  spot,
  rank,
  delay,
  onSelect,
}: {
  spot: Spot;
  rank: number;
  delay: number;
  onSelect: (s: Spot) => void;
}) {
  const distanceText =
    spot.distance && spot.distance < 1000
      ? `徒歩 約${Math.ceil(spot.distance / 80)}分`
      : spot.distance
      ? `徒歩 約${Math.ceil(spot.distance / 80)}分`
      : "";

  return (
    <button
      className="card animate-fade-up"
      onClick={() => onSelect(spot)}
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        border: "none",
        cursor: "pointer",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        textAlign: "left",
        transition: "transform 80ms ease, box-shadow 120ms ease",
        WebkitAppearance: "none",
        background: "var(--surface)",
        width: "100%",
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.99)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
      onTouchStart={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.99)";
      }}
      onTouchEnd={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      <RecoveryIcon level={spot.recovery_level} size="md" />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          {rank === 1 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--accent)",
                background: "var(--accent-light)",
                padding: "2px 7px",
                borderRadius: 999,
                letterSpacing: "0.06em",
                flexShrink: 0,
              }}
            >
              いちばん近い
            </span>
          )}
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "var(--text-primary)",
            }}
          >
            {spot.name}
          </p>
        </div>

        <p
          className="text-caption"
          style={{ color: "var(--text-secondary)", marginBottom: 8 }}
        >
          <Navigation
            size={10}
            style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }}
          />
          {distanceText}
          <span
            style={{
              marginLeft: 8,
              color: "var(--text-tertiary)",
            }}
          >
            {spot.area}
          </span>
        </p>

        <TagChips tags={spot.tags} max={3} />
      </div>

      <ChevronRight
        size={16}
        color="var(--text-tertiary)"
        style={{ flexShrink: 0 }}
      />
    </button>
  );
}
