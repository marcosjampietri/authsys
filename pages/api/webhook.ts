import jwt, { Secret } from "jsonwebtoken";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { connectToMongo } from "../../server";
import user from "../../server/models/userModel";

export const config = {
  api: {
    bodyParser: false,
  },
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);

    const signingSecret = process.env["STRIPE_SIGNIN_SECRET"] as string;
    const secretKey = process.env["STRIPE_SECRET_KEY"] as string;
    const sig = req.headers["stripe-signature"] as string | Buffer | string[];
    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-08-01",
    });

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, signingSecret);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        // Note that you'll need to add an async prefix to this route handler
        const { line_items } = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items"],
          }
        );
      case "payment_intent.succeeded":
        // Then define and call a function to handle the event payment_intent.succeeded
        const pi = event.data.object;

        await connectToMongo();

        const User = await user.findOne({ stripe: { id: pi.customer } });
        const secret = <Secret>process.env["JWT_TOKEN_SECRET"];

        let token = jwt.sign({ id: User!._id }, secret, {
          algorithm: "HS256",
          expiresIn: 60 * 60 * 24 * 1,
        });
        // const product = line_items!.data[0].description;
        const invoice = await stripe.invoices.retrieve(pi.invoice);
        const product = invoice.lines.data[0].price!.product;
        console.log(product);

        const existingProduct =
          User!.stripe.subscriptions.filter((e) => e.name == product).length >
          0;

        if (existingProduct) {
          await user.findByIdAndUpdate(
            User!._id,
            { $set: { "stripe.subscriptions.$[x].access": token } },
            { arrayFilters: [{ "x.name": product }], new: true }
          );
        } else {
          await user.findByIdAndUpdate(User!._id, {
            $push: {
              "stripe.subscriptions": {
                name: product,
                access: token,
              },
            },
          });
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send("tudo certo");
    // Code here
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
