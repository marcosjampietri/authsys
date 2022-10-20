import { verify, Secret } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

const secret = <Secret>process.env["JWT_TOKEN_SECRET"];

export default async function profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }
  try {
    const payload = await verify(myTokenName, secret);

    console.log(payload);
    await connectToMongo();

    const profile = await user.findById(payload);
    const { _id, name, email, address, orders } = profile!;
    // let orderIDs = orders!.map((s) => s.toString());
    // const ordersPlaced = await order.find({ '_id': { $in: orderIDs } });
    // res.send({ _id, name, email, address, orders: ordersPlaced });
    res.send({ _id, name, email, address, orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }

  return res.status(200);
}
