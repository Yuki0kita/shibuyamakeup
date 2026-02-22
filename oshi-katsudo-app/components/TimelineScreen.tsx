"use client";

import { MOCK_POSTS, SPOTS } from "@/lib/mockData";
import { RecoveryIcon } from "@/components/RecoveryIcon";
import { TagChips } from "@/components/TagChips";
import type { Post, Spot } from "@/types";

interface TimelineScreenProps {
  onSelectSpot: (spot: Spot) => void;
}

function formatRelativeTime(dateStr: string): string {
  const diff =
    (new Date().getTime() - new Date(dateStr).getTime()) / 1000 / 60;
  if (diff < 60) return `${Math.floor(diff)}分前`;
  if (diff < 60 * 24) return `${Math.floor(diff / 60)}時間前`;
  return `${Math.floor(diff / 60 / 24)}日前`;
}

export function TimelineScreen({ onSelectSpot }: TimelineScreenProps) {
  return (
    <div style={{ padding: "52px 0 32px" }}>
      <header style={{ padding: "0 20px 20px" }}>
        <h2 className="text-h1" style={{ margin: 0 }}>
          みんなの整えレポ
        </h2>
        <p
          className="text-caption"
          style={{ color: "var(--text-tertiary)", marginTop: 4 }}
        >
          リアルな声でスポットを探せる
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
        {MOCK_POSTS.map((post, i) => {
          const spot = SPOTS.find((s) => s.id === post.spot_id);
          if (!spot) return null;
          return (
            <PostCard
              key={post.id}
              post={post}
              spot={spot}
              delay={i * 60}
              onSelectSpot={onSelectSpot}
            />
          );
        })}
      </div>
    </div>
  );
}

function PostCard({
  post,
  spot,
  delay,
  onSelectSpot,
}: {
  post: Post;
  spot: Spot;
  delay: number;
  onSelectSpot: (s: Spot) => void;
}) {
  return (
    <div
      className="card animate-fade-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0, padding: 16 }}
    >
      {/* Spot info */}
      <button
        onClick={() => onSelectSpot(spot)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          width: "100%",
          textAlign: "left",
        }}
      >
        <RecoveryIcon level={spot.recovery_level} size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
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
          <p
            className="text-caption"
            style={{ color: "var(--text-tertiary)", margin: 0 }}
          >
            {formatRelativeTime(post.created_at)}
          </p>
        </div>
      </button>

      {/* Comment */}
      {post.comment && (
        <p
          className="text-body"
          style={{
            color: "var(--text-secondary)",
            marginBottom: 10,
          }}
        >
          {post.comment}
        </p>
      )}

      {/* Tags */}
      <TagChips tags={post.tags} max={5} />
    </div>
  );
}
