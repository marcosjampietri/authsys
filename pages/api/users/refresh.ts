import { NextApiRequest, NextApiResponse } from "next";

import user from "../../../server/models/userModel";
import order from "../../../server/models/orderModel";
import { connectToMongo } from "../../../server/index"

export default async function refresh(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()
        const { id } = await req.body;

        const token = req.headers['authorization']

        const refreshedUser = await user.findById(id);

        const { _id, name, email, address, orders } = refreshedUser!

        let orderIDs = orders!.map((s) => s.toString());

        const ordersPlaced = await order.find({ '_id': { $in: orderIDs } });

        res.send({ token, _id, name, email, address, orders: ordersPlaced });

        // console.log(`refresh.ts rodou com fresh Info: ${refreshedUser} e headers ${token}`);

    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
}