'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Search, Trash2, Calendar as CalendarIcon, Package } from 'lucide-react';

interface Booking {
    _id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    eventDate: string;
    eventType: string;
    packageSelected: string;
    packagePrice: number;
    status: string;
    createdAt: string;
}

export default function BookingsPage() {
    const { showToast } = useToast();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchBookings();
    }, [searchTerm, statusFilter]);

    const fetchBookings = async () => {
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (statusFilter) params.append('status', statusFilter);

            const response = await fetch(`/api/admin/bookings?${params}`);
            if (response.ok) {
                const data = await response.json();
                setBookings(data.bookings);
            } else {
                showToast('Failed to fetch bookings', 'error');
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            showToast('Error loading bookings', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
        try {
            const response = await fetch(`/api/admin/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                showToast('Booking status updated', 'success');
                fetchBookings();
            } else {
                showToast('Failed to update booking', 'error');
            }
        } catch (error) {
            console.error('Error updating booking:', error);
            showToast('Error updating booking', 'error');
        }
    };

    const handleDelete = async (bookingId: string, customerName: string) => {
        if (!confirm(`Are you sure you want to delete booking for ${customerName}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showToast('Booking deleted successfully', 'success');
                fetchBookings();
            } else {
                showToast('Failed to delete booking', 'error');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
            showToast('Error deleting booking', 'error');
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'completed':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4 mx-auto"></div>
                    <p className="text-gray-400">Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-display text-white mb-2">
                    Booking Management
                </h1>
                <p className="text-gray-400">
                    Manage all photography bookings and events
                </p>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Search by customer name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-11"
                            />
                        </div>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </Card>

            {/* Bookings Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Event</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Package</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="text-sm font-medium text-white">{booking.customerName}</p>
                                                <p className="text-xs text-gray-400">{booking.customerEmail}</p>
                                                <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4 text-primary-500" />
                                                <div>
                                                    <p className="text-sm text-white">{booking.eventType}</p>
                                                    <p className="text-xs text-gray-400">{formatDate(booking.eventDate)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-blue-500" />
                                                <div>
                                                    <p className="text-sm text-white capitalize">{booking.packageSelected.replace(/-/g, ' ')}</p>
                                                    <p className="text-xs text-gray-400">{formatCurrency(booking.packagePrice)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                                className={`text-xs px-3 py-1 rounded-full border cursor-pointer ${getStatusColor(booking.status)}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(booking._id, booking.customerName)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Summary */}
            <div className="flex justify-between items-center text-sm text-gray-400">
                <p>Showing {bookings.length} booking(s)</p>
            </div>
        </div>
    );
}
