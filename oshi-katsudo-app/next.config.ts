import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath は GitHub Pages のリポジトリ名に合わせて変更してください
  // 例: https://username.github.io/repo-name の場合は "/repo-name"
  // basePath: "/repo-name",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
