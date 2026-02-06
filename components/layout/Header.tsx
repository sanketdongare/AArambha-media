'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Don't show header on admin, login, or signup pages to keep them "separate"
    if (pathname.startsWith('/admin') || pathname === '/login' || pathname === '/signup' || pathname === '/admin-login') return null;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Packages', href: '/#packages' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center relative z-10" onClick={() => setIsMenuOpen(false)}>
                        <div className="relative w-[320px] sm:w-[480px] h-[120px] sm:h-[192px] -my-10 sm:-my-16">
                            <Image
                                src="/logo.png"
                                alt="AArambh Media"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/5">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 text-gray-300 hover:text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`
                fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 transition-all duration-300 md:hidden
                ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}>
                <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-bold text-gray-300 hover:text-primary-500 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-24 h-px bg-white/10" />
                    <Link href="/login" className="w-full max-w-xs" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" fullWidth size="lg">Sign In</Button>
                    </Link>
                    <Link href="/signup" className="w-full max-w-xs" onClick={() => setIsMenuOpen(false)}>
                        <Button fullWidth size="lg">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
