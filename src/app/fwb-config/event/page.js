'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventManagementPage() {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: ''
    });
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
                fetchEvents();
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

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/fwb-config/event');
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const jakartaOffset = 7 * 60 * 60 * 1000; const jakartaDate = new Date(date.getTime() + jakartaOffset);

        return jakartaDate.toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            planned: 'bg-blue-100 text-blue-800',
            ongoing: 'bg-green-100 text-green-800',
            ended: 'bg-gray-100 text-gray-800'
        };

        const labels = {
            planned: 'Akan Datang',
            ongoing: 'Sedang Berlangsung',
            ended: 'Selesai'
        };

        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingEvent
                ? `/api/fwb-config/event/${editingEvent._id}/edit`
                : '/api/fwb-config/event';

            const method = editingEvent ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchEvents();
                setShowForm(false);
                setEditingEvent(null);
                setFormData({
                    title: '',
                    description: '',
                    location: '',
                    startTime: '',
                    endTime: ''
                });
            } else {
                const data = await response.json();
                alert(data.error || 'Operation failed');
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Network error');
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            location: event.location,
            startTime: new Date(event.startTime).toISOString().slice(0, 16),
            endTime: new Date(event.endTime).toISOString().slice(0, 16)
        });
        setShowForm(true);
    };

    const handleDelete = async (eventId) => {
        if (confirm('Apakah Anda yakin ingin menghapus event ini?')) {
            try {
                const response = await fetch(`/api/fwb-config/event/${eventId}/delete`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    fetchEvents();
                } else {
                    alert('Failed to delete event');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Network error');
            }
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
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/fwb-config')}
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                ← Back to Admin
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Event Management
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
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setEditingEvent(null);
                                setFormData({
                                    title: '',
                                    description: '',
                                    location: '',
                                    startTime: '',
                                    endTime: ''
                                });
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Create New Event
                        </button>
                    </div>

                    {showForm && (
                        <div className="bg-white shadow rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingEvent ? 'Edit Event' : 'Create New Event'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Time (Jakarta Time)</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                            value={formData.startTime}
                                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">End Time (Jakarta Time)</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                            value={formData.endTime}
                                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        {editingEvent ? 'Update Event' : 'Create Event'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingEvent(null);
                                        }}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {events.map((event) => (
                                <li key={event._id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                                                {getStatusBadge(event.status)}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <p><strong>Location:</strong> {event.location}</p>
                                                <p><strong>Start:</strong> {formatDateTime(event.startTime)}</p>
                                                <p><strong>End:</strong> {formatDateTime(event.endTime)}</p>
                                                <p><strong>Created by:</strong> {event.createdBy}</p>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {events.length === 0 && (
                                <li className="px-6 py-4 text-center text-gray-500">
                                    No events found. Create your first event!
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}