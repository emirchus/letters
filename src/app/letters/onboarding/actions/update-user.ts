"use server";

import "server-only";

import {createClient} from "@/lib/supabase/server";
import {encodedRedirect} from "@/lib/utils";

export async function updateUser(formData: FormData) {
  const supabase = await createClient();

  const {error} = await supabase.auth.getUser();

  if (error) {
    return encodedRedirect("error", "/", error.message);
  }

  const {name, musicPreference, genres, musicPlatform} = Object.fromEntries(formData.entries());

  await supabase.auth.updateUser({
    data: {
      name,
      onboarding_completed: true,
      music_preference: musicPreference,
      genres: JSON.parse(genres as string),
      music_platform: musicPlatform,
    },
  });
}
