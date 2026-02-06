'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, Users, Calendar, ChevronRight } from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin',
            icon: LayoutDashboard,
        },
        {
            name: 'Users',
            href: '/admin/users',
            icon: Users,
        },
        {
            name: 'Bookings',
            href: '/admin/bookings',
            icon: Calendar,
        },
    ];

    return (
        <aside className="glass border-r border-white/10 h-screen sticky top-0 flex flex-col">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image
                            src="/logo.png"
                            alt="AArambh Media"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-white font-display">AArambh Media</h2>
                        <p className="text-xs text-primary-500">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary-500/20 text-primary-500 border border-primary-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium flex-1">{item.name}</span>
                            {isActive && (
                                <ChevronRight className="w-4 h-4 text-primary-500" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="text-xs text-gray-500 text-center">
                    © 2026 AArambh Media
                </div>
            </div>
        </aside>
    );
}
