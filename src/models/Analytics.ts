import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalytics extends Document {
    type: 'page_view' | 'click' | 'form_submit';
    action: string; // URL for page views, Identifier for clicks/forms
    metadata?: Record<string, unknown>;
    userId?: string; // Optional linkage to user
    createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
    {
        type: {
            type: String,
            required: true,
            enum: ['page_view', 'click', 'form_submit'],
        },
        action: {
            type: String,
            required: true,
            trim: true,
        },
        metadata: {
            type: Schema.Types.Mixed,
        },
        userId: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // Only createdAt needed
    }
);

// Prevent overwrite model error in development
if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Analytics;
}

const Analytics: Model<IAnalytics> =
    mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
