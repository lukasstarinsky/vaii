import { Schema, model, Document, Types } from "mongoose";

export type ThreadDocument = Document & {
    author: Types.ObjectId,
    title: string,
    category: string,
    description: string,
    posts: Types.ObjectId[],
    createdAt: Date,
    updatedAt: Date
};

const threadSchema = new Schema<ThreadDocument>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "post"
    }]
}, { timestamps: true });

export const Thread = model<ThreadDocument>("thread", threadSchema);