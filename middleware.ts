import { locales } from "./lib/i18n";

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 处理 CORS
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/api')) {
    // TODO:Paddle webhook（/api/payment/webhook） 的处理逻辑

    const origin = request.headers.get('origin');
    const allowedOrigin = `chrome-extension://${process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID}`;

    // 检查请求是否来自允许的 Chrome 扩展
    if (origin === allowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }

    return response;
  }

  // 多语言处理
  const { pathname } = request.nextUrl;

  const isExit = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (isExit) return;

  request.nextUrl.pathname = `/`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|terms|.*\\.(?:txt|xml|ico|png|jpg|jpeg|svg|gif|webp|js|css|woff|woff2|ttf|eot)).*)'
  ]
};