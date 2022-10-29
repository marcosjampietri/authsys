import { NextApiRequest, NextApiResponse } from "next";
import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { _id } = req.body;

  try {
    await connectToMongo();

    const User = await user.findById(_id);

    // console.log("api do user", User);

    res.send(User);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
