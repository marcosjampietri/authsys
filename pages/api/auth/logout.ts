import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const serialized = serialize("loginToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Logout successful",
  });
}
