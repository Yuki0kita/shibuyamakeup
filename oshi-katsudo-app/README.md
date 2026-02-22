# 整える。— 渋谷区 推し活前回復スポット

推し活直前のお直し・回復スポットを3秒で見つけられるWebアプリです。

## 機能

- 6種類の感情から現在の状態を選択
- レコメンドアルゴリズムによるスポット3件表示
- スポット詳細・Google Mapsナビ連携
- 「整った」投稿・タイムライン表示

## Tech Stack

- **フロントエンド**: Next.js 16 + TypeScript + Tailwind CSS
- **データ**: モックデータ（Supabase連携可能な構造）
- **地図**: Google Maps URL スキーム（Mapbox移行可能）

## ローカル起動

```bash
npm install
npm run dev
```

## GitHub Pages へのデプロイ手順

### 1. リポジトリを GitHub に作成

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### 2. next.config.ts の basePath を設定（リポジトリ名に合わせる）

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/<リポジトリ名>",  // ← ここを変更
  ...
};
```

### 3. GitHub リポジトリの Settings → Pages

- Source: **GitHub Actions** を選択

### 4. main ブランチへ push すると自動デプロイ

デプロイ後のURL: `https://<ユーザー名>.github.io/<リポジトリ名>/`

## Supabase 連携（本番化の手順）

1. Supabase プロジェクトを作成し、`lib/mockData.ts` のSQL定義でテーブルを作成
2. `.env.local` に環境変数を設定:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
   ```
3. `npm install @supabase/supabase-js`
4. `lib/mockData.ts` → `lib/supabase.ts` に置き換え

## ディレクトリ構成

```
oshi-katsudo-app/
├── app/
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # エントリーポイント
│   └── globals.css      # デザイントークン・グローバルスタイル
├── components/
│   ├── App.tsx          # 状態管理・画面ルーティング
│   ├── HomeScreen.tsx   # 感情選択画面
│   ├── RecommendScreen.tsx  # スポット3件表示
│   ├── DetailScreen.tsx # スポット詳細
│   ├── PostScreen.tsx   # 投稿画面
│   ├── TimelineScreen.tsx   # タイムライン
│   ├── BottomNav.tsx    # 下部ナビゲーション
│   ├── RecoveryIcon.tsx # Recovery Lv アイコン
│   └── TagChips.tsx     # タグチップ
├── lib/
│   └── mockData.ts      # スポット・感情・投稿データ + レコメンドロジック
├── types/
│   └── index.ts         # TypeScript型定義
└── .github/workflows/
    └── deploy.yml       # GitHub Actions (GitHub Pages デプロイ)
```
