import { NextRequest, NextResponse } from "next/server"
import { isLoggedIn } from "./libs/auth"
import { getSession } from "./libs/session";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = await isLoggedIn()

  const session = await getSession()
  const today = new Date().getDate()
  
  if (today !== session.firstLoginDate) {
    session.isCheckedIn = false
    await session.save()
  }

  if (!isAuthenticated && path !== '/login' && path !== '/login/') {
    return NextResponse.redirect(new URL('/login', request.url))
  } else if (isAuthenticated && (path === '/login' || path === '/signup' || path === '/')) {
    return NextResponse.redirect(new URL('/workflows', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}