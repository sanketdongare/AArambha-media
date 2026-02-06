'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ name: '', email: '', password: '', confirmPassword: '' });

        // Validation
        if (!formData.name) {
            setErrors((prev) => ({ ...prev, name: 'Name is required' }));
            return;
        }
        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: 'Email is required' }));
            return;
        }
        if (!formData.password) {
            setErrors((prev) => ({ ...prev, password: 'Password is required' }));
            return;
        }
        if (formData.password.length < 6) {
            setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.error || 'Registration failed', 'error');
                return;
            }

            showToast('Account created successfully!', 'success');
            router.push('/dashboard');
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

            {/* Signup Card */}
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
                        Create Account
                    </h1>
                    <p className="text-gray-400">
                        Join AArambh Media to book your special moments
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={errors.name}
                            className="pl-11"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
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
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                        <Input
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            className="pl-11"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            className="pl-11"
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        size="lg"
                        className="mt-6"
                    >
                        {!isLoading && <UserPlus className="w-5 h-5" />}
                        Create Account
                    </Button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
                                Sign In
                            </Link>
                        </p>
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
