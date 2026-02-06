import { config } from 'dotenv';
import path from 'path';
config({ path: path.resolve(process.cwd(), '.env.local') });

import { connectDB } from './db';
import User from '../models/User';
import Booking from '../models/Booking';
import { hashPassword } from './auth';

async function seed() {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to database
        await connectDB();

        // Admin credentials from env or default
        const adminEmail = process.env.TEST_ADMIN_EMAIL || 'admin@aarambhamedia.com';
        const adminPassword = process.env.TEST_ADMIN_PASSWORD || 'Admin@123';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('✅ Admin user already exists');
        } else {
            // Create admin user
            const hashedPassword = await hashPassword(adminPassword);
            const admin = await User.create({
                name: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            console.log('✅ Admin user created:', admin.email);
        }

        // Regular user credentials from env or default
        const userEmail = process.env.TEST_USER_EMAIL || 'user@example.com';
        const userPassword = process.env.TEST_USER_PASSWORD || 'User@123';

        // Create a sample regular user
        const existingUser = await User.findOne({ email: userEmail });
        if (!existingUser) {
            const hashedUserPassword = await hashPassword(userPassword);
            const user = await User.create({
                name: 'John Doe',
                email: userEmail,
                password: hashedUserPassword,
                role: 'user',
            });
            console.log('✅ Sample user created:', user.email);
        }

        // Create sample bookings
        const bookingCount = await Booking.countDocuments();
        if (bookingCount === 0) {
            const sampleBookings = [
                {
                    customerName: 'Rahul & Priya',
                    customerEmail: 'rahul@example.com',
                    customerPhone: '+91 98765 43210',
                    eventDate: new Date('2026-04-15'),
                    eventType: 'Wedding',
                    eventLocation: 'Mumbai, Maharashtra',
                    packageSelected: 'gold' as const,
                    packagePrice: 56000,
                    status: 'confirmed' as const,
                    notes: 'Full day wedding coverage with candid photography',
                },
                {
                    customerName: 'Amit & Sneha',
                    customerEmail: 'amit@example.com',
                    customerPhone: '+91 98765 43211',
                    eventDate: new Date('2026-05-20'),
                    eventType: 'Pre-Wedding',
                    eventLocation: 'Goa',
                    packageSelected: 'pre-wedding-34000' as const,
                    packagePrice: 34000,
                    status: 'pending' as const,
                    notes: 'Beach location pre-wedding shoot',
                },
                {
                    customerName: 'Vikram & Anjali',
                    customerEmail: 'vikram@example.com',
                    customerPhone: '+91 98765 43212',
                    eventDate: new Date('2026-03-10'),
                    eventType: 'Wedding',
                    eventLocation: 'Pune, Maharashtra',
                    packageSelected: 'platinum' as const,
                    packagePrice: 86000,
                    status: 'completed' as const,
                    notes: 'Premium package with drone coverage',
                },
            ];

            await Booking.insertMany(sampleBookings);
            console.log('✅ Sample bookings created:', sampleBookings.length);
        } else {
            console.log('✅ Bookings already exist');
        }

        console.log('\n🎉 Database seeding completed successfully!\n');
        console.log('📧 Admin credentials:');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}\n`);
        console.log('📧 Sample user credentials:');
        console.log(`   Email: ${userEmail}`);
        console.log(`   Password: ${userPassword}\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seed();
