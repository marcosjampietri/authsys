import { model, Schema, Model, models, Document } from "mongoose";

interface order extends Document {
  user: object;
  orderItems: object[];
  paymentMethod: string;
  paymentResult: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  orderItems: [
    {
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: false },
      price: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },
  paymentResult: { id: String, status: String, email_address: String },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  deliveredAt: { type: Date },
});

const orders: Model<order> = models.orders || model("orders", OrderSchema);

export default orders;
