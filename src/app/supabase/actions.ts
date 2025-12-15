'use server';

import { revalidatePath } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { encodedRedirect } from '@/lib/utils';

export const signInWithEmail = async (data: FormData) => {
  const supabase = await createClient();

  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/login', error.message, {
      type: RedirectType.replace,
    });
  }

  return redirect('/letters');
};

export const signUpWithEmail = async (form: FormData) => {
  const supabase = await createClient();

  const email = form.get('email') as string;
  const password = form.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/letters/onboarding`,
    },
  });

  if (error) {
    return encodedRedirect('error', '/signup', error.message, {
      type: RedirectType.replace,
    });
  }

  return redirect('/login');
};

export const updateUserData = async (data: FormData) => {
  const supabase = await createClient();

  const name = data.get('name') as string;
  const avatar = data.get('avatar') as string;

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
      avatar_url: avatar,
    },
  });

  if (error) {
    return encodedRedirect('error', '/letters', error.message, {
      type: RedirectType.replace,
    });
  }

  revalidatePath('/letters', 'layout');
};

export const signOutAction = async () => {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');

  return redirect('/');
};
