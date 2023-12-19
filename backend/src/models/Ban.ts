import { Schema, model, Document, Types } from "mongoose";

export type BanDocument = Document & {
    user: Types.ObjectId,
    reason: string,
    createdAt: Date,
    updatedAt: Date,
    dateTo: Date
};

const banSchema = new Schema<BanDocument>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    reason: {
        type: String,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const Ban = model<BanDocument>("ban", banSchema);