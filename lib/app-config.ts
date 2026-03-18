import { hasSupabaseServiceEnv, hasSupabaseStorageEnv } from "@/lib/supabase";

export const hasAdminCredentials = Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
export const hasAdminSessionSecret = Boolean(process.env.ADMIN_SESSION_SECRET);
export const isProduction = process.env.NODE_ENV === "production";

export const appConfigSummary = {
  hasSupabaseServiceEnv,
  hasSupabaseStorageEnv,
  hasAdminCredentials,
  hasAdminSessionSecret,
};
