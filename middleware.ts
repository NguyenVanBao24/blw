import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Đọc cookie từ request
  const isLoggedIn = req.cookies.get('isLoggedIn')?.value;

  // Nếu chưa đăng nhập, redirect về trang login
  if (!isLoggedIn || isLoggedIn !== 'true') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: [
    // '/user', '/send', '/list-send', '/'
  ],
};
