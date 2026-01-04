import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    subtitle?: string;
    tagline?: string;
    description?: string;

    date: Date;
    doorsOpenTime?: string;
    timeString?: string;
    location: string; // Keep for backward compatibility or simple display
    venue?: string;

    coordinates?: {
        lat: number;
        lng: number;
    };
    imageUrl?: string;
    contactInfo?: string;
    status: "upcoming" | "past";

    ticketUrl?: string;
    themeColor?: string;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true, trim: true },
        subtitle: { type: String },
        tagline: { type: String },
        description: { type: String },

        date: { type: Date, required: true },
        doorsOpenTime: { type: String },
        timeString: { type: String },
        location: { type: String, required: true },
        venue: { type: String },

        coordinates: {
            lat: { type: Number },
            lng: { type: Number },
        },

        imageUrl: { type: String },
        contactInfo: { type: String },

        ticketUrl: { type: String },
        themeColor: { type: String, default: "red" },
        status: {
            type: String,
            enum: ["upcoming", "past"],
            default: "upcoming",
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to update status based on date
EventSchema.pre('save', function (this: IEvent) {
    if (this.date < new Date()) {
        this.status = 'past';
    } else {
        this.status = 'upcoming';
    }
});

// Prevent overwrite model error in development
if (process.env.NODE_ENV === "development") {
    delete mongoose.models.Event;
}

const Event: Model<IEvent> =
    mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
