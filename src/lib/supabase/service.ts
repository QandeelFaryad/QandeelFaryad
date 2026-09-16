import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./config";

const SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function isServiceConfigured() {
  return Boolean(SUPABASE_URL && SECRET_KEY);
}

/**
 * Full-access client for trusted server code only (form submissions, CV uploads).
 * It bypasses row level security, so never use it with visitor-controlled queries.
 */
export function createServiceClient() {
  return createClient(SUPABASE_URL, SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
