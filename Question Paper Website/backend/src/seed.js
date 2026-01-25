const User = require('./models/User');
const connectDB = require('./config/database');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminExists = await User.findOne({ role: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const admin = await User.create({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL || 'admin@college.edu',
            password: process.env.ADMIN_PASSWORD || 'Admin@123',
            role: 'admin',
            isActive: true
        });

        console.log('Admin user created successfully:', admin.email);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
