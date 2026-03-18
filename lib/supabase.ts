import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET;

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
export const hasSupabaseServiceEnv = Boolean(supabaseUrl && supabaseServiceRoleKey);
export const hasSupabaseStorageEnv = Boolean(hasSupabaseServiceEnv && supabaseStorageBucket);

export const getSupabaseBrowserClient = () => {
  if (!hasSupabaseEnv || !supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const getSupabaseServerClient = getSupabaseBrowserClient;

export const getSupabaseAdminClient = () => {
  if (!hasSupabaseServiceEnv || !supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const getSupabaseStorageBucket = () => supabaseStorageBucket || null;
