import { PenTool } from "lucide-react";
import Link from "next/link";
import React from "react";

import { createClient } from "@/lib/supabase/server";
import { TextScramble } from "./text-scramble";
import { Button } from "./ui/button";

export async function StartWritingButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const url = data.user?.id ? `/letters/${data.user.id}` : "/login";

  return (
    <Button asChild>
      <Link className="flex w-40 flex-row items-start justify-start" href={url}>
        <TextScramble as="span" className="mx-auto">
          Start Writing
        </TextScramble>
        <PenTool className="ml-auto h-6 w-6" />
      </Link>
    </Button>
  );
}
