'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FWBConfigPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                router.push('/login');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">
                                FWB+ Admin Panel
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Admin Dashboard
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Welcome to the FWB+ configuration panel. You can manage your application settings here.
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <button
                                onClick={() => router.push('/fwb-config/event')}
                                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="p-5">
                                    <h3 className="text-lg font-medium text-gray-900">Event Management</h3>
                                    <p className="mt-1 text-sm text-gray-500">Create, edit, and manage events</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}