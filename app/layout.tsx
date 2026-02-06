import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'AArambh Media - Photography & Cinematic Videography',
    description: 'Professional photography and videography services for weddings, events, and special moments with secure booking.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-white bg-black`}>
                <ToastProvider>
                    <Header />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </ToastProvider>
            </body>
        </html>
    );
}
