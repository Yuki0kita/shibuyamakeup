"use client";

import type { Tag } from "@/types";

interface TagChipsProps {
  tags: Tag[];
  max?: number;
  accent?: boolean;
}

export function TagChips({ tags, max = 3, accent = false }: TagChipsProps) {
  const visible = tags.slice(0, max);
  const rest = tags.length - max;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {visible.map((tag) => (
        <span key={tag.tag_code} className={`chip ${accent ? "chip-accent" : ""}`}>
          {tag.tag_name}
        </span>
      ))}
      {rest > 0 && (
        <span className="chip" style={{ color: "var(--text-tertiary)" }}>
          +{rest}
        </span>
      )}
    </div>
  );
}
