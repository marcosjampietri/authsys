import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from "jsonwebtoken";
import { serialize } from "cookie";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToMongo();
    const { _id } = req.body;

    const paidUser = await user.findOne({ _id });
    if (!paidUser)
      return res
        .status(400)
        .json({ status: "error", message: "User doesnt exist" });

    const subscriptions = paidUser!.stripe.subscriptions.map((item: any) => {
      const token = item.access;
      const product = item.name;

      const serialized = serialize(product, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 2,
        path: "/",
      });
      return serialized;
    });

    if (!subscriptions)
      return res.status(400).json({
        status: "error",
        message: "user is not subcribed to this service",
      });

    res.setHeader("Set-Cookie", subscriptions).send({});
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
