import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ดึงค่า Token จาก Cookies
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname; // ดึง Path ปัจจุบัน

  // ป้องกันผู้ใช้ที่ล็อกอินแล้วเข้า "/login"
  if (token && url === "/login") {
    return NextResponse.redirect(new URL("/menu", request.url));
  }

  // ป้องกันการเข้าถึง Protected Routes ถ้าไม่มี Token
  const protectedPaths = ["/menu", "/dashboard", "/profile", "/sendTextFuture", "/review"];
  const isProtectedRoute = protectedPaths.some((path) => url.startsWith(path));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ดำเนินการต่อ
  return NextResponse.next();
}

// ใช้ Middleware กับเส้นทางที่ต้องการป้องกัน
export const config = {
  matcher: ["/menu/:path*", "/dashboard/:path*", "/profile/:path*", "/sendTextFuture/:path*", "/review/:path*", "/login"],
};
