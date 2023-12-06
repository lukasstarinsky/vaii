import { Schema, model, Document } from "mongoose";

export enum UserRole {
    USER,
    MODERATOR,
    ADMINISTRATOR
};

export type UserDocument = Document & {
    username: string,
    email: string,
    password: string,
    role: UserRole
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
    },
    role: {
        type: Number,
        requried: true,
        default: UserRole.USER
    }
}, { timestamps: true });

export const User = model<UserDocument>("user", userSchema);