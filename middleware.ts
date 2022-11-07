import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { productsList } from "./server/products";
import type { user } from "./server/models/userModel";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  // const secret = process.env.JWT_TOKEN_SECRET;
  const daCookie = req.cookies.get("loginToken");

  const dynamicPath = productsList.find(
    ({ id }) => `/paid/product/${id}/` == req.nextUrl.pathname
  );

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
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      try {
        const { payload } = await jwtVerify(
          daCookie,
          new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
        );

        const url =
          process.env["NODE_ENV"] === "development"
            ? "http://localhost:3000"
            : "https://authsys.vercel.app";
        const userUrl = () => `${url}/api/users/user`;

        // console.log("URL usada na API", userUrl());

        const res = await fetch(userUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ _id: payload._id }),
        });

        const dbUser: user = await res.json();

        // console.log("usuário recuperado", dbUser);

        const subscription = await dbUser.stripe.subscriptions.find(
          ({ name }) => `/paid/product/${name}/` == req.nextUrl.pathname
        );

        const accessToken = <string>subscription?.access;

        const { payload: PL } = await jwtVerify(
          accessToken,
          new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
        );
        console.log("payload do token do produto", PL);
        console.log("has valid paidcookie and access to product");
        return NextResponse.next();
      } catch (error) {
        console.log("has invalid/expired cookie and tried product");
        return NextResponse.redirect(new URL("/payment", req.url));
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
    "/protected/:path*",
    "/login/:path*",
    "/payment/:path*",
    "/paid/:path*",
  ],
};
