"use client";

import { Home, Sparkles } from "lucide-react";

export type TabType = "home" | "timeline";

interface BottomNavProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        background: "rgba(250,250,248,0.92)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        padding: "8px 0 20px",
        zIndex: 100,
      }}
    >
      {(
        [
          { id: "home", label: "整える", Icon: Home },
          { id: "timeline", label: "みんなの整えレポ", Icon: Sparkles },
        ] as const
      ).map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
              transition: "opacity 120ms",
            }}
          >
            <Icon
              size={22}
              color={active ? "var(--accent)" : "var(--text-tertiary)"}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 700 : 400,
                color: active ? "var(--accent)" : "var(--text-tertiary)",
                letterSpacing: "0.02em",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
