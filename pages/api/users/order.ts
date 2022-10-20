import { NextApiRequest, NextApiResponse } from "next";

import order from "../../../server/models/orderModel";
import user from "../../../server/models/userModel";
import { connectToMongo } from "../../../server/index";

export default async function orders(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToMongo()

        let { yourCart, userInfo } = req.body;

        const itemsPrice = yourCart
            .map((product: any): number => product.price * product.quantity)
            .reduce((a: any, b: any) => a + b, 0) * 100
        const shippingPrice = itemsPrice * 0.05;
        const taxPrice = itemsPrice * 0.15;
        const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

        const newOrder = new order({
            user: userInfo._id,
            orderItems: [...yourCart],
            paymentMethod: "card",
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,

        });

        const { _id } = await newOrder.save();

        await user.findByIdAndUpdate(userInfo._id, { $push: { orders: _id } }, { new: true });

        res.send(_id);

    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}