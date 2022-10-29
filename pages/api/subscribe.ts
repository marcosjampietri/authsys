// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToMongo } from "../../server";
import user from "../../server/models/userModel";

const secretKey = <string>process.env["STRIPE_SECRET_KEY"];

const stripe = new Stripe(secretKey, {
  apiVersion: "2022-08-01",
});

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method != "POST") return res.status(400);
    const { id, name, email, paymentMethod, productId } = req.body;

    await connectToMongo();

    const User = await user.findOne({ email });
    if (!User)
      return res
        .status(400)
        .json({ status: "error", message: "User doesnt exist" });

    let customer;

    if (!User.stripe.id) {
      // Create a customer in case it doesnt exist
      customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethod,
        invoice_settings: { default_payment_method: paymentMethod },
      });
      await user.findByIdAndUpdate(
        id,
        {
          $set: {
            stripe: {
              id: customer.id,
              // subscriptions: [{ name: "", access: "" }],
            },
          },
        },
        { new: true }
      );
    } else {
      customer = await stripe.customers.retrieve(User.stripe.id);
    }

    console.log(customer);
    // get product
    const product = await stripe.products.retrieve(productId);
    const price = await stripe.prices.retrieve(<string>product!.default_price);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "gbp",
            product: productId,
            unit_amount: <number | undefined>price.unit_amount,
            recurring: {
              interval: <any>price.recurring?.interval,
            },
          },
        },
      ],

      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    // Send back the client secret for payment
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    console.log("INVOICE DO SUBSCRIBE", invoice);
    if (invoice.payment_intent) {
      const intent = invoice.payment_intent as Stripe.PaymentIntent;
      res.send({
        message: "Subscription successfully initiated",
        subscriptionId: subscription.id,
        clientSecret: intent.client_secret,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
