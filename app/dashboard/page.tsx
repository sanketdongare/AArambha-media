'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Calendar, Package, User as UserIcon } from 'lucide-react';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold font-display text-white mb-2">
                    Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-gray-400">
                    Manage your bookings and explore our photography services.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card hover className="card-glow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-500/20 rounded-lg">
                            <UserIcon className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Account Status</p>
                            <p className="text-xl font-semibold text-white">Active</p>
                        </div>
                    </div>
                </Card>

                <Card hover className="card-glow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Your Bookings</p>
                            <p className="text-xl font-semibold text-white">0</p>
                        </div>
                    </div>
                </Card>

                <Card hover className="card-glow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Package className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Available Packages</p>
                            <p className="text-xl font-semibold text-white">6</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content */}
            <Card padding="lg">
                <h2 className="text-2xl font-bold font-display text-white mb-4">
                    Your Dashboard
                </h2>
                <p className="text-gray-300 mb-6">
                    Welcome to your personal dashboard. Here you can view and manage your photography bookings.
                </p>

                <div className="space-y-4">
                    <div className="p-6 bg-gray-800/30 rounded-lg border border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            No Bookings Yet
                        </h3>
                        <p className="text-gray-400">
                            You haven't made any bookings yet. Contact AArambh Media to discuss your photography needs!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 glass rounded-lg">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary-500" />
                                Wedding Packages
                            </h4>
                            <p className="text-sm text-gray-400">Bronze, Silver, Gold, Platinum</p>
                            <p className="text-xs text-gray-500 mt-1">Starting from ₹26,000</p>
                        </div>

                        <div className="p-6 glass rounded-lg">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Pre-Wedding Shoots
                            </h4>
                            <p className="text-sm text-gray-400">Special packages available</p>
                            <p className="text-xs text-gray-500 mt-1">Starting from ₹16,000</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
