import { model, Schema, Model, models, Document } from "mongoose";

interface product extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProdSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const products: Model<product> =
  models.products || model("products", ProdSchema);

export default products;
