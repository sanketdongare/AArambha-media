'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: '', password: '' });

        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!formData.password) {
            setErrors((prev) => ({ ...prev, password: 'Password is required' }));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.error || 'Login failed', 'error');
                return;
            }

            if (data.user.role !== 'admin') {
                showToast('Access denied. Administrator privileges required.', 'error');
                // Optional: Logout if they accidentally logged in with user account
                await fetch('/api/auth/logout', { method: 'POST' });
                return;
            }

            showToast('Admin access granted!', 'success');
            router.push('/admin');
        } catch (error) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <Card className="w-full max-w-md relative z-10 border-white/10 shadow-2xl animate-fade-in" padding="lg">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="relative w-40 h-40">
                            <Image
                                src="/logo.png"
                                alt="AArambh Media Admin"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        <ShieldCheck className="w-3 h-3" />
                        Administrator Access
                    </div>
                    <h1 className="text-3xl font-bold font-display text-white">
                        Admin Control Panel
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="email"
                                placeholder="admin@aarambhamedia.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                                className="pl-11 bg-white/5 border-white/10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
                            <Link href="#" className="text-[10px] text-primary-500 hover:text-primary-400 font-bold uppercase">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                                className="pl-11 bg-white/5 border-white/10"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        size="lg"
                        className="h-12 text-sm font-bold uppercase tracking-widest"
                    >
                        Secure Login
                    </Button>

                    <div className="text-center pt-4">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                            ← Return to Website
                        </Link>
                    </div>
                </form>

                {/* Secure Badge */}
                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-600 font-medium uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Encrypted Session Active
                </div>
            </Card>
        </div>
    );
}
