import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;

// Cloudflare local dev only; skip during `next build` and ignore if the package is absent.
if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare")
    .then((m) => m.initOpenNextCloudflareForDev())
    .catch(() => undefined);
}
