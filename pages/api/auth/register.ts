import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import jwt, { Secret } from "jsonwebtoken";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";
import { serialize } from "cookie";
import { userInfoType } from "../../../types";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToMongo();
    let { name, email, password } = req.body;

    const logUser = await user.findOne({ email });
    if (logUser) {
      res.status(422).json({ status: "error", message: "User Already exists" });
    }

    const newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
    });

    newUser.password = await newUser.encryptPassword(newUser.password);

    const savedUser = await newUser.save();

    const secret = <Secret>process.env["JWT_TOKEN_SECRET"];

    const token = jwt.sign({ _id: savedUser._id }, secret, {
      algorithm: "HS256",
      expiresIn: 60 * 60 * 24 * 1,
      // expiresIn: 10,
    });

    const serialized = serialize("loginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized).send({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      address: savedUser.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
