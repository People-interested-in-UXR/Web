import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  console.log(cookies().getAll());
  if (request.nextUrl.pathname.startsWith("/sign-in")) {
    await updateSession(request);

    if (cookies().has("_ui"))
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`)
      );
    return NextResponse.next();
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
