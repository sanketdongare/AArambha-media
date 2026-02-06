'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    // Don't show footer on admin pages
    if (pathname.startsWith('/admin')) return null;

    return (
        <footer className="py-12 border-t border-gray-800 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div>
                            <div className="relative w-[576px] h-[240px] -ml-12 mb-2">
                                <Image
                                    src="/logo.png"
                                    alt="AArambh Media"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs px-4">
                                Professional photography and cinematic videography for weddings, events, and special moments. Capturing emotions that last a lifetime.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
                            <li><Link href="/#packages" className="hover:text-primary-500 transition-colors">Wedding Packages</Link></li>
                            <li><Link href="/signup" className="hover:text-primary-500 transition-colors">Book a Shoot</Link></li>
                            <li><Link href="/login" className="hover:text-primary-500 transition-colors">Customer Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Connect With Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 text-lg">📞</span>
                                <span>7276088250</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 text-lg">📷</span>
                                <Link href="https://instagram.com/aarambhamedia" target="_blank" className="hover:text-primary-500 transition-colors">
                                    @aarambhamedia
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500 text-lg">📍</span>
                                <span>Prashant Sapkal, Pune, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>© 2026 AArambh Media & Photography. All rights reserved.</p>
                    <p className="mt-2 text-xs">Crafted for Excellence.</p>
                </div>
            </div>
        </footer>
    );
}
