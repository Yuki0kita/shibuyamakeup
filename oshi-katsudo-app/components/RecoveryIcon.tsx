"use client";

import type { RecoveryLevel } from "@/types";

interface RecoveryIconProps {
  level: RecoveryLevel;
  size?: "sm" | "md" | "lg";
}

const ICONS: Record<RecoveryLevel, { emoji: string; label: string; color: string }> = {
  1: { emoji: "🧻", label: "Lv1", color: "var(--lv1)" },
  2: { emoji: "🪞", label: "Lv2", color: "var(--lv2)" },
  3: { emoji: "👑", label: "Lv3", color: "var(--lv3)" },
};

const SIZES = {
  sm: { box: 36, font: 18 },
  md: { box: 48, font: 24 },
  lg: { box: 64, font: 32 },
};

export function RecoveryIcon({ level, size = "md" }: RecoveryIconProps) {
  const icon = ICONS[level];
  const s = SIZES[size];

  return (
    <div
      style={{
        width: s.box,
        height: s.box,
        borderRadius: "50%",
        background: "var(--surface-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: s.font,
        flexShrink: 0,
        border: `2px solid ${icon.color}22`,
      }}
      aria-label={`Recovery Level ${level}`}
    >
      {icon.emoji}
    </div>
  );
}
