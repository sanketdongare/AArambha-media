'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Camera, Video, Users, Award, ArrowRight, Calendar, Package } from 'lucide-react';

export default function HomePage() {
    const packages = [
        { name: 'Bronze', price: '₹26,000', icon: Package, color: 'from-orange-600 to-orange-800' },
        { name: 'Silver', price: '₹36,000', icon: Package, color: 'from-gray-400 to-gray-600' },
        { name: 'Gold', price: '₹56,000', icon: Package, color: 'from-yellow-500 to-yellow-700' },
        { name: 'Platinum', price: '₹86,000', icon: Package, color: 'from-purple-500 to-purple-700' },
    ];

    const features = [
        {
            icon: Camera,
            title: 'Professional Photography',
            description: 'Capture every precious moment with our expert photographers',
        },
        {
            icon: Video,
            title: 'Cinematic Videography',
            description: 'Tell your story through stunning cinematic videos',
        },
        {
            icon: Users,
            title: 'Candid Moments',
            description: 'Natural, unposed shots that capture genuine emotions',
        },
        {
            icon: Award,
            title: 'Award-Winning Team',
            description: 'Experienced professionals dedicated to excellence',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
                    <div className="text-center space-y-8 animate-fade-in">
                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold font-display">
                            <span className="block text-white mb-2">Capture The</span>
                            <span className="gradient-text">Art of Your Story</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Professional photography and videography services for weddings,
                            pre-wedding shoots, and special moments that last forever
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                            <Link href="/signup">
                                <Button size="lg" className="text-lg px-8 py-4">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-16">
                        <span className="gradient-text">Why Choose Us</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={index}
                                    hover
                                    className="card-glow text-center animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 bg-primary-500/20 rounded-full">
                                            <Icon className="w-8 h-8 text-primary-500" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <section id="packages" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            <span className="gradient-text">Wedding Packages</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Choose the perfect package for your special day
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {packages.map((pkg, index) => {
                            const Icon = pkg.icon;
                            return (
                                <Card
                                    key={index}
                                    hover
                                    className="card-glow text-center animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className={`p-4 bg-gradient-to-br ${pkg.color} rounded-full`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-3xl font-bold gradient-text mb-4">
                                        {pkg.price}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Starting from
                                    </p>
                                </Card>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/signup">
                            <Button size="lg">
                                Book Your Package
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600/20 to-primary-500/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
                        Ready to Create Magic?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Let's capture your special moments together
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="text-lg px-10 py-5">
                            Create Your Account
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
