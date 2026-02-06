'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Users, Calendar, DollarSign, TrendingUp, UserCheck, Clock } from 'lucide-react';

interface Stats {
    users: {
        total: number;
        admins: number;
        regular: number;
    };
    bookings: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
    };
    revenue: {
        total: number;
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
                setRecentUsers(data.recentUsers);
                setUpcomingBookings(data.upcomingBookings);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4 mx-auto"></div>
                    <p className="text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Title */}
            <div>
                <h1 className="text-3xl font-bold font-display text-white mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-gray-400">
                    Monitor your platform's performance and activity
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <Card hover className="card-glow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Users</p>
                            <p className="text-3xl font-bold text-white">{stats?.users.total || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats?.users.admins || 0} admins, {stats?.users.regular || 0} users
                            </p>
                        </div>
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Users className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                </Card>

                {/* Total Bookings */}
                <Card hover className="card-glow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Bookings</p>
                            <p className="text-3xl font-bold text-white">{stats?.bookings.total || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats?.bookings.confirmed || 0} confirmed
                            </p>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Calendar className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                </Card>

                {/* Pending Bookings */}
                <Card hover className="card-glow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Pending</p>
                            <p className="text-3xl font-bold text-white">{stats?.bookings.pending || 0}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Awaiting confirmation
                            </p>
                        </div>
                        <div className="p-3 bg-yellow-500/20 rounded-lg">
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                </Card>

                {/* Total Revenue */}
                <Card hover className="card-glow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(stats?.revenue.total || 0)}</p>
                            <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                All time
                            </p>
                        </div>
                        <div className="p-3 bg-primary-500/20 rounded-lg">
                            <DollarSign className="w-8 h-8 text-primary-500" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <Card>
                    <h2 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-blue-500" />
                        Recent Users
                    </h2>
                    <div className="space-y-3">
                        {recentUsers.length > 0 ? (
                            recentUsers.map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs px-2 py-1 rounded-full ${user.role === 'admin'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">{formatDate(user.createdAt)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No users yet</p>
                        )}
                    </div>
                </Card>

                {/* Upcoming Bookings */}
                <Card>
                    <h2 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-500" />
                        Upcoming Bookings
                    </h2>
                    <div className="space-y-3">
                        {upcomingBookings.length > 0 ? (
                            upcomingBookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-white">{booking.customerName}</p>
                                        <p className="text-xs text-gray-400">{booking.eventType}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-primary-500">
                                            {formatDate(booking.eventDate)}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'confirmed'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">No upcoming bookings</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
