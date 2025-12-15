"use server";

import "server-only";

import {RedirectType} from "next/navigation";

import {createClient} from "@/lib/supabase/server";
import {encodedRedirect} from "@/lib/utils";

export async function uploadAvatar(file: File) {
  const supabase = await createClient();

  const {
    data: {user},
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return encodedRedirect(
      "error",
      "/letters/onboarding",
      error?.message ?? "Something went wrong",
      {
        type: RedirectType.replace,
      },
    );
  }

  const fileName = file.name;

  const {error: uploadError} = await supabase.storage
    .from("avatars")
    .upload(`${user.id}/${user.id}.${fileName.split(".").pop()}`, file, {
      upsert: true,
    });

  if (uploadError) {
    return encodedRedirect("error", "/letters/onboarding", uploadError.message, {
      type: RedirectType.replace,
    });
  }

  const {data} = supabase.storage
    .from("avatars")
    .getPublicUrl(`${user.id}/${user.id}.${fileName.split(".").pop()}`);

  await supabase.auth.updateUser({
    data: {
      avatar_url: data.publicUrl,
    },
  });
}
