import { model, Schema, Model, models, Document } from "mongoose";
import bcrypt from "bcrypt";
import orders from "./orderModel";

export interface user extends Document {
  name: string;
  email: string;
  password: string;
  encryptPassword: any;
  validatePassword: any;
  stripe: { id: string; subscriptions: [{ name: string; access: string }] };
  address?: Object[];
  orders?: Object[];
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: [Object],
    required: false,
  },
  stripe: {
    id: { type: String, required: false },
    subscriptions: [
      {
        name: { type: String, required: false },
        access: { type: String, required: false },
      },
    ],
  },
  // orders: { type: [Schema.Types.ObjectId], ref: "order", required: false },
});

userSchema.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const user: Model<user> = models.user || model("user", userSchema);

export default user;
