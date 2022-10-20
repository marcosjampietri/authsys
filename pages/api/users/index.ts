import { NextApiRequest, NextApiResponse } from "next";

import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index"

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()

        const allUsers = await user.find();

        res.send(allUsers);
    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}