import { Schema, model, Document, Types } from "mongoose";

export type ThreadDocument = Document & {
    author: Types.ObjectId,
    post: Types.ObjectId,
    title: string,
    category: string,
    posts: Types.ObjectId[],
    views: number,
    createdAt: Date,
    updatedAt: Date
};

const threadSchema = new Schema<ThreadDocument>({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "post"
    }],
    views: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: true });

export const Thread = model<ThreadDocument>("thread", threadSchema);