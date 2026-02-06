'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
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

        // Basic validation
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

            showToast('Login successful!', 'success');

            // Redirect based on role
            if (data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md relative z-10 animate-slide-up">
                <div className="text-center mb-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <Image
                                src="/logo.png"
                                alt="AArambh Media Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold font-display gradient-text mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400">
                        Sign in to access your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                                className="pl-11"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                                className="pl-11"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        size="lg"
                    >
                        {!isLoading && <LogIn className="w-5 h-5" />}
                        Sign In
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Dev Credentials Info */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-blue-300 mb-2 font-semibold">Test Credentials:</p>
                        <div className="space-y-1 text-xs text-blue-200">
                            <p>
                                <span className="font-medium">Admin:</span> admin@aarambhamedia.com / Admin@123
                            </p>
                            <p>
                                <span className="font-medium">User:</span> user@example.com / User@123
                            </p>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    © 2026 AArambh Media. All rights reserved.
                </div>
            </Card>
        </div>
    );
}
