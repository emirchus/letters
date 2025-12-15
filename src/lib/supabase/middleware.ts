import { CookieOptionsWithName, createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptionsWithName }[]) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );

    // const user = await supabase.auth.getUser();

    // const publicPaths: `/${string}`[] = ['/register', '/login', '/oauth/mercadopago', '/orders'];
    // const nextUrl = request.nextUrl;

    // if (!publicPaths.some(route => nextUrl.pathname.startsWith(route)) && user.error) {
    //   if (!user.error) {
    //     return NextResponse.redirect(new URL('/', request.url));
    //   }
    //   if (nextUrl.pathname.startsWith('/oauth/mercadopago')) {
    //     const encodedUrl = encodeURIComponent(nextUrl.toString());
    //     const nextUrlWithCallbackUrl = new URL(`/login`, request.url);

    //     nextUrlWithCallbackUrl.searchParams.set('callbackUrl', encodedUrl);

    //     return NextResponse.redirect(nextUrlWithCallbackUrl);
    //   }

    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    return response;
  } catch (_e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
