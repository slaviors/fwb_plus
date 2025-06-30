'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
            planned: 'bg-blue-100 text-[#1a7be6] border-[#1a7be6]',
            ongoing: 'bg-green-100 text-green-800 border-green-500',
            ended: 'bg-gray-100 text-gray-800 border-gray-400'
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
                <motion.div
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-md relative transition-colors text-sm
                    ${isToday ? 'bg-[#1a7be6] text-white font-bold' : ''}
                    ${isSelected && !isToday ? 'bg-[#1a7be6]/20 text-[#1a7be6] font-semibold' : ''}
                    ${hasEvents && !isToday && !isSelected ? 'bg-[#f35e0e]/20 text-[#f35e0e] font-semibold' : ''}
                    ${!hasEvents && !isToday && !isSelected ? 'hover:bg-gray-100' : ''}
                `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {day}
                    {hasEvents && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-0 w-1.5 h-1.5 bg-[#f35e0e] rounded-full"
                        ></motion.div>
                    )}
                </motion.div>
            );
        }

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
                <div className="flex items-center justify-between mb-3">
                    <motion.button
                        onClick={() => navigateMonth(-1)}
                        className="p-1.5 hover:bg-[#1a7be6]/10 rounded-md transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-4 h-4 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <h3 className="text-sm font-semibold text-gray-800">
                        {currentMonth.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </h3>
                    <motion.button
                        onClick={() => navigateMonth(1)}
                        className="p-1.5 hover:bg-[#1a7be6]/10 rounded-md transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-4 h-4 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
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

                <div className="mt-4 flex items-center justify-center space-x-3 text-xs">
                    <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-[#1a7be6] rounded-full"></div>
                        <span className="text-gray-600">Hari Ini</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <div className="w-2.5 h-2.5 bg-[#f35e0e]/20 border border-[#f35e0e] rounded-full"></div>
                        <span className="text-gray-600">Ada Event</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    const selectedDateEvents = getEventsForDate(selectedDate);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
                <motion.div 
                    animate={{ 
                        rotate: 360,
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-12 h-12 mb-4"
                >
                    <svg className="w-full h-full text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </motion.div>
                <div className="text-lg text-gray-600 font-medium">Memuat events...</div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <div className="text-center mb-10">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl font-bold text-gray-900 mb-4 relative inline-block"
                >
                    Events 
                    <span className="text-[#ce1010]"> FWB</span>
                    <span className="text-[#f35e0e]">+</span>
                    <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ce1010] to-[#f35e0e]"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 1 }}
                    />
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-gray-600 text-lg"
                >
                    Temukan dan ikuti berbagai acara menarik
                </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    {renderCompactCalendar()}

                    <AnimatePresence>
                        {selectedDateEvents.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h4 className="text-base font-semibold text-gray-800">
                                        Events {formatDate(selectedDate)}
                                    </h4>
                                </div>
                                <div className="space-y-4">
                                    {selectedDateEvents.map((event, index) => (
                                        <motion.div 
                                            key={event._id} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="border-l-4 border-[#1a7be6] pl-3 py-1.5 hover:bg-blue-50 rounded-r-md transition-colors"
                                        >
                                            <h5 className="font-medium text-gray-900 text-sm">{event.title}</h5>
                                            <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-600">
                                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>
                                                    {new Date(event.startTime).toLocaleTimeString('id-ID', {
                                                        timeZone: 'Asia/Jakarta',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                {getStatusBadge(event.status)}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="lg:col-span-3">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <div className="h-8 w-1.5 bg-gradient-to-b from-[#ce1010] to-[#f35e0e] rounded-full"></div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Semua Events</h2>
                            <p className="text-sm text-gray-600">Klik tanggal di kalender untuk melihat event spesifik</p>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <AnimatePresence>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <motion.div 
                                        key={event._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-200"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <motion.h3 
                                                            className="text-xl font-semibold text-gray-900"
                                                            whileHover={{ scale: 1.01 }}
                                                        >{event.title}</motion.h3>
                                                        {getStatusBadge(event.status)}
                                                    </div>
                                                    <p className="text-gray-600 mb-5">{event.description}</p>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                        <div className="flex items-center space-x-2.5">
                                                            <div className="bg-[#f35e0e]/10 p-2 rounded-full">
                                                                <svg className="w-4.5 h-4.5 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-gray-700">{event.location}</span>
                                                        </div>

                                                        <div className="flex items-center space-x-2.5">
                                                            <div className="bg-[#ce1010]/10 p-2 rounded-full">
                                                                <svg className="w-4.5 h-4.5 text-[#ce1010]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-gray-700">{formatDateTime(event.startTime)}</span>
                                                        </div>

                                                        <div className="flex items-center space-x-2.5">
                                                            <div className="bg-[#1a7be6]/10 p-2 rounded-full">
                                                                <svg className="w-4.5 h-4.5 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-gray-700">Berakhir: {formatDateTime(event.endTime)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="flex justify-center mb-4"
                                    >
                                        <div className="bg-gray-100 p-4 rounded-full">
                                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">Belum Ada Event</h3>
                                    <p className="text-gray-500">Saat ini belum ada event yang tersedia.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}