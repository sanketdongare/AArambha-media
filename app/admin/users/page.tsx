'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Search, Trash2, Edit, User as UserIcon } from 'lucide-react';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UsersPage() {
    const { showToast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, roleFilter]);

    const fetchUsers = async () => {
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (roleFilter) params.append('role', roleFilter);

            const response = await fetch(`/api/admin/users?${params}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                showToast('Failed to fetch users', 'error');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            showToast('Error loading users', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId: string, userName: string) => {
        if (!confirm(`Are you sure you want to delete ${userName}?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                showToast('User deleted successfully', 'success');
                fetchUsers();
            } else {
                showToast('Failed to delete user', 'error');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            showToast('Error deleting user', 'error');
        }
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
                    <p className="text-gray-400">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-display text-white mb-2">
                    User Management
                </h1>
                <p className="text-gray-400">
                    Manage platform users and their roles
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
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-11"
                            />
                        </div>
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2.5 rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </Card>

            {/* Users Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">User</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Role</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Joined</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                                                    <UserIcon className="w-5 h-5 text-primary-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xs px-3 py-1 rounded-full ${user.role === 'admin'
                                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <p className="text-sm text-gray-300">{formatDate(user.createdAt)}</p>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(user._id, user.name)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Summary */}
            <div className="flex justify-between items-center text-sm text-gray-400">
                <p>Showing {users.length} user(s)</p>
            </div>
        </div>
    );
}
