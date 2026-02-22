"use client";

import { useState } from "react";
import { ChevronLeft, Camera, Check } from "lucide-react";
import { TAG_MASTER } from "@/lib/mockData";
import type { Spot, Tag } from "@/types";

interface PostScreenProps {
  spot: Spot;
  onBack: () => void;
  onComplete: () => void;
}

export function PostScreen({ spot, onBack, onComplete }: PostScreenProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.tag_code === tag.tag_code);
      if (exists) return prev.filter((t) => t.tag_code !== tag.tag_code);
      if (prev.length >= 5) return prev;
      return [...prev, tag];
    });
  };

  const handleSubmit = () => {
    if (selectedTags.length === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
        className="animate-fade"
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--accent-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Check size={32} color="var(--accent)" strokeWidth={2.5} />
        </div>
        <h2 className="text-h1" style={{ marginBottom: 8 }}>
          投稿できた
        </h2>
        <p className="text-body" style={{ color: "var(--text-secondary)" }}>
          次の子の役に立てますように ✦
        </p>
      </div>
    );
  }

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
          padding: "52px 20px 20px",
          display: "flex",
          alignItems: "center",
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
          }}
          aria-label="戻る"
        >
          <ChevronLeft size={18} color="var(--text-secondary)" />
        </button>
        <div>
          <p style={{ fontSize: 11, color: "var(--text-tertiary)", margin: 0 }}>
            整ったスポット
          </p>
          <h2 className="text-h2" style={{ margin: 0 }}>
            {spot.name}
          </h2>
        </div>
      </header>

      {/* Form */}
      <div
        style={{
          flex: 1,
          padding: "0 20px 120px",
          overflow: "auto",
        }}
      >
        {/* Photo placeholder */}
        <div
          className="card"
          style={{
            height: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 24,
            cursor: "pointer",
            border: "2px dashed var(--border)",
            boxShadow: "none",
          }}
        >
          <Camera size={28} color="var(--text-tertiary)" />
          <p className="text-caption" style={{ color: "var(--text-tertiary)" }}>
            写真を追加（任意）
          </p>
        </div>

        {/* Tag selector */}
        <section style={{ marginBottom: 24 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            どんなスポットだった？
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "var(--text-tertiary)",
                marginLeft: 8,
              }}
            >
              {selectedTags.length}/5
            </span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TAG_MASTER.map((tag) => {
              const selected = selectedTags.some(
                (t) => t.tag_code === tag.tag_code
              );
              return (
                <button
                  key={tag.tag_code}
                  onClick={() => toggleTag(tag)}
                  style={{
                    height: 36,
                    padding: "0 14px",
                    borderRadius: 999,
                    border: selected
                      ? "1.5px solid var(--accent)"
                      : "1.5px solid var(--border)",
                    background: selected
                      ? "var(--accent-light)"
                      : "var(--surface)",
                    color: selected ? "var(--accent-dark)" : "var(--text-secondary)",
                    fontSize: 13,
                    fontWeight: selected ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 120ms",
                  }}
                >
                  {tag.tag_name}
                </button>
              );
            })}
          </div>
        </section>

        {/* Comment */}
        <section>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 10,
              color: "var(--text-primary)",
            }}
          >
            ひとこと
            <span
              style={{
                fontSize: 11,
                fontWeight: 400,
                color: "var(--text-tertiary)",
                marginLeft: 8,
              }}
            >
              任意 · {comment.length}/50
            </span>
          </p>
          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value.slice(0, 50))
            }
            placeholder="整えたときの感想を書いてね"
            style={{
              width: "100%",
              height: 80,
              borderRadius: 12,
              border: "1.5px solid var(--border)",
              padding: "12px 14px",
              fontSize: 14,
              color: "var(--text-primary)",
              background: "var(--surface)",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </section>
      </div>

      {/* Submit */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          padding: "16px 20px 32px",
          background:
            "linear-gradient(to top, var(--bg) 70%, transparent)",
        }}
      >
        <button
          className="btn-primary"
          style={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={selectedTags.length === 0}
        >
          投稿する
        </button>
      </div>
    </div>
  );
}
