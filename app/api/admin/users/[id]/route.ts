import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin();
        await connectDB();

        const { id } = await params;
        const user = await User.findById(id).select('-password');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error: any) {
        console.error('Get user error:', error);

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
        const { name, email, role, password } = body;

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password) {
            user.password = await hashPassword(password);
        }

        await user.save();

        const updatedUser = await User.findById(id).select('-password');

        return NextResponse.json({
            success: true,
            user: updatedUser,
        });
    } catch (error: any) {
        console.error('Update user error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while updating user' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await requireAdmin();
        await connectDB();

        const { id } = await params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete user error:', error);

        if (error.message === 'Unauthorized' || error.message.includes('Forbidden')) {
            return NextResponse.json(
                { error: error.message },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred while deleting user' },
            { status: 500 }
        );
    }
}
