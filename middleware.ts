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
        console.log("has valid cookie and tried login");
        return NextResponse.redirect(new URL("/protected", req.url));
      } catch (error) {
        console.log("has invalid cookie");
        return NextResponse.next();
      }
    } else {
      console.log("doesnt have cookie");
      return NextResponse.next();
    }
  } else {
    if (!daCookie) {
      console.log("doesnt have cookie and tried protected page");
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      try {
        const { payload } = await jwtVerify(
          daCookie,

          new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
        );
        console.log("has valid cookie and access");
        return NextResponse.next();
      } catch (error) {
        console.log("has invalid cookie and tried protected page");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }
}

export const config = {
  matcher: ["/protected/:path*", "/", "/login/:path*"],
};
