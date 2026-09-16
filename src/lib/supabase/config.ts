/** Supabase connection settings. Everything degrades gracefully when these are unset. */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once the project URL and publishable key are set. */
export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}
