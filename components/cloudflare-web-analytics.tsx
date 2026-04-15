import Script from "next/script";

/**
 * Cloudflare Web Analytics. Set `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` at build time
 * (GitHub secret → Actions env, etc.); value is the token from
 * Dashboard → Web Analytics → Manage site.
 */
export function CloudflareWebAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

  if (!token) {
    throw new Error(
      "Missing NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN. Set it in the build environment so the Cloudflare beacon is included."
    );
  }
  return (
    <Script
      id="cloudflare-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="lazyOnload"
      {...{ "data-cf-beacon": JSON.stringify({ token }) }}
    />
  );
}
