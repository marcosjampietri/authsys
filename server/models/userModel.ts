import { model, Schema, Model, models, Document } from "mongoose";
import bcrypt from "bcrypt";
import orders from "./orderModel";

interface user extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    encryptPassword: any;
    validatePassword: any;
    address?: Object[];
    orders?: Object[];
}


const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: [Object],
        required: false,
    },
    orders: { type: [Schema.Types.ObjectId], ref: 'order', required: false },

});



userSchema.methods.encryptPassword = async function(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};


const user: Model<user> = models.user || model("user", userSchema);

export default user;


