"use server";

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { unstable_cache } from "@/lib/unstable-cache";

export const getSong = async (id: string) => {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return unstable_cache(
    async () => {
      const { data } = await supabase.from("songs").select("*").eq("user_id", user.user?.id).eq("id", id).single();

      return data;
    },
    ["songs", "song", id, user.user?.id],
    {
      revalidate: 60 * 60 * 24,
      tags: ["song"],
    }
  )();
};
