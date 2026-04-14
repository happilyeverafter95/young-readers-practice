import Script from "next/script";

/**
 * Cloudflare Web Analytics. Set `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` at build time
 * (GitHub secret → Actions env, `.env.local`, etc.); value is the token from
 * Dashboard → Web Analytics → Manage site. Not bundled if unset.
 */
export function CloudflareWebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;
  if (!token) return null;
  return (
    <Script
      id="cloudflare-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="lazyOnload"
      {...{ "data-cf-beacon": JSON.stringify({ token }) }}
    />
  );
}
