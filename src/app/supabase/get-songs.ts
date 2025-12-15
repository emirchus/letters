'use server';

import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { unstable_cache } from '@/lib/unstable-cache';

export const getSongs = async () => {
  const supabase = await createClient();

  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    return [];
  }

  return unstable_cache(
    async () => {
      const { data } = await supabase.from('songs').select('*').eq('user_id', user.user?.id);

      return data;
    },
    ['songs', user.user?.id],
    {
      revalidate: 60 * 60 * 24,
      tags: ['songs'],
    }
  )();
};
