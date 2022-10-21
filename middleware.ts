import { NextRequest, NextResponse } from "next/server";
import { Secret } from "jsonwebtoken";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  // const secret = process.env.JWT_TOKEN_SECRET;
  const daCookie = req.cookies.get("myTokenName");

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (daCookie) {
      try {
        await jwtVerify(
          daCookie,
          new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
        );
        return NextResponse.redirect(new URL("/protected", req.url));
      } catch (error) {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  } else {
    if (!daCookie) return NextResponse.redirect(new URL("/login", req.url));
    try {
      const { payload } = await jwtVerify(
        daCookie,
        new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
      );
      // console.log({ payload });
      return NextResponse.next();
    } catch (error) {
      // console.log("deu merda");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/protected/:path*", "/", "/login/:path*"],
};
