import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
    try {
        await requireAdmin();
        await connectDB();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const packageFilter = searchParams.get('package') || '';

        // Build query
        const query: any = {};
        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { customerEmail: { $regex: search, $options: 'i' } },
            ];
        }
        if (status) {
            query.status = status;
        }
        if (packageFilter) {
            query.packageSelected = packageFilter;
        }

        // Get total count
        const total = await Booking.countDocuments(query);

        // Get bookings with pagination
        const bookings = await Booking.find(query)
            .sort({ eventDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({
            bookings,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        console.error('Get bookings error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while fetching bookings' },
            { status: 500 }
        );
    }
}
