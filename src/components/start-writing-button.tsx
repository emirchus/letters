import { PenTool } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { TextScramble } from './text-scramble';
import { Button } from './ui/button';

export async function StartWritingButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const url = data.user ? `/letters/` : '/login';

  return (
    <Button asChild>
      <Link className="grid grid-cols-3 w-40 items-center justify-center" href={url}>
        <TextScramble as="span" className="w-full col-span-2">
          Start Writing
        </TextScramble>
        <PenTool className="size-6 col-span-1" />
      </Link>
    </Button>
  );
}
