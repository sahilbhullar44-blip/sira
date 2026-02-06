import User from '@/models/User';
import dbConnect from '@/lib/db';
import bcrypt from 'bcryptjs';

export * from './session';

export async function login(credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    await dbConnect();
    const user = await User.findOne({ emailOrPhone: email }).select('+password');

    if (!user) {
        throw new Error('Invalid credentials');
    }

    if (!user.password) {
        throw new Error('Please login with your social account');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Check if user is admin
    if (user.role !== 'admin') {
        throw new Error('Unauthorized');
    }

    return user;
}
