import { Schema, model, Document, Types } from "mongoose";

export type BanDocument = Document & {
    from: Types.ObjectId,
    user: Types.ObjectId,
    reason: string,
    createdAt: Date,
    updatedAt: Date,
    dateTo: Date
};

const banSchema = new Schema<BanDocument>({
    from: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
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