import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { myTokenName } = req.cookies;
    if (!myTokenName) {
      console.log("no Token");
      return res
        .status(401)
        .json({ status: "error", message: "not logged in" });
    }

    const serialized = serialize("myTokenName", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: false,
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
