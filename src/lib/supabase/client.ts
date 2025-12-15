import "react";

import {createBrowserClient} from "@supabase/ssr";
import {SupabaseClient} from "@supabase/supabase-js";

export type SupabaseClientTyped = SupabaseClient;

let supabaseClient: SupabaseClientTyped;

function createClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }

  return supabaseClient;
}

export const supabase = createClient();
