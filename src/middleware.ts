import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl
  console.log("token", token)

  // If the user is not authenticated and trying to access protected routes, redirect to sign-in
  if (!token && url.pathname === "/" || url.pathname.startsWith("/dashboard")) {
    console.log("not homess")
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
  // If the user is authenticated and trying to access auth pages, redirect to home
  if (token && ["/sign-in", "/sign-up", "/verify"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/forgot-password", "/verify", "/dashboard/:path*", "/error"],
}
