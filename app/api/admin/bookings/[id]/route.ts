import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import Booking from '@/models/Booking';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin();
        await connectDB();

        const { id } = await params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ booking });
    } catch (error: any) {
        console.error('Get booking error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin();
        await connectDB();

        const { id } = await params;
        const body = await request.json();

        const booking = await Booking.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error: any) {
        console.error('Update booking error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while updating booking' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin();
        await connectDB();

        const { id } = await params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Booking deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete booking error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while deleting booking' },
            { status: 500 }
        );
    }
}
