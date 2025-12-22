import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    createdAt: Date;
}

const InquirySchema: Schema = new Schema<IInquiry>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        message: { type: String, required: true, trim: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const Inquiry: Model<IInquiry> =
    mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
