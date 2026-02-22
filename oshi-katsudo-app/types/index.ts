export type EmotionId =
  | "EMO01"
  | "EMO02"
  | "EMO03"
  | "EMO04"
  | "EMO05"
  | "EMO06";

export type RecoveryLevel = 1 | 2 | 3;

export type SourceType = "TOKYO_TOILET" | "INSTABASE" | "COMMERCIAL";

export interface Tag {
  tag_code: string;
  tag_name: string;
  icon: string;
}

export interface Spot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  area: string;
  source: SourceType;
  recovery_level: RecoveryLevel;
  mirror_flag: boolean;
  lighting_flag: boolean;
  stay_flag: boolean;
  is_active: boolean;
  tags: Tag[];
  photos: string[];
  notes: string;
  distance?: number;
}

export interface Emotion {
  id: EmotionId;
  label: string;
  short: string;
  icon: string;
  priority_source?: SourceType;
}

export interface Post {
  id: string;
  spot_id: string;
  spot_name: string;
  photo_url: string;
  comment: string;
  tags: Tag[];
  created_at: string;
}
