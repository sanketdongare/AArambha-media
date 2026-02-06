'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <div className="min-h-screen">
            {/* Header */}
            <header className="glass border-b border-white/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/">
                            <h1 className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity cursor-pointer">AArambh Media</h1>
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg">
                                <User className="w-5 h-5 text-primary-500" />
                                <span className="text-sm text-gray-300">{user?.name || 'Loading...'}</span>
                            </div>

                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
