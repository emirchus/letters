"use client";

import { Link } from "next-view-transitions";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signUpWithEmail } from "../supabase/actions";

export default function LoginPage() {
  const [isSignin, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await signUpWithEmail(formData);
    });
  };

  return (
    <div className="h-screen">
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="h-full w-full max-w-xl">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Create an account</h1>
            <p className="text-muted-foreground">Enter your email to create an account</p>
          </div>
          <form
            onSubmit={onSubmit}
            className={cn(
              "relative h-1/2 space-y-4 border-x px-8 py-20",
              "after:absolute after:inset-0 after:left-1/2 after:h-[1px] after:w-screen after:-translate-x-1/2 after:bg-border",
              "before:absolute before:inset-0 before:left-1/2 before:top-[100%] before:h-[1px] before:w-screen before:-translate-x-1/2 before:bg-border"
            )}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                disabled={isSignin}
                required
                className=""
                id="email"
                placeholder="m@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                disabled={isSignin}
                required
                className=""
                id="password"
                placeholder="********"
                type="password"
              />
            </div>
            <Button disabled={isSignin} className="w-full" type="submit">
              {isSignin && <Spinner size="sm" className="bg-primary-foreground" />}
              Sign Up
            </Button>
            {/* <Button className="w-full" variant="link">

            </Button> */}
          </form>

          <div
            className={cn(
              "relative space-y-4 border-x p-8",
              "after:absolute after:inset-0 after:left-1/2 after:h-[1px] after:w-screen after:-translate-x-1/2 after:bg-border",
              "before:absolute before:inset-0 before:left-1/2 before:top-[100%] before:h-[1px] before:w-screen before:-translate-x-1/2 before:bg-border"
            )}
          >
            <p className="absolute -top-3 left-1/2 z-10 mx-auto -translate-x-1/2 rounded-sm bg-background px-2 text-center text-foreground">
              Or continue with
            </p>
            <Button disabled className="w-full" variant="secondary">
              Continue with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link replace className="hover:text-primary-300 text-primary" href="/login">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
