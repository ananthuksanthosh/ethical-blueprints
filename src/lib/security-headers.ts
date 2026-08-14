/**
 * Security headers applied to every server response.
 *
 * Nothing here is secret: these are public, response-level security controls.
 * Keep the policy tight — only sources the portfolio actually uses are allowed.
 */

const isDev = import.meta.env.DEV;

// Google Fonts (stylesheet + font files) and Formspree (contact form POST) are
// the only third-party origins this site talks to. Everything else is 'self'.
const scriptSrc = ["'self'", "'unsafe-inline'", isDev ? "'unsafe-eval'" : ""].filter(Boolean);
const connectSrc = [
  "'self'",
  "https://formspree.io",
  isDev ? "ws:" : "",
  isDev ? "wss:" : "",
].filter(Boolean);

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  `connect-src ${connectSrc.join(" ")}`,
  "form-action 'self' https://formspree.io",
  // Allow the site itself and the Lovable preview/editor to frame the app;
  // arbitrary third-party framing (clickjacking) is blocked.
  "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  isDev ? "" : "upgrade-insecure-requests",
]
  .filter(Boolean)
  .join("; ");

export function applySecurityHeaders(response: Response, request?: Request): Response {
  const headers = new Headers(response.headers);

  headers.set("Content-Security-Policy", contentSecurityPolicy);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  );
  headers.set("Cross-Origin-Opener-Policy", "same-origin");

  // HSTS only makes sense once the response is actually served over HTTPS.
  const isHttps =
    !!request &&
    (new URL(request.url).protocol === "https:" ||
      request.headers.get("x-forwarded-proto") === "https");
  if (isHttps && !isDev) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
