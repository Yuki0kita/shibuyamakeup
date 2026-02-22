"use client";

import { useState } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { RecommendScreen } from "@/components/RecommendScreen";
import { DetailScreen } from "@/components/DetailScreen";
import { PostScreen } from "@/components/PostScreen";
import { TimelineScreen } from "@/components/TimelineScreen";
import { MapScreen } from "@/components/MapScreen";
import { BottomNav, type TabType } from "@/components/BottomNav";
import type { Emotion, Spot } from "@/types";

type Screen =
  | { type: "home" }
  | { type: "recommend"; emotion: Emotion }
  | { type: "detail"; emotion: Emotion; spot: Spot }
  | { type: "post"; spot: Spot }
  | { type: "timeline" }
  | { type: "map"; fromEmotion?: Emotion; initialSpot?: Spot };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: "home" });
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const showNav =
    screen.type === "home" || screen.type === "timeline";

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setScreen(tab === "home" ? { type: "home" } : { type: "timeline" });
  };

  const handleNavigate = (spot: Spot) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`;
    window.open(url, "_blank");
  };

  // Map -> Detail のバック先を記憶するため fromEmotion を保持
  const dummyEmotion: Emotion = {
    id: "EMO06",
    label: "フル復活したい",
    short: "フル復活",
    icon: "✦",
  };

  return (
    <div style={{ paddingBottom: showNav ? 72 : 0 }}>
      {screen.type === "home" && (
        <HomeScreen
          onSelect={(emotion) => setScreen({ type: "recommend", emotion })}
          onOpenMap={() => setScreen({ type: "map" })}
        />
      )}

      {screen.type === "recommend" && (
        <RecommendScreen
          emotion={screen.emotion}
          onBack={() => setScreen({ type: "home" })}
          onSelectSpot={(spot) =>
            setScreen({ type: "detail", emotion: screen.emotion, spot })
          }
          onOpenMap={() =>
            setScreen({ type: "map", fromEmotion: screen.emotion })
          }
        />
      )}

      {screen.type === "detail" && (
        <DetailScreen
          spot={screen.spot}
          onBack={() =>
            setScreen({ type: "recommend", emotion: screen.emotion })
          }
          onNavigate={() => handleNavigate(screen.spot)}
          onPost={() => setScreen({ type: "post", spot: screen.spot })}
        />
      )}

      {screen.type === "post" && (
        <PostScreen
          spot={screen.spot}
          onBack={() => setScreen({ type: "home" })}
          onComplete={() => {
            setActiveTab("timeline");
            setScreen({ type: "timeline" });
          }}
        />
      )}

      {screen.type === "timeline" && (
        <TimelineScreen
          onSelectSpot={(spot) =>
            setScreen({
              type: "detail",
              emotion: dummyEmotion,
              spot,
            })
          }
        />
      )}

      {screen.type === "map" && (
        <MapScreen
          initialSpot={screen.initialSpot}
          onSelectSpot={(spot) =>
            setScreen({
              type: "detail",
              emotion: screen.fromEmotion ?? dummyEmotion,
              spot,
            })
          }
          onClose={() => {
            if (screen.fromEmotion) {
              setScreen({ type: "recommend", emotion: screen.fromEmotion });
            } else {
              setScreen({ type: "home" });
            }
          }}
        />
      )}

      {showNav && (
        <BottomNav activeTab={activeTab} onChange={handleTabChange} />
      )}
    </div>
  );
}
