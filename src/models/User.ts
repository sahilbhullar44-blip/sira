import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Add fields to Interface
export interface IUser extends Document {
    emailOrPhone: string;
    password?: string; // Optional because existing users might not have it yet (or for OAuth later)
    role: 'user' | 'admin';
    name?: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        emailOrPhone: {
            type: String,
            required: true,
            trim: true,
            index: { unique: true },
        },
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        name: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting the model if it's already compiled
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
