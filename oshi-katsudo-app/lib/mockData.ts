import type { Emotion, Spot, Tag, Post } from "@/types";

export const TAG_MASTER: Tag[] = [
  { tag_code: "LIGHT_GOOD", tag_name: "光盛れ", icon: "✦" },
  { tag_code: "BIG_MIRROR", tag_name: "鏡大", icon: "◈" },
  { tag_code: "PRIVATE_SAFE", tag_name: "安心", icon: "◉" },
  { tag_code: "POWER_OUTLET", tag_name: "電源", icon: "◎" },
  { tag_code: "CLEAN", tag_name: "清潔", icon: "◇" },
  { tag_code: "QUIET", tag_name: "静か", icon: "◌" },
  { tag_code: "COSMETICS", tag_name: "化粧台", icon: "◈" },
  { tag_code: "WIDE_SPACE", tag_name: "広い", icon: "◻" },
  { tag_code: "FEW_PEOPLE", tag_name: "空きめ", icon: "◯" },
];

export const EMOTIONS: Emotion[] = [
  {
    id: "EMO01",
    label: "前髪崩れた",
    short: "前髪",
    icon: "✂",
    priority_source: "COMMERCIAL",
  },
  {
    id: "EMO02",
    label: "泣いてしまった",
    short: "泣いた",
    icon: "◉",
    priority_source: "COMMERCIAL",
  },
  {
    id: "EMO03",
    label: "汗やばい",
    short: "汗",
    icon: "◌",
    priority_source: "TOKYO_TOILET",
  },
  {
    id: "EMO04",
    label: "5分しかない",
    short: "5分",
    icon: "◷",
    priority_source: "TOKYO_TOILET",
  },
  {
    id: "EMO05",
    label: "一人になりたい",
    short: "ひとり",
    icon: "◯",
    priority_source: "INSTABASE",
  },
  {
    id: "EMO06",
    label: "フル復活したい",
    short: "フル復活",
    icon: "✦",
    priority_source: "INSTABASE",
  },
];

