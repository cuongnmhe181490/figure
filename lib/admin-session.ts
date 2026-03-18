const sessionSecret = process.env.ADMIN_SESSION_SECRET || "change-this-secret";
const encoder = new TextEncoder();

export const adminSessionCookieName = "figure_admin_session";
export const adminSessionMaxAgeSeconds = 60 * 60 * 24 * 7;

async function getSigningKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function signPayload(payload: string) {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSession(email: string) {
  const expiresAt = Date.now() + adminSessionMaxAgeSeconds * 1000;
  const payload = `${email}:${expiresAt}`;
  const signature = await signPayload(payload);
  return `${encodeURIComponent(payload)}.${signature}`;
}

export async function verifyAdminSession(sessionValue?: string | null) {
  if (!sessionValue) return false;

  const [encodedPayload, signature] = sessionValue.split(".");
  if (!encodedPayload || !signature) return false;

  const payload = decodeURIComponent(encodedPayload);
  const expectedSignature = await signPayload(payload);
  if (signature !== expectedSignature) return false;

  const parts = payload.split(":");
  const expiresAt = Number(parts.at(-1));

  if (!Number.isFinite(expiresAt)) return false;
  return expiresAt > Date.now();
}
