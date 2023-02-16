import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: false
    },
    favorites: [{
        type: ObjectId, ref: "Properties",
    }],
    role: {
        type: String,
        default: "user",
        enum: ["user", "local", "admin"]
    },
})

export default model("User", UserSchema);