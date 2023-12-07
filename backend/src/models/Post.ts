import { Schema, model, Document, Types } from "mongoose";

export type PostDocument = Document & {
    author: Types.ObjectId,
    text: string,
    createdAt: Date,
    updatedAt: Date
};

const postSchema = new Schema<PostDocument>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Post = model<PostDocument>("post", postSchema);