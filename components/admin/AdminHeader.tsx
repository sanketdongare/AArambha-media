'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function AdminHeader() {
    const router = useRouter();
    const { showToast } = useToast();
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

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            showToast('Logged out successfully', 'success');
            router.push('/login');
        } catch (error) {
            showToast('Error logging out', 'error');
        }
    };

    return (
        <header className="glass border-b border-white/10 sticky top-0 z-40">
            <div className="flex justify-between items-center px-8 py-4">
                <div>
                    <h1 className="text-2xl font-bold font-display text-white">Admin Dashboard</h1>
                    <p className="text-sm text-gray-400">Manage your platform</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg">
                        <User className="w-5 h-5 text-primary-500" />
                        <div>
                            <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-400">{user?.role || 'admin'}</p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    );
}
