"use client";

import { Map } from "lucide-react";
import { EMOTIONS } from "@/lib/mockData";
import type { Emotion } from "@/types";

interface HomeScreenProps {
  onSelect: (emotion: Emotion) => void;
  onOpenMap: () => void;
}

export function HomeScreen({ onSelect, onOpenMap }: HomeScreenProps) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px 32px",
      }}
    >
      {/* Header */}
      <header
        style={{
          paddingTop: 56,
          paddingBottom: 32,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Map button */}
        <button
          onClick={onOpenMap}
          style={{
            position: "absolute",
            top: 52,
            right: 0,
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
          }}
        >
          <Map size={14} />
          地図
        </button>

        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--text-tertiary)",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          渋谷区 回復スポット
        </p>
        <h1
          className="text-display"
          style={{ color: "var(--text-primary)", margin: 0 }}
        >
          整える。
        </h1>
        <p
          className="text-body"
          style={{
            color: "var(--text-secondary)",
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          いま、どれ？
        </p>
      </header>

      {/* Emotion Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          flex: 1,
        }}
      >
        {EMOTIONS.map((emotion, i) => (
          <EmotionButton
            key={emotion.id}
            emotion={emotion}
            delay={i * 60}
            onSelect={onSelect}
          />
        ))}
      </div>

      <p
        className="text-caption"
        style={{
          textAlign: "center",
          color: "var(--text-tertiary)",
          marginTop: 24,
        }}
      >
        あと3分で整う ✦
      </p>
    </div>
  );
}

function EmotionButton({
  emotion,
  delay,
  onSelect,
}: {
  emotion: Emotion;
  delay: number;
  onSelect: (e: Emotion) => void;
}) {
  return (
    <button
      onClick={() => onSelect(emotion)}
      className="card animate-fade-up"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        border: "none",
        cursor: "pointer",
        padding: "20px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        minHeight: 120,
        justifyContent: "center",
        transition: "transform 80ms ease, box-shadow 120ms ease",
        WebkitAppearance: "none",
        background: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "var(--shadow-2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "var(--shadow-1)";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
      onTouchStart={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
      }}
      onTouchEnd={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      <span style={{ fontSize: 32 }}>{emotion.icon}</span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "0.02em",
        }}
      >
        {emotion.short}
      </span>
    </button>
  );
}
