import type { NextConfig } from "next";
import { headers } from "next/headers";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // Configure headers for SEP-24 iframe embedding with nonce-based CSP
  async headers() {
    const headersList = await headers();
    const nonce = headersList.get('x-nonce') || '';

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Allow iframes from anchor domains
              "frame-src 'self' https://*.moneygram.com https://stellar.moneygram.com https://*.yellowcard.io https://stellar.yellowcard.io https://*.stellar.org",
              // Allow API calls to anchors and Stellar Horizon
              "connect-src 'self' https://horizon.stellar.org https://horizon-testnet.stellar.org https://*.moneygram.com https://stellar.moneygram.com https://*.yellowcard.io https://stellar.yellowcard.io https://api.yellowcard.io",
              // Script sources - uses nonce-based CSP instead of unsafe-inline
              `script-src 'self' 'nonce-${nonce}'`,
              // Style sources - keep unsafe-inline for CSS-in-JS libraries (can be refactored with CSS modules later)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images
              "img-src 'self' data: https: blob:",
              // Fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Object sources
              "object-src 'none'",
              // Base URI restriction
              "base-uri 'self'",
              // Form action restriction
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
