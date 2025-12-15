import type {NextRequest} from "next/server";

import {createServerClient} from "@supabase/ssr";
import {NextResponse} from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({name, value, options}) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    const user = await supabase.auth.getUser();

    const onboardingCompleted = user.data.user?.user_metadata?.onboarding_completed;

    const protectedRoutes: `/${string}`[] = [];

    const onboardingRoute = "/letters/onboarding";

    if (
      !onboardingCompleted &&
      request.nextUrl.pathname !== onboardingRoute &&
      protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/letters/onboarding", request.url));
    } else if (
      onboardingCompleted &&
      request.nextUrl.pathname === onboardingRoute &&
      protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/letters", request.url));
    }

    if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && user.error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      (request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/signup")) &&
      user.data.user
    ) {
      return NextResponse.redirect(new URL("/letters", request.url));
    }

    return response;
  } catch (_e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
