'use client';
import { useState, useEffect } from 'react';

export default function EventComponent() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        fetchPublicEvents();
    }, []);

    const fetchPublicEvents = async () => {
        try {
            const response = await fetch('/api/public/events');
            if (response.ok) {
                const data = await response.json();
                setEvents(data.events);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            planned: 'bg-blue-100 text-blue-800 border-blue-200',
            ongoing: 'bg-green-100 text-green-800 border-green-200',
            ended: 'bg-gray-100 text-gray-800 border-gray-200'
        };

        const labels = {
            planned: 'Akan Datang',
            ongoing: 'Sedang Berlangsung',
            ended: 'Selesai'
        };

        return (
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const hasEvent = (date) => {
        return events.some(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);
            return date >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
                date <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
        });
    };

    const getEventsForDate = (date) => {
        return events.filter(event => {
            const eventStart = new Date(event.startTime);
            const eventEnd = new Date(event.endTime);
            return date >= new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate()) &&
                date <= new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
        });
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newDate);
    };

    const renderCompactCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];
        const dayNames = [
            { key: 'minggu', label: 'Min' },
            { key: 'senin', label: 'Sen' },
            { key: 'selasa', label: 'Sel' },
            { key: 'rabu', label: 'Rab' },
            { key: 'kamis', label: 'Kam' },
            { key: 'jumat', label: 'Jum' },
            { key: 'sabtu', label: 'Sab' }
        ];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isToday = isSameDay(date, new Date());
            const isSelected = isSameDay(date, selectedDate);
            const hasEvents = hasEvent(date);

            days.push(
                <div
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-md relative transition-colors text-sm
            ${isToday ? 'bg-blue-500 text-white font-bold' : ''}
            ${isSelected && !isToday ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
            ${hasEvents && !isToday && !isSelected ? 'bg-orange-100 text-orange-600 font-semibold' : ''}
            ${!hasEvents && !isToday && !isSelected ? 'hover:bg-gray-100' : ''}
          `}
                >
                    {day}
                    {hasEvents && (
                        <div className="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full"></div>
                    )}
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={() => navigateMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h3 className="text-sm font-semibold">
                        {currentMonth.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </h3>
                    <button
                        onClick={() => navigateMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map(day => (
                        <div key={day.key} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500">
                            {day.label}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days}
                </div>

                <div className="mt-3 flex items-center justify-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Hari Ini</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-100 border border-orange-200 rounded-full"></div>
                        <span>Ada Event</span>
                    </div>
                </div>
            </div>
        );
    };

    const selectedDateEvents = getEventsForDate(selectedDate);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-lg text-gray-600">Memuat events...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Events FWB+</h1>
                <p className="text-gray-600">Temukan dan ikuti berbagai acara menarik</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                    {renderCompactCalendar()}

                    {selectedDateEvents.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                            <h4 className="text-sm font-semibold mb-3 text-blue-600">
                                Events {formatDate(selectedDate)}
                            </h4>
                            <div className="space-y-3">
                                {selectedDateEvents.map((event) => (
                                    <div key={event._id} className="border-l-3 border-blue-400 pl-3">
                                        <h5 className="font-medium text-gray-900 text-sm">{event.title}</h5>
                                        <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(event.startTime).toLocaleTimeString('id-ID', {
                                                timeZone: 'Asia/Jakarta',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <div className="mt-1">
                                            {getStatusBadge(event.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Semua Events</h2>
                        <p className="text-sm text-gray-600">Klik tanggal di kalender untuk melihat event spesifik</p>
                    </div>

                    <div className="space-y-4">
                        {events.length > 0 ? (
                            events.map((event) => (
                                <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                                                    {getStatusBadge(event.status)}
                                                </div>
                                                <p className="text-gray-600 mb-4">{event.description}</p>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="text-gray-600">{event.location}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-gray-600">{formatDateTime(event.startTime)}</span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-gray-600">Berakhir: {formatDateTime(event.endTime)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Event</h3>
                                <p className="text-gray-500">Saat ini belum ada event yang tersedia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}