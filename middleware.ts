import { NextRequest, NextResponse } from "next/server";
import { Secret } from "jsonwebtoken";
import { jwtVerify } from "jose";

const secret = <string>process.env["JWT_TOKEN_SECRET"];

export async function middleware(req: NextRequest) {
  const daCookie = req.cookies.get("myTokenName");

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (daCookie) {
      try {
        await jwtVerify(daCookie, new TextEncoder().encode(secret));
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
        new TextEncoder().encode(secret)
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
  matcher: ["/protected/:path*", "/", "/login"],
};
