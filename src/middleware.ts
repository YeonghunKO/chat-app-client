import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  console.log("cookies in middleware", cookies);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/"],
};
