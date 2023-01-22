import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/signup") || req.nextUrl.pathname.startsWith("/signin");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/browse", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/signin", "/signup", "/browse"],
};
