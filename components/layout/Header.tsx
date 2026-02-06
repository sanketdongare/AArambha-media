'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Header() {
    const pathname = usePathname();

    // Don't show header on admin pages
    if (pathname.startsWith('/admin')) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center">
                        <div className="relative w-[480px] h-[192px] -my-16">
                            <Image
                                src="/logo.png"
                                alt="AArambh Media"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
                        <Link href="/#packages" className="text-gray-300 hover:text-white transition-colors font-medium">Packages</Link>
                        <Link href="/login">
                            <Button variant="outline" size="sm">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
