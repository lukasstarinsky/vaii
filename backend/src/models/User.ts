import { Schema, model, Document } from "mongoose";

export type UserDocument = Document & {
    username: string,
    email: string,
    password: string,
};

const userSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const User = model<UserDocument>("user", userSchema);