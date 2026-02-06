export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const mongoose = await import('mongoose');
        const User = (await import('@/models/User')).default;
        const bcrypt = await import('bcryptjs');

        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            console.error('Please define the MONGODB_URI environment variable inside .env.local');
            return;
        }

        try {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(MONGODB_URI);
                console.log('Connected to MongoDB in instrumentation');
            }

            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminEmail || !adminPassword) {
                console.log('Admin credentials not set in environment variables. Skipping auto-seed.');
                return;
            }

            const existingAdmin = await User.findOne({ emailOrPhone: adminEmail });

            if (!existingAdmin) {
                console.log('Seeding admin user...');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(adminPassword, salt);

                const newAdmin = new User({
                    emailOrPhone: adminEmail,
                    password: hashedPassword,
                    role: 'admin',
                    name: 'Admin User',
                });

                await newAdmin.save();
                console.log(`Admin user created with email: ${adminEmail}`);
            } else {
                console.log('Admin user already exists (instrumentation check)');
            }

        } catch (error) {
            console.error('Error in instrumentation register:', error);
        }
    }
}
