import { NextApiRequest, NextApiResponse } from "next";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index"

export default async function address(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const { id, userAddress } = await req.body;

        console.log(req.body)

        const savedUser = await user.findByIdAndUpdate(id, { $push: { address: userAddress } }, { new: true });

        res.status(200).send(savedUser);

    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}