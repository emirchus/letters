'use client';

import { Link } from 'next-view-transitions';
import { useTransition } from 'react';

import { signInWithEmail } from '@/app/supabase/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [isSignin, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await signInWithEmail(formData);
    });
  };

  return (
    <div className="relative h-screen flex-1 before:absolute before:inset-0 before:-z-10 before:bg-[size:14px_24px] before:[background:radial-gradient(125%_150%_at_50%_10%,hsl(var(--background)/.2)_50%,hsl(var(--muted-foreground))_100%)]">
      {/* Login Form */}
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="h-full w-full max-w-xl">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome back</h1>
            <p className="text-muted-foreground">Enter your email to sign in to your account</p>
          </div>
          <form
            className={cn(
              'relative h-1/2 space-y-4 border-x px-8 py-20',
              'after:bg-border after:absolute after:inset-0 after:left-1/2 after:h-[1px] after:w-screen after:-translate-x-1/2',
              'before:bg-border before:absolute before:inset-0 before:top-[100%] before:left-1/2 before:h-[1px] before:w-screen before:-translate-x-1/2'
            )}
            onSubmit={onSubmit}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                className=""
                disabled={isSignin}
                id="email"
                name="email"
                placeholder="m@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                className=""
                disabled={isSignin}
                id="password"
                name="password"
                placeholder="********"
                type="password"
              />
            </div>

            <Button className="w-full" disabled={isSignin} type="submit">
              {isSignin && <Spinner className="bg-primary-foreground" size="sm" />}
              Sign In
            </Button>
          </form>

          <div
            className={cn(
              'relative space-y-4 border-x p-8',
              'after:bg-border after:absolute after:inset-0 after:left-1/2 after:h-[1px] after:w-screen after:-translate-x-1/2',
              'before:bg-border before:absolute before:inset-0 before:top-[100%] before:left-1/2 before:h-[1px] before:w-screen before:-translate-x-1/2'
            )}
          >
            <p className="bg-background text-foreground absolute -top-3 left-1/2 z-10 mx-auto -translate-x-1/2 rounded-sm px-2 text-center">
              Or continue with
            </p>
            <Button disabled className="w-full" variant="secondary">
              Continue with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link replace className="text-primary/80 hover:text-primary" href="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
