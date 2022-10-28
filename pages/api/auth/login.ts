import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import { serialize } from "cookie";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToMongo();
    let { email, password } = req.body;

    const logUser = await user.findOne({ email });
    if (!logUser)
      return res
        .status(400)
        .json({ status: "error", message: "User doesnt exist" });

    const matchPass = await logUser.validatePassword(password);
    if (!matchPass)
      return res
        .status(401)
        .json({ status: "error", message: "wrong password" });

    const secret = <Secret>process.env["JWT_TOKEN_SECRET"];
    const token = jwt.sign({ _id: logUser._id }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 24 * 1,
    });

    const serialized = serialize("loginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized).send({
      _id: logUser._id,
      name: logUser.name,
      email: logUser.email,
      address: logUser.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
