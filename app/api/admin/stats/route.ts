import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import User from '@/models/User';
import Booking from '@/models/Booking';

export async function GET() {
    try {
        await requireAdmin();
        await connectDB();

        // Get statistics
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalRegularUsers = await User.countDocuments({ role: 'user' });

        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
        const completedBookings = await Booking.countDocuments({ status: 'completed' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

        // Calculate total revenue
        const revenueResult = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$packagePrice' },
                },
            },
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get upcoming bookings
        const upcomingBookings = await Booking.find({
            eventDate: { $gte: new Date() },
            status: { $in: ['pending', 'confirmed'] },
        })
            .sort({ eventDate: 1 })
            .limit(5);

        return NextResponse.json({
            stats: {
                users: {
                    total: totalUsers,
                    admins: totalAdmins,
                    regular: totalRegularUsers,
                },
                bookings: {
                    total: totalBookings,
                    pending: pendingBookings,
                    confirmed: confirmedBookings,
                    completed: completedBookings,
                    cancelled: cancelledBookings,
                },
                revenue: {
                    total: totalRevenue,
                },
            },
            recentUsers,
            upcomingBookings,
        });
    } catch (error: any) {
        console.error('Get stats error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while fetching statistics' },
            { status: 500 }
        );
    }
}