export const SPOTS: Spot[] = [
  {
    id: "spot-001",
    name: "渋谷スクランブルスクエア トイレ 11F",
    lat: 35.6586,
    lng: 139.7023,
    area: "渋谷",
    source: "COMMERCIAL",
    recovery_level: 3,
    mirror_flag: true,
    lighting_flag: true,
    stay_flag: true,
    is_active: true,
    tags: [
      TAG_MASTER[0],
      TAG_MASTER[1],
      TAG_MASTER[4],
      TAG_MASTER[6],
    ],
    photos: ["/images/spot1.jpg"],
    notes: "11F展望フロア近く。空いている時間帯は朝〜昼がおすすめ。",
    distance: 320,
  },
  {
    id: "spot-002",
    name: "SHIBUYA TOKYO TOILET 神宮前",
    lat: 35.6605,
    lng: 139.7058,
    area: "神宮前",
    source: "TOKYO_TOILET",
    recovery_level: 2,
    mirror_flag: true,
    lighting_flag: false,
    stay_flag: false,
    is_active: true,
    tags: [TAG_MASTER[2], TAG_MASTER[4], TAG_MASTER[8]],
    photos: ["/images/spot2.jpg"],
    notes: "デザイン系のTOKYO TOILET。清潔で使いやすい。",
    distance: 480,
  },
  {
    id: "spot-003",
    name: "プライベートルーム渋谷A",
    lat: 35.6595,
    lng: 139.7005,
    area: "渋谷",
    source: "INSTABASE",
    recovery_level: 3,
    mirror_flag: true,
    lighting_flag: true,
    stay_flag: true,
    is_active: true,
    tags: [TAG_MASTER[0], TAG_MASTER[2], TAG_MASTER[5], TAG_MASTER[7]],
    photos: ["/images/spot3.jpg"],
    notes: "完全個室。1時間から利用可能。",
    distance: 650,
  },
  {
    id: "spot-004",
    name: "渋谷ヒカリエ ShinQs 化粧室",
    lat: 35.6591,
    lng: 139.7034,
    area: "渋谷",
    source: "COMMERCIAL",
    recovery_level: 3,
    mirror_flag: true,
    lighting_flag: true,
    stay_flag: true,
    is_active: true,
    tags: [TAG_MASTER[0], TAG_MASTER[1], TAG_MASTER[6], TAG_MASTER[4]],
    photos: ["/images/spot4.jpg"],
    notes: "化粧台あり。ライティングが綺麗。混みやすいので時間帯注意。",
    distance: 200,
  },
  {
    id: "spot-005",
    name: "TOKYO TOILET 恵比寿公園",
    lat: 35.6469,
    lng: 139.7097,
    area: "恵比寿",
    source: "TOKYO_TOILET",
    recovery_level: 1,
    mirror_flag: false,
    lighting_flag: false,
    stay_flag: false,
    is_active: true,
    tags: [TAG_MASTER[4], TAG_MASTER[8]],
    photos: ["/images/spot5.jpg"],
    notes: "アクセスしやすい。基本的なお直しに。",
    distance: 890,
  },
  {
    id: "spot-006",
    name: "SHIBUYA 109 パウダーコーナー",
    lat: 35.6598,
    lng: 139.6984,
    area: "道玄坂",
    source: "COMMERCIAL",
    recovery_level: 2,
    mirror_flag: true,
    lighting_flag: true,
    stay_flag: false,
    is_active: true,
    tags: [TAG_MASTER[1], TAG_MASTER[6], TAG_MASTER[4]],
    photos: ["/images/spot6.jpg"],
    notes: "道玄坂側入口から近い。ピーク時間は混雑する。",
    distance: 150,
  },
  {
    id: "spot-007",
    name: "プライベートルーム表参道B",
    lat: 35.6652,
    lng: 139.7101,
    area: "表参道",
    source: "INSTABASE",
    recovery_level: 3,
    mirror_flag: true,
    lighting_flag: true,
    stay_flag: true,
    is_active: true,
    tags: [TAG_MASTER[0], TAG_MASTER[2], TAG_MASTER[3], TAG_MASTER[7]],
    photos: ["/images/spot7.jpg"],
    notes: "電源あり。スマホ充電しながらゆっくり整えられる。",
    distance: 1100,
  },
  {
    id: "spot-008",
    name: "TOKYO TOILET 代々木八幡",
    lat: 35.6687,
    lng: 139.6966,
    area: "代々木",
    source: "TOKYO_TOILET",
    recovery_level: 1,
    mirror_flag: true,
    lighting_flag: false,
    stay_flag: false,
    is_active: true,
    tags: [TAG_MASTER[4], TAG_MASTER[8], TAG_MASTER[5]],
    photos: ["/images/spot8.jpg"],
    notes: "静かなエリア。急ぎのお直しに。",
    distance: 730,
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "post-001",
    spot_id: "spot-001",
    spot_name: "渋谷スクランブルスクエア トイレ 11F",
    photo_url: "",
    comment: "ここで整えてよかった！鏡がほんとに綺麗で助かった",
    tags: [TAG_MASTER[0], TAG_MASTER[1]],
    created_at: "2025-03-15T14:30:00Z",
  },
  {
    id: "post-002",
    spot_id: "spot-004",
    spot_name: "渋谷ヒカリエ ShinQs 化粧室",
    photo_url: "",
    comment: "ライティングが最高すぎる。全回復した",
    tags: [TAG_MASTER[0], TAG_MASTER[6]],
    created_at: "2025-03-14T16:00:00Z",
  },
  {
    id: "post-003",
    spot_id: "spot-002",
    spot_name: "SHIBUYA TOKYO TOILET 神宮前",
    photo_url: "",
    comment: "デザインがかわいかった。落ち着けた",
    tags: [TAG_MASTER[2], TAG_MASTER[4]],
    created_at: "2025-03-13T12:15:00Z",
  },
];

export function getRecommendedSpots(emotionId: string, count = 3): Spot[] {
  const emotion = EMOTIONS.find((e) => e.id === emotionId);
  if (!emotion) return SPOTS.slice(0, count);

  const scored = SPOTS.map((spot) => {
    let score = 0;

    // 距離係数
    if ((spot.distance ?? 9999) <= 500) score += 3;
    else if ((spot.distance ?? 9999) <= 1000) score += 1;

    // priorityソース一致
    if (emotion.priority_source && spot.source === emotion.priority_source) {
      score += 3;
    }

    // 感情別ロジック
    if (emotionId === "EMO01" && spot.mirror_flag) score += 3;
    if (emotionId === "EMO01" && spot.lighting_flag) score += 2;
    if (emotionId === "EMO02" && spot.stay_flag) score += 3;
    if (emotionId === "EMO02" && (spot.recovery_level ?? 0) >= 2) score += 2;
    if (emotionId === "EMO03" && spot.source === "TOKYO_TOILET") score += 3;
    if (emotionId === "EMO04" && (spot.distance ?? 9999) <= 300) score += 4;
    if (emotionId === "EMO05" && spot.stay_flag) score += 4;
    if (emotionId === "EMO06" && spot.recovery_level === 3) score += 4;

    return { spot, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.spot);
}
