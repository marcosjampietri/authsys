import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { productsList } from "./server/products";

export async function middleware(req: NextRequest) {
  // const secret = process.env.JWT_TOKEN_SECRET;
  const daCookie = req.cookies.get("loginToken");

  const allCookies = productsList.map(({ id }) => {
    const c = { name: id, token: req.cookies.get(id) };
    return c;
  });

  const dynamicPath = productsList.find(
    ({ id }) => `/paid/product/${id}/` == req.nextUrl.pathname
  );

  const dynaminCookie = allCookies.find(
    ({ name, token }) => dynamicPath?.id == name
  );

  console.log(dynamicPath?.id, req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (daCookie) {
      try {
        const { payload } = await jwtVerify(
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
  } else if (
    req.nextUrl.pathname.startsWith(`/paid/product/${dynamicPath?.id}`)
  ) {
    if (!daCookie) {
      console.log("doesnt have paidcookie and tried paid page");
      return NextResponse.redirect(new URL("/payment", req.url));
    } else {
      if (!dynaminCookie?.token) {
        console.log("doesnt have paidcookie and tried paid product");
        return NextResponse.redirect(new URL("/payment", req.url));
      } else {
        try {
          await jwtVerify(
            dynaminCookie?.token,
            new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
          );
          console.log("has valid paidcookie and access to product");
          return NextResponse.next();
        } catch (error) {
          console.log("has invalid/expired cookie and tried product");
          return NextResponse.redirect(new URL("/payment", req.url));
        }
      }
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
        // console.log(payload);
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
  matcher: [
    "/",
    "/protected/:path*",
    "/login/:path*",
    "/payment/:path*",
    "/paid/:path*",
  ],
};
