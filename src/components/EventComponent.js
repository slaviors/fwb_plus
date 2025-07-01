'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
            planned: 'bg-gradient-to-r from-blue-50 to-blue-100 text-[#1a7be6] border-[#1a7be6]/30 shadow-sm',
            ongoing: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-300 shadow-sm',
            ended: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-300 shadow-sm'
        };

        const labels = {
            planned: 'Akan Datang',
            ongoing: 'Sedang Berlangsung',
            ended: 'Selesai'
        };

        const icons = {
            planned: (
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            ongoing: (
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6" />
                </svg>
            ),
            ended: (
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )
        };

        return (
            <motion.span 
                className={`inline-flex items-center px-3 py-1.5 text-xs font-inter font-bold rounded-full border backdrop-blur-sm ${badges[status]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {icons[status]}
                {labels[status]}
            </motion.span>
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

    const selectedDateEvents = getEventsForDate(selectedDate);

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
            const eventOnThisDay = hasEvent(date);

            days.push(
                <motion.button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`
                        relative h-8 w-8 rounded-lg text-xs font-medium transition-all duration-300 
                        ${isToday ? 'bg-gradient-to-br from-[#1a7be6] to-[#1a7be6]/80 text-white  border-2 border-[#1a7be6]/30' : ''}
                        ${isSelected && !isToday ? 'bg-gradient-to-br from-[#f35e0e] to-[#f35e0e]/80 text-white  border-2 border-[#f35e0e]/30' : ''}
                        ${!isSelected && !isToday ? 'text-gray-700 hover:bg-white/60 hover:shadow-md' : ''}
                        ${eventOnThisDay && !isSelected && !isToday ? 'bg-gradient-to-br from-orange-50 to-orange-100 border border-[#f35e0e]/20 text-[#f35e0e] font-bold' : ''}
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {day}
                    {eventOnThisDay && (
                        <motion.div 
                            className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f35e0e] border border-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </motion.button>
            );
        }

        return (
            <motion.div 
                className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Ultra-enhanced glassmorphism inner container with advanced decorations */}
                <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6 overflow-hidden">
                    {/* Advanced floating decorative elements with complex animations */}
                    <motion.div 
                        className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-20"
                        style={{ background: 'linear-gradient(135deg, #1a7be6, #f35e0e)' }}
                        animate={{ 
                            scale: [1, 1.3, 1],
                            rotate: [0, 180, 360],
                            x: [0, -5, 0],
                            y: [0, 5, 0]
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    <motion.div 
                        className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full blur-xl opacity-15"
                        style={{ background: 'linear-gradient(45deg, #f35e0e, #1a7be6)' }}
                        animate={{ 
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0],
                            x: [0, 3, 0],
                            y: [0, -3, 0]
                        }}
                        transition={{ 
                            duration: 18, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Advanced micro decorative elements */}
                    <motion.div 
                        className="absolute top-12 right-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400/40 to-pink-400/40"
                        animate={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 0.6, 0],
                            rotate: [0, 360]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            delay: 1
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-16 left-12 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400/40 to-teal-400/40"
                        animate={{ 
                            scale: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            rotate: [0, -360]
                        }}
                        transition={{ 
                            duration: 5,
                            repeat: Infinity,
                            delay: 2
                        }}
                    />
                    
                    {/* Subtle grid pattern overlay */}
                    <div 
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(26,123,230,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(26,123,230,0.5) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Ultra-enhanced calendar header with sophisticated styling */}
                    <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-orange-50/40 border border-white/50 relative overflow-hidden">
                        {/* Header background glow */}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-orange-200/20 rounded-xl"
                            animate={{ 
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        <motion.button
                            onClick={() => navigateMonth(-1)}
                            className="relative p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 text-gray-600 hover:text-[#1a7be6] hover:bg-white/90 transition-all duration-300 group"
                            whileHover={{ 
                                scale: 1.1,
                                boxShadow: "0 8px 25px rgba(26,123,230,0.15)"
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* Button glow effect */}
                            <motion.div 
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <motion.svg 
                                className="relative w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                whileHover={{ x: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </motion.svg>
                        </motion.button>

                        <div className="text-center relative">
                            {/* Month title background accent */}
                            <motion.div 
                                className="absolute inset-0 -m-2 rounded-lg bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ 
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.h3 
                                className="relative text-lg font-unbounded font-bold text-gray-900"
                                animate={{
                                    textShadow: [
                                        "0 0 10px rgba(26,123,230,0.2)",
                                        "0 0 20px rgba(243,94,14,0.2)",
                                        "0 0 10px rgba(26,123,230,0.2)"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                {/* Subtle sparkle accent */}
                                <motion.span 
                                    className="absolute -top-1 -right-6 text-xs"
                                    animate={{ 
                                        rotate: [0, 360],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    ✦
                                </motion.span>
                            </motion.h3>
                        </div>

                        <motion.button
                            onClick={() => navigateMonth(1)}
                            className="relative p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 text-gray-600 hover:text-[#1a7be6] hover:bg-white/90 transition-all duration-300 group"
                            whileHover={{ 
                                scale: 1.1,
                                boxShadow: "0 8px 25px rgba(26,123,230,0.15)"
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* Button glow effect */}
                            <motion.div 
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <motion.svg 
                                className="relative w-4 h-4" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                        </motion.button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {dayNames.map((day) => (
                            <div key={day.key} className="text-center py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {day.label}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                        {days}
                    </div>

                    {/* Ultra-sophisticated animated legend */}
                    <motion.div 
                        className="mt-6 pt-6 border-t border-gray-200/50 relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        {/* Legend background glow */}
                        <motion.div 
                            className="absolute inset-0 -m-2 rounded-xl bg-gradient-to-r from-blue-50/20 via-purple-50/20 to-orange-50/20"
                            animate={{ 
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ 
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        <div className="relative flex flex-wrap items-center justify-center gap-6 text-sm p-2">
                            {/* Today indicator with sophisticated animations */}
                            <motion.div 
                                className="flex items-center gap-3 group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative">
                                    <motion.div 
                                        className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1a7be6] to-[#1a7be6]/80 border-2 border-[#1a7be6]/30"
                                        animate={{ 
                                            boxShadow: [
                                                "0 0 10px rgba(26,123,230,0.3)",
                                                "0 0 20px rgba(26,123,230,0.5)",
                                                "0 0 10px rgba(26,123,230,0.3)"
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div 
                                        className="absolute inset-0 w-4 h-4 rounded-full bg-[#1a7be6]/20"
                                        animate={{ 
                                            scale: [1, 1.5, 1],
                                            opacity: [0.7, 0, 0.7]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                                <motion.span 
                                    className="font-semibold text-gray-700 group-hover:text-[#1a7be6] transition-colors duration-300"
                                    animate={{
                                        textShadow: [
                                            "0 0 5px rgba(26,123,230,0.1)",
                                            "0 0 10px rgba(26,123,230,0.2)",
                                            "0 0 5px rgba(26,123,230,0.1)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    Hari Ini
                                </motion.span>
                            </motion.div>
                            
                            {/* Selected indicator */}
                            <motion.div 
                                className="flex items-center gap-3 group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative">
                                    <motion.div 
                                        className="w-4 h-4 rounded-full bg-gradient-to-br from-[#f35e0e] to-[#f35e0e]/80 border-2 border-[#f35e0e]/30"
                                        animate={{ 
                                            boxShadow: [
                                                "0 0 10px rgba(243,94,14,0.3)",
                                                "0 0 20px rgba(243,94,14,0.5)",
                                                "0 0 10px rgba(243,94,14,0.3)"
                                            ]
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    />
                                    <motion.div 
                                        className="absolute inset-0 w-4 h-4 rounded-full bg-[#f35e0e]/20"
                                        animate={{ 
                                            scale: [1, 1.4, 1],
                                            opacity: [0.6, 0, 0.6]
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    />
                                </div>
                                <motion.span 
                                    className="font-semibold text-gray-700 group-hover:text-[#f35e0e] transition-colors duration-300"
                                    animate={{
                                        textShadow: [
                                            "0 0 5px rgba(243,94,14,0.1)",
                                            "0 0 10px rgba(243,94,14,0.2)",
                                            "0 0 5px rgba(243,94,14,0.1)"
                                        ]
                                    }}
                                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                                >
                                    Dipilih
                                </motion.span>
                            </motion.div>
                            
                            {/* Event indicator */}
                            <motion.div 
                                className="flex items-center gap-3 group cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative">
                                    <motion.div 
                                        className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-[#f35e0e]/20"
                                        animate={{ 
                                            boxShadow: [
                                                "0 0 8px rgba(251,146,60,0.3)",
                                                "0 0 16px rgba(251,146,60,0.5)",
                                                "0 0 8px rgba(251,146,60,0.3)"
                                            ]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                    <motion.div 
                                        className="absolute inset-0 w-4 h-4 rounded-full bg-orange-300/20"
                                        animate={{ 
                                            scale: [1, 1.3, 1],
                                            opacity: [0.5, 0, 0.5]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                    {/* Event sparkle indicator */}
                                    <motion.div 
                                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f35e0e]"
                                        animate={{ 
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{ 
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: 2
                                        }}
                                    />
                                </div>
                                <motion.span 
                                    className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300"
                                    animate={{
                                        textShadow: [
                                            "0 0 5px rgba(251,146,60,0.1)",
                                            "0 0 10px rgba(251,146,60,0.2)",
                                            "0 0 5px rgba(251,146,60,0.1)"
                                        ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                                >
                                    Ada Event
                                </motion.span>
                            </motion.div>
                        </div>
                        
                        {/* Decorative elements around legend */}
                        <motion.div 
                            className="absolute -top-2 left-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                            animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                                rotate: [0, 360]
                            }}
                            transition={{ 
                                duration: 4,
                                repeat: Infinity,
                                delay: 0
                            }}
                        />
                        <motion.div 
                            className="absolute -bottom-1 right-8 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
                            animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                rotate: [0, -360]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                delay: 2
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    if (loading) {
        return (
            <section className="relative min-h-screen py-12 md:py-20 overflow-hidden">
                {/* Loading background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-orange-50/30"></div>
                
                <div className="relative container mx-auto px-4">
                    <motion.div 
                        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div 
                            className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl mb-8"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-12">
                                <motion.div 
                                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a7be6]/20 to-[#f35e0e]/20 flex items-center justify-center"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <svg className="w-8 h-8 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </motion.div>
                                
                                <h2 className="text-2xl font-unbounded font-bold text-gray-900 mb-4">
                                    Memuat <span className="text-[#1a7be6]">Events</span>
                                </h2>
                                <p className="text-gray-600 font-inter">
                                    Sedang mengambil data event terbaru...
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen py-12 md:py-20 overflow-hidden">
            {/* Advanced gradient background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-orange-50/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-50/20 to-orange-100/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-100/30 via-transparent to-transparent"></div>

            {/* Ultra Advanced Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Ultra-sophisticated animated gradient orbs with advanced motion patterns */}
                <motion.div 
                    className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-60"
                    style={{
                        background: 'radial-gradient(circle, rgba(26,123,230,0.18) 0%, rgba(59,130,246,0.12) 35%, rgba(99,102,241,0.08) 65%, transparent 100%)'
                    }}
                    animate={{ 
                        scale: [1, 1.15, 0.95, 1.08, 1],
                        opacity: [0.4, 0.7, 0.5, 0.6, 0.4],
                        x: [0, -25, -10, 5, 0],
                        y: [0, 20, -15, 8, 0],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-60"
                    style={{
                        background: 'radial-gradient(circle, rgba(243,94,14,0.18) 0%, rgba(234,88,12,0.12) 35%, rgba(251,146,60,0.08) 65%, transparent 100%)'
                    }}
                    animate={{ 
                        scale: [1, 1.25, 1.05, 1.18, 1],
                        opacity: [0.3, 0.6, 0.4, 0.5, 0.3],
                        x: [0, 30, 15, -10, 0],
                        y: [0, -25, -5, 12, 0],
                        rotate: [0, -120, -240, -360]
                    }}
                    transition={{ 
                        duration: 18, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-2xl opacity-50"
                    style={{
                        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 40%, rgba(236,72,153,0.08) 70%, transparent 100%)'
                    }}
                    animate={{ 
                        scale: [1, 1.4, 1.1, 1.3, 1],
                        rotate: [0, 180, 90, 270, 360],
                        x: [0, 40, -35, 20, 0],
                        y: [0, -30, 35, -15, 0]
                    }}
                    transition={{ 
                        duration: 25, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Advanced secondary gradient orbs for depth */}
                <motion.div 
                    className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full blur-2xl opacity-40"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.08) 50%, transparent 100%)'
                    }}
                    animate={{ 
                        scale: [1, 1.2, 1.1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.4, 0.6, 0.3],
                        x: [0, -15, 10, -5, 0],
                        y: [0, 25, -20, 15, 0],
                        rotate: [0, 135, 270, 405, 540]
                    }}
                    transition={{ 
                        duration: 16, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full blur-2xl opacity-35"
                    style={{
                        background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.06) 50%, transparent 100%)'
                    }}
                    animate={{ 
                        scale: [1, 1.3, 1.15, 1.1, 1],
                        opacity: [0.25, 0.45, 0.35, 0.4, 0.25],
                        x: [0, 20, -25, 15, 0],
                        y: [0, -18, 22, -10, 0],
                        rotate: [0, -150, -300, -450, -600]
                    }}
                    transition={{ 
                        duration: 22, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Ultra-advanced floating geometric shapes with enhanced parallax and morphing */}
                <motion.div
                    animate={{ 
                        y: [0, -40, -15, -35, 0], 
                        rotate: [0, 25, -15, 30, 0],
                        scale: [1, 1.15, 1.05, 1.2, 1],
                        borderRadius: ["1.5rem", "2rem", "1rem", "2.5rem", "1.5rem"]
                    }}
                    transition={{ 
                        duration: 14, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden lg:block absolute top-20 right-20 w-28 h-28 border-2 border-blue-200/50 rounded-3xl backdrop-blur-sm bg-white/15 shadow-xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26,123,230,0.15), rgba(59,130,246,0.08), rgba(99,102,241,0.05))',
                        boxShadow: '0 8px 32px rgba(26,123,230,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                />
                <motion.div
                    animate={{ 
                        y: [0, 45, 20, 40, 0], 
                        x: [0, -30, -15, -25, 0],
                        rotate: [0, -35, 15, -25, 0],
                        scale: [1, 1.25, 1.1, 1.18, 1],
                        borderRadius: ["2rem", "1rem", "3rem", "1.5rem", "2rem"]
                    }}
                    transition={{ 
                        duration: 16, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden lg:block absolute bottom-32 left-16 w-32 h-32 border-2 border-orange-200/50 rounded-[2rem] rotate-12 backdrop-blur-sm bg-white/15 shadow-xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(243,94,14,0.15), rgba(234,88,12,0.08), rgba(251,146,60,0.05))',
                        boxShadow: '0 8px 32px rgba(243,94,14,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                />
                <motion.div
                    animate={{ 
                        y: [0, -25, -10, -20, 0], 
                        x: [0, 25, 10, 20, 0],
                        rotate: [0, 45, -30, 35, 0],
                        scale: [1, 1.3, 1.15, 1.25, 1]
                    }}
                    transition={{ 
                        duration: 18, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden md:block absolute top-1/3 left-10 w-24 h-24 rounded-full backdrop-blur-sm border-2 border-purple-200/40 shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1), rgba(236,72,153,0.08))',
                        boxShadow: '0 6px 24px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                />
                <motion.div
                    animate={{ 
                        y: [0, 30, 15, 25, 0], 
                        x: [0, -20, -10, -15, 0],
                        rotate: [0, -50, 25, -40, 0],
                        scale: [1, 1.12, 1.08, 1.1, 1],
                        borderRadius: ["1rem", "1.5rem", "0.5rem", "2rem", "1rem"]
                    }}
                    transition={{ 
                        duration: 13, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden md:block absolute bottom-1/4 right-16 w-26 h-26 rounded-2xl rotate-45 backdrop-blur-sm border-2 border-pink-200/40 shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(251,113,133,0.1), rgba(244,114,182,0.08))',
                        boxShadow: '0 6px 24px rgba(236,72,153,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                />
                
                {/* Advanced floating hexagonal shapes */}
                <motion.div
                    animate={{ 
                        y: [0, -35, -20, -30, 0], 
                        x: [0, 15, -10, 12, 0],
                        rotate: [0, 60, 120, 180, 240, 300, 360],
                        scale: [1, 1.2, 1.1, 1.15, 1]
                    }}
                    transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden xl:block absolute top-1/4 left-1/3 w-20 h-20 backdrop-blur-sm border border-emerald-200/40"
                    style={{
                        background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.08))',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        boxShadow: '0 4px 16px rgba(34,197,94,0.1)'
                    }}
                />
                <motion.div
                    animate={{ 
                        y: [0, 28, 12, 24, 0], 
                        x: [0, -18, -8, -14, 0],
                        rotate: [0, -72, -144, -216, -288, -360],
                        scale: [1, 1.18, 1.08, 1.12, 1]
                    }}
                    transition={{ 
                        duration: 17, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="hidden xl:block absolute bottom-1/3 right-1/3 w-18 h-18 backdrop-blur-sm border border-cyan-200/40"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(14,165,233,0.08))',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        boxShadow: '0 4px 16px rgba(6,182,212,0.1)'
                    }}
                />

                {/* Enhanced animated constellation pattern with complex sequences */}
                <motion.div 
                    className="absolute top-10 left-1/4 w-2.5 h-2.5 rounded-full bg-blue-400/70"
                    animate={{ 
                        scale: [0, 1.2, 0.8, 1, 0],
                        opacity: [0, 1, 0.7, 1, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        delay: 0
                    }}
                />
                <motion.div 
                    className="absolute top-32 left-1/3 w-2 h-2 rounded-full bg-orange-400/70"
                    animate={{ 
                        scale: [0, 1.4, 1, 1.2, 0],
                        opacity: [0, 1, 0.8, 1, 0],
                        rotate: [0, -180, -360]
                    }}
                    transition={{ 
                        duration: 4.5,
                        repeat: Infinity,
                        delay: 1
                    }}
                />
                <motion.div 
                    className="absolute bottom-40 right-1/4 w-2.5 h-2.5 rounded-full bg-purple-400/70"
                    animate={{ 
                        scale: [0, 1.3, 0.9, 1.1, 0],
                        opacity: [0, 1, 0.6, 1, 0],
                        rotate: [0, 240, 480]
                    }}
                    transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        delay: 2
                    }}
                />
                <motion.div 
                    className="absolute bottom-64 right-1/3 w-2 h-2 rounded-full bg-pink-400/70"
                    animate={{ 
                        scale: [0, 1.5, 1.2, 1, 0],
                        opacity: [0, 1, 0.9, 1, 0],
                        rotate: [0, -240, -480]
                    }}
                    transition={{ 
                        duration: 4.2,
                        repeat: Infinity,
                        delay: 0.8
                    }}
                />
                <motion.div 
                    className="absolute top-64 right-1/5 w-1.5 h-1.5 rounded-full bg-emerald-400/60"
                    animate={{ 
                        scale: [0, 1.6, 1.3, 1.1, 0],
                        opacity: [0, 1, 0.8, 1, 0],
                        rotate: [0, 300, 600]
                    }}
                    transition={{ 
                        duration: 3.8,
                        repeat: Infinity,
                        delay: 2.5
                    }}
                />
                <motion.div 
                    className="absolute bottom-80 left-1/5 w-2 h-2 rounded-full bg-cyan-400/65"
                    animate={{ 
                        scale: [0, 1.4, 1.1, 1.3, 0],
                        opacity: [0, 1, 0.7, 1, 0],
                        rotate: [0, -300, -600]
                    }}
                    transition={{ 
                        duration: 4.8,
                        repeat: Infinity,
                        delay: 1.8
                    }}
                />
                
                {/* Enhanced connecting lines between constellation dots */}
                <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="constellationGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8"/>
                        </linearGradient>
                        <linearGradient id="constellationGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
                            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M200,100 L400,150 L600,120 L800,180"
                        stroke="url(#constellationGrad1)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                        transition={{
                            pathLength: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                    <motion.path
                        d="M150,300 L350,250 L550,320 L750,280"
                        stroke="url(#constellationGrad2)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="3,7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                        transition={{
                            pathLength: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 },
                            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
                        }}
                    />
                </svg>

                {/* Ultra sophisticated mesh gradient overlay with animated gradients */}
                <motion.div 
                    className="absolute inset-0 opacity-40"
                    animate={{
                        background: [
                            `radial-gradient(circle at 20% 80%, rgba(26,123,230,0.18) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(243,94,14,0.18) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(99,102,241,0.12) 0%, transparent 50%)`,
                            `radial-gradient(circle at 30% 70%, rgba(26,123,230,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 70% 30%, rgba(243,94,14,0.15) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)`,
                            `radial-gradient(circle at 25% 75%, rgba(34,197,94,0.16) 0%, transparent 50%),
                             radial-gradient(circle at 75% 25%, rgba(236,72,153,0.16) 0%, transparent 50%),
                             radial-gradient(circle at 45% 55%, rgba(6,182,212,0.12) 0%, transparent 50%)`,
                            `radial-gradient(circle at 20% 80%, rgba(26,123,230,0.18) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(243,94,14,0.18) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(99,102,241,0.12) 0%, transparent 50%)`
                        ]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Enhanced dynamic dot pattern with animated positioning */}
                <motion.div 
                    className="absolute inset-0 opacity-[0.04]"
                    animate={{
                        backgroundPosition: ['0 0', '30px 30px', '60px 0', '0 0']
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        backgroundImage: `radial-gradient(circle, #1a7be6 1.5px, transparent 1.5px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                
                {/* Ultra-advanced animated path lines with morphing paths */}
                <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="pathGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1a7be6" stopOpacity="0.6"/>
                            <stop offset="25%" stopColor="#6366f1" stopOpacity="0.4"/>
                            <stop offset="50%" stopColor="#f35e0e" stopOpacity="0.3"/>
                            <stop offset="75%" stopColor="#ec4899" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#1a7be6" stopOpacity="0.6"/>
                        </linearGradient>
                        <linearGradient id="pathGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f35e0e" stopOpacity="0.6"/>
                            <stop offset="25%" stopColor="#ec4899" stopOpacity="0.4"/>
                            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3"/>
                            <stop offset="75%" stopColor="#10b981" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#f35e0e" stopOpacity="0.6"/>
                        </linearGradient>
                        <linearGradient id="pathGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5"/>
                            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5"/>
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0,100 Q250,50 500,100 T1000,100"
                        stroke="url(#pathGradient1)"
                        strokeWidth="2.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.8, 0],
                            d: [
                                "M0,100 Q250,50 500,100 T1000,100",
                                "M0,120 Q300,30 600,120 T1200,80",
                                "M0,80 Q200,70 400,80 T800,120",
                                "M0,100 Q250,50 500,100 T1000,100"
                            ]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.path
                        d="M0,200 Q300,150 600,200 T1200,200"
                        stroke="url(#pathGradient2)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.6, 0],
                            d: [
                                "M0,200 Q300,150 600,200 T1200,200",
                                "M0,180 Q350,120 700,180 T1400,240",
                                "M0,220 Q250,180 500,220 T1000,160",
                                "M0,200 Q300,150 600,200 T1200,200"
                            ]
                        }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 4
                        }}
                    />
                    <motion.path
                        d="M0,300 Q400,250 800,300 T1600,300"
                        stroke="url(#pathGradient3)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                            d: [
                                "M0,300 Q400,250 800,300 T1600,300",
                                "M0,320 Q450,220 900,320 T1800,280",
                                "M0,280 Q350,280 700,280 T1400,320",
                                "M0,300 Q400,250 800,300 T1600,300"
                            ]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 8
                        }}
                    />
                </svg>
                
                {/* Advanced particle system simulation */}
                <motion.div 
                    className="absolute top-16 right-1/4 w-1 h-1 rounded-full bg-blue-400/80"
                    animate={{ 
                        x: [0, 50, -30, 20, 0],
                        y: [0, -40, -80, -120, -160],
                        scale: [1, 1.5, 1.2, 0.8, 0],
                        opacity: [0, 0.8, 1, 0.6, 0]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        delay: 0
                    }}
                />
                <motion.div 
                    className="absolute top-24 right-1/3 w-1.5 h-1.5 rounded-full bg-orange-400/80"
                    animate={{ 
                        x: [0, -40, 25, -15, 0],
                        y: [0, -30, -60, -90, -120],
                        scale: [1, 1.3, 1.1, 0.9, 0],
                        opacity: [0, 0.9, 1, 0.7, 0]
                    }}
                    transition={{ 
                        duration: 9,
                        repeat: Infinity,
                        delay: 2
                    }}
                />
                <motion.div 
                    className="absolute bottom-20 left-1/4 w-1.2 h-1.2 rounded-full bg-purple-400/80"
                    animate={{ 
                        x: [0, 35, -25, 15, 0],
                        y: [0, 35, 70, 105, 140],
                        scale: [1, 1.4, 1.2, 0.7, 0],
                        opacity: [0, 0.8, 1, 0.5, 0]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        delay: 4
                    }}
                />
                <motion.div 
                    className="absolute bottom-28 left-1/3 w-1 h-1 rounded-full bg-emerald-400/80"
                    animate={{ 
                        x: [0, -30, 20, -10, 0],
                        y: [0, 25, 50, 75, 100],
                        scale: [1, 1.6, 1.3, 0.8, 0],
                        opacity: [0, 0.9, 1, 0.6, 0]
                    }}
                    transition={{ 
                        duration: 7,
                        repeat: Infinity,
                        delay: 6
                    }}
                />
            </div>

            <div className="relative container mx-auto px-4">
                {/* Ultra Advanced Header Section with Multi-dimensional Effects */}
                <div className="text-center mb-12 md:mb-16 relative">
                    {/* Multi-layered glassmorphism background with animated ripples */}
                    
                    
                    {/* Advanced ripple effects */}
                    <motion.div 
                        className="absolute inset-0 -m-6 rounded-2xl opacity-30"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(26,123,230,0.1) 0%, transparent 70%)'
                        }}
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute inset-0 -m-4 rounded-xl opacity-25"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(243,94,14,0.08) 0%, transparent 60%)'
                        }}
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.15, 0.35, 0.15]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    />
                    
                    {/* Ultra-sophisticated floating decorative elements around header */}
                    <motion.div 
                        className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-50"
                        style={{
                            background: 'linear-gradient(135deg, rgba(26,123,230,0.4), rgba(59,130,246,0.2), rgba(99,102,241,0.1))'
                        }}
                        animate={{ 
                            scale: [1, 1.5, 1.2, 1.4, 1],
                            rotate: [0, 120, 240, 360],
                            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
                            x: [0, -5, 3, -2, 0],
                            y: [0, 8, -5, 6, 0]
                        }}
                        transition={{ 
                            duration: 18, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl rotate-45 opacity-50"
                        style={{
                            background: 'linear-gradient(45deg, rgba(243,94,14,0.4), rgba(234,88,12,0.2), rgba(251,146,60,0.1))'
                        }}
                        animate={{ 
                            scale: [1, 1.4, 1.1, 1.3, 1],
                            rotate: [45, 180, 315, 450],
                            opacity: [0.25, 0.6, 0.35, 0.5, 0.25],
                            x: [0, 8, -4, 6, 0],
                            y: [0, -6, 4, -3, 0]
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    {/* Complex geometric patterns with morphing shapes */}
                    <motion.div 
                        className="absolute top-6 left-12 w-10 h-10 border-2 border-purple-300/50 rounded-lg rotate-12"
                        animate={{ 
                            rotate: [12, 75, 135, 195, 255, 315, 372],
                            scale: [1, 1.2, 1.05, 1.15, 1],
                            borderRadius: ["0.5rem", "1rem", "1.5rem", "0.75rem", "0.5rem"]
                        }}
                        transition={{ 
                            duration: 25, 
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-8 right-16 w-8 h-8 border-2 border-pink-300/50 rounded-full"
                        animate={{ 
                            scale: [1, 1.6, 1.2, 1.4, 1],
                            opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
                            x: [0, 6, -4, 3, 0],
                            y: [0, -8, 5, -3, 0]
                        }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    
                    {/* Advanced hexagonal accent elements */}
                    <motion.div 
                        className="absolute top-16 right-24 w-6 h-6 opacity-40"
                        style={{
                            background: 'linear-gradient(60deg, rgba(168,85,247,0.5), rgba(99,102,241,0.3))',
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                        animate={{ 
                            rotate: [0, 60, 120, 180, 240, 300, 360],
                            scale: [1, 1.3, 1.1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.4, 0.5, 0.3]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-20 left-20 w-5 h-5 opacity-35"
                        style={{
                            background: 'linear-gradient(60deg, rgba(34,197,94,0.4), rgba(16,185,129,0.2))',
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                        animate={{ 
                            rotate: [0, -72, -144, -216, -288, -360],
                            scale: [1, 1.4, 1.2, 1.1, 1],
                            opacity: [0.25, 0.5, 0.35, 0.4, 0.25]
                        }}
                        transition={{ 
                            duration: 17, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                
                <div className="relative z-10 py-8">
                    {/* Ultra-enhanced badge with multi-dimensional animations */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 200 }}
                        className="inline-block mb-8 relative"
                    >
                        {/* Multi-layered animated glow rings around badge */}
                        
                        <motion.div 
                            className="absolute inset-0 rounded-full blur-md opacity-50"
                            style={{
                                background: 'radial-gradient(circle, rgba(26,123,230,0.6), rgba(243,94,14,0.4), transparent)'
                            }}
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.7, 0.4]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        
                        <motion.span 
                            className="relative inline-flex items-center py-4 px-8 text-sm font-inter font-semibold bg-gradient-to-r from-blue-50/90 to-orange-50/90 text-[#1a7be6] rounded-full border border-blue-200/60 backdrop-blur-md shadow-xl"
                            whileHover={{ 
                                scale: 1.08,
                                boxShadow: "0 15px 40px rgba(26,123,230,0.25)",
                                y: -2
                            }}
                            animate={{
                                boxShadow: [
                                    "0 5px 25px rgba(26,123,230,0.15)",
                                    "0 8px 35px rgba(243,94,14,0.2)",
                                    "0 6px 30px rgba(99,102,241,0.18)",
                                    "0 5px 25px rgba(26,123,230,0.15)"
                                ]
                            }}
                            transition={{ 
                                duration: 6,
                                repeat: Infinity
                            }}
                        >
                            <motion.svg 
                                className="w-5 h-5 mr-3" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                animate={{ 
                                    rotate: [0, 8, -8, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </motion.svg>
                            <span className="relative z-10">
                                Jadwal Event
                                
                                
                            </span>
                        </motion.span>
                    </motion.div>

                    {/* Ultra-sophisticated main heading with advanced dimensional effects */}
                    <motion.h1 
                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 150 }}
                        className="font-unbounded text-3xl md:text-5xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight relative"
                    >
                        <span className="relative z-10">
                            <span className="text-gray-900">
                                Discover Amazing{' '}
                            </span>
                            <span className="relative inline-block">
                                <motion.span 
                                    className="text-[#1a7be6] relative z-10"
                                    animate={{
                                        textShadow: [
                                            "0 0 20px rgba(26,123,230,0.4)",
                                            "0 0 40px rgba(26,123,230,0.6)",
                                            "0 0 60px rgba(26,123,230,0.4)",
                                            "0 0 20px rgba(26,123,230,0.4)"
                                        ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    Events
                                </motion.span>
                                
                                {/* Simple blue underline */}
                                <motion.span 
                                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-[#1a7be6] -z-10"
                                    initial={{ width: 0 }}
                                    animate={{ 
                                        width: "100%"
                                    }}
                                    transition={{ 
                                        width: { duration: 1.5, delay: 1.5 }
                                    }}
                                />
                                
                                {/* Enhanced particle effects constellation */}
                                <motion.div 
                                    className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-blue-400"
                                    animate={{ 
                                        scale: [0, 1.5, 1, 1.2, 0],
                                        opacity: [0, 1, 0.7, 1, 0],
                                        rotate: [0, 180, 360]
                                    }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: 2
                                    }}
                                />
                                <motion.div 
                                    className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-purple-400"
                                    animate={{ 
                                        scale: [0, 1.3, 0.8, 1.1, 0],
                                        opacity: [0, 1, 0.8, 1, 0],
                                        rotate: [0, -180, -360]
                                    }}
                                    transition={{ 
                                        duration: 3.5,
                                        repeat: Infinity,
                                        delay: 3
                                    }}
                                />
                                <motion.div 
                                    className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-pink-400"
                                    animate={{ 
                                        scale: [0, 1.8, 1.2, 1.4, 0],
                                        opacity: [0, 1, 0.6, 1, 0],
                                        x: [0, 5, -3, 2, 0],
                                        y: [0, -3, 2, -1, 0]
                                    }}
                                    transition={{ 
                                        duration: 4,
                                        repeat: Infinity,
                                        delay: 4
                                    }}
                                />
                            </span>
                            <br className="hidden sm:block" />
                            <motion.div 
                                className="inline-block relative"
                                animate={{
                                    filter: [
                                        "drop-shadow(0 0 10px rgba(243,94,14,0.4))",
                                        "drop-shadow(0 0 20px rgba(243,94,14,0.6))",
                                        "drop-shadow(0 0 15px rgba(243,94,14,0.5))",
                                        "drop-shadow(0 0 10px rgba(243,94,14,0.4))"
                                    ]
                                }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            >
                                <Image
                                    src="/images/assets/logo/Logo FWB PNG Transparan.png"
                                    alt="FWB+ Logo"
                                    width={200}
                                    height={80}
                                    className="w-auto h-8 ml-2 md:h-16 md:ml-0 lg:h-20"
                                    priority
                                />
                            </motion.div>
                        </span>
                    </motion.h1>
                    
                    {/* Enhanced description with sophisticated typography effects */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="max-w-2xl mx-auto relative"
                    >
                        {/* Subtle background accent for text */}
                        <div className="absolute inset-0 -m-4 rounded-2xl bg-gradient-to-r from-blue-50/30 to-orange-50/30 blur-sm"></div>
                        
                        <p className="font-inter text-lg md:text-xl text-gray-600 leading-relaxed relative z-10 p-4">
                            <motion.span
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{ duration: 8, repeat: Infinity }}
                                style={{
                                    background: 'linear-gradient(90deg, rgb(107,114,128), rgb(26,123,230), rgb(107,114,128))',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                Temukan dan ikuti berbagai ‎
                            </motion.span>
                            <span className="font-semibold text-gray-700 relative">
                                acara menarik
                                <motion.span 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent rounded"
                                    animate={{ x: [-100, 100] }}
                                    transition={{ 
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </span>
                            <motion.span
                                animate={{
                                    backgroundPosition: ['100% 50%', '0% 50%', '100% 50%']
                                }}
                                transition={{ duration: 6, repeat: Infinity }}
                                style={{
                                    background: 'linear-gradient(90deg, rgb(107,114,128), rgb(243,94,14), rgb(107,114,128))',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                {' '}yang telah kami siapkan untuk Anda. 
                                Jelajahi kalender event dan ‎
                            </motion.span>
                            <span className="font-semibold text-[#1a7be6] relative">
                                bergabunglah
                                <motion.span 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/40 to-transparent rounded"
                                    animate={{ x: [100, -100] }}
                                    transition={{ 
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                />
                            </span>
                            <span className="text-gray-600"> dengan komunitas kami.</span>
                        </p>
                    </motion.div>

                    {/* Ultra-sophisticated floating decorative elements around text */}
                    <motion.div 
                        className="absolute -top-6 -right-8 w-16 h-16 rounded-full opacity-20"
                        style={{
                            background: 'linear-gradient(135deg, #1a7be6, #6366f1)'
                        }}
                        animate={{ 
                            y: [0, -15, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 12, repeat: Infinity }}
                    />
                    <motion.div 
                        className="absolute -bottom-8 -left-6 w-12 h-12 rounded-2xl rotate-45 opacity-20"
                        style={{
                            background: 'linear-gradient(45deg, #f35e0e, #ec4899)'
                        }}
                        animate={{ 
                            rotate: [45, 135, 225, 315],
                            scale: [1, 1.3, 1],
                            x: [0, 10, 0]
                        }}
                        transition={{ duration: 16, repeat: Infinity }}
                    />
                    
                    {/* Advanced floating micro-elements */}
                    <motion.div 
                        className="absolute top-12 right-16 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                        animate={{ 
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div 
                        className="absolute bottom-16 left-20 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
                        animate={{ 
                            x: [0, 15, 0],
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.8, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    />
                    <motion.div 
                        className="absolute top-20 left-12 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-teal-400"
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 2, 1],
                            opacity: [0.2, 0.7, 0.2]
                        }}
                        transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div 
                        className="absolute bottom-12 right-8 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                        animate={{ 
                            y: [0, -12, 0],
                            x: [0, -8, 0],
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0.9, 0.3]
                        }}
                        transition={{ duration: 7, repeat: Infinity, delay: 3 }}
                    />
                </div>
            </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-8">
                    {/* Calendar */}
                    <div>{renderCompactCalendar()}</div>

                    {/* Selected Date Events */}
                    <AnimatePresence>
                        {selectedDateEvents.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                            >
                                <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                                    <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-orange-50/60 to-blue-50/40">
                                        <div className="p-2 rounded-xl bg-[#f35e0e]/10 border border-[#f35e0e]/20">
                                            <svg className="w-5 h-5 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-unbounded font-bold text-gray-800">Events Hari Ini</h4>
                                            <p className="text-sm text-gray-600 font-inter">{formatDate(selectedDate)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {selectedDateEvents.map((event, index) => (
                                            <motion.div 
                                                key={event._id} 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className="p-4 rounded-2xl bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/60"
                                            >
                                                <h5 className="font-unbounded font-bold text-gray-900 mb-2">{event.title}</h5>
                                                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {formatDateTime(event.startTime)}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* All Events Section */}
                    <motion.div 
                        className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-orange-50/40">
                                <div>
                                    <h2 className="font-unbounded text-2xl font-bold text-gray-900 mb-2">
                                        Semua <span className="text-[#1a7be6]">Events</span>
                                    </h2>
                                    <p className="font-inter text-gray-600">
                                        Jelajahi koleksi lengkap event kami
                                    </p>
                                </div>
                                
                                <motion.div 
                                    className="flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-[#f35e0e]/10 to-[#f35e0e]/5 border border-[#f35e0e]/20"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-2xl font-unbounded font-bold text-[#f35e0e]">{events.length}</div>
                                    <div className="text-xs text-gray-600 font-medium">Total Events</div>
                                </motion.div>
                            </div>

                            <div className="space-y-6">
                                <AnimatePresence>
                                    {events.length > 0 ? (
                                        events.map((event, index) => (
                                            <motion.div 
                                                key={event._id}
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                className="group relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 transition-all duration-500"
                                                whileHover={{ y: -8, scale: 1.02 }}
                                            >
                                                <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-unbounded font-bold text-gray-900 mb-3 group-hover:text-[#1a7be6] transition-colors duration-300">
                                                                {event.title}
                                                            </h3>
                                                            <p className="text-gray-600 font-inter leading-relaxed">
                                                                {event.description}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3">
                                                            {getStatusBadge(event.status)}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm border border-gray-200/50">
                                                        <motion.div 
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <div className="p-2 rounded-lg bg-[#1a7be6]/10 border border-[#1a7be6]/20">
                                                                <svg className="w-4 h-4 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Mulai</p>
                                                                <p className="text-sm font-inter font-semibold text-gray-900">{formatDateTime(event.startTime)}</p>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div 
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <div className="p-2 rounded-lg bg-[#f35e0e]/10 border border-[#f35e0e]/20">
                                                                <svg className="w-4 h-4 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Selesai</p>
                                                                <p className="text-sm font-inter font-semibold text-gray-900">{formatDateTime(event.endTime)}</p>
                                                            </div>
                                                        </motion.div>

                                                        <motion.div 
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 sm:col-span-2"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <div className="p-2 rounded-lg bg-green-100/80 border border-green-200">
                                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-500 mb-1">Lokasi</p>
                                                                <p className="text-sm font-inter font-semibold text-gray-900">{event.location || 'Lokasi akan ditentukan'}</p>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                                        >
                                            <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-12 text-center">
                                                <motion.div 
                                                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a7be6]/20 to-[#f35e0e]/20 flex items-center justify-center"
                                                    animate={{ rotate: [0, 5, -5, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                >
                                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </motion.div>
                                                
                                                <h3 className="text-2xl font-unbounded font-bold text-gray-900 mb-3">
                                                    Tidak Ada <span className="text-[#1a7be6]">Event</span>
                                                </h3>
                                                <p className="text-gray-600 font-inter leading-relaxed">
                                                    Belum ada event yang terjadwal. Pantau terus halaman ini untuk update event terbaru!
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Desktop Layout - Optimized with wider calendar and aligned sidebar */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Calendar Column - Wider on desktop */}
                        <div className="col-span-5 xl:col-span-4">
                            {renderCompactCalendar()}
                        </div>

                        {/* Selected Date Events Column - Aligned with event details */}
                        <div className="col-span-3 xl:col-span-3">
                            <AnimatePresence>
                                {selectedDateEvents.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl h-fit"
                                    >
                                        <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                                            <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-gradient-to-r from-orange-50/60 to-blue-50/40">
                                                <div className="p-2 rounded-xl bg-[#f35e0e]/10 border border-[#f35e0e]/20">
                                                    <svg className="w-5 h-5 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-unbounded font-bold text-gray-800">Events Hari Ini</h4>
                                                    <p className="text-sm text-gray-600 font-inter">{formatDate(selectedDate)}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                                {selectedDateEvents.map((event, index) => (
                                                    <motion.div 
                                                        key={event._id} 
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                                        className="relative group overflow-hidden rounded-2xl p-1 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border border-white/60 transition-all duration-300"
                                                    >
                                                        <div className="relative rounded-xl bg-white/70 backdrop-blur-sm p-4 border border-white/50">
                                                            <h5 className="font-unbounded font-bold text-gray-900 text-sm mb-2 group-hover:text-[#1a7be6] transition-colors">{event.title}</h5>
                                                            
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                                    <div className="p-1 rounded-lg bg-gray-100/50">
                                                                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span>{event.location || 'TBA'}</span>
                                                                </div>
                                                                
                                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                                    <div className="p-1 rounded-lg bg-gray-100/50">
                                                                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span>{formatDateTime(event.startTime)}</span>
                                                                </div>
                                                                
                                                                <div className="mt-2">
                                                                    {getStatusBadge(event.status)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* All Events Column */}
                        <div className="col-span-4 xl:col-span-5">
                            <motion.div 
                                className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                                    <div className="flex items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-orange-50/40">
                                        <div>
                                            <h2 className="font-unbounded text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                                Semua <span className="text-[#1a7be6]">Events</span>
                                            </h2>
                                            <p className="font-inter text-gray-600 leading-relaxed">
                                                Jelajahi koleksi lengkap event kami. Klik tanggal di kalender untuk melihat event spesifik pada hari tersebut.
                                            </p>
                                        </div>
                                        
                                        <motion.div 
                                            className="hidden sm:flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-[#f35e0e]/10 to-[#f35e0e]/5 border border-[#f35e0e]/20"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-2xl font-unbounded font-bold text-[#f35e0e]">{events.length}</div>
                                            <div className="text-xs text-gray-600 font-medium">Total Events</div>
                                        </motion.div>
                                    </div>

                                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                                        <AnimatePresence>
                                            {events.length > 0 ? (
                                                events.map((event, index) => (
                                                    <motion.div 
                                                        key={event._id}
                                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                                        className="group relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50  hover:shadow-3xl transition-all duration-500"
                                                        whileHover={{ y: -4, scale: 1.01 }}
                                                    >
                                                        <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-6">
                                                            <div className="flex flex-col gap-4 mb-6">
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <h3 className="text-xl font-unbounded font-bold text-gray-900 group-hover:text-[#1a7be6] transition-colors duration-300 leading-tight">
                                                                        {event.title}
                                                                    </h3>
                                                                    {getStatusBadge(event.status)}
                                                                </div>
                                                                
                                                                <p className="text-gray-600 font-inter leading-relaxed text-sm">
                                                                    {event.description}
                                                                </p>
                                                            </div>

                                                            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm border border-gray-200/50">
                                                                <motion.div 
                                                                    className="flex flex-col gap-2 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60"
                                                                    whileHover={{ scale: 1.02 }}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="p-1.5 rounded-lg bg-[#1a7be6]/10 border border-[#1a7be6]/20">
                                                                            <svg className="w-3.5 h-3.5 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                            </svg>
                                                                        </div>
                                                                        <p className="text-xs font-medium text-gray-500">Mulai</p>
                                                                    </div>
                                                                    <p className="text-xs font-inter font-semibold text-gray-900 leading-tight">{formatDateTime(event.startTime)}</p>
                                                                </motion.div>

                                                                <motion.div 
                                                                    className="flex flex-col gap-2 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60"
                                                                    whileHover={{ scale: 1.02 }}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="p-1.5 rounded-lg bg-[#f35e0e]/10 border border-[#f35e0e]/20">
                                                                            <svg className="w-3.5 h-3.5 text-[#f35e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                        </div>
                                                                        <p className="text-xs font-medium text-gray-500">Selesai</p>
                                                                    </div>
                                                                    <p className="text-xs font-inter font-semibold text-gray-900 leading-tight">{formatDateTime(event.endTime)}</p>
                                                                </motion.div>

                                                                <motion.div 
                                                                    className="flex flex-col gap-2 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60"
                                                                    whileHover={{ scale: 1.02 }}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="p-1.5 rounded-lg bg-green-100/80 border border-green-200">
                                                                            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            </svg>
                                                                        </div>
                                                                        <p className="text-xs font-medium text-gray-500">Lokasi</p>
                                                                    </div>
                                                                    <p className="text-xs font-inter font-semibold text-gray-900 leading-tight">{event.location || 'TBA'}</p>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <motion.div 
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/40 via-white/30 to-transparent backdrop-blur-xl border border-white/50 shadow-2xl"
                                                >
                                                    <div className="relative rounded-[22px] bg-white/90 backdrop-blur-lg border border-white/95 p-12 text-center">
                                                        <motion.div 
                                                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a7be6]/20 to-[#f35e0e]/20 flex items-center justify-center"
                                                            animate={{ rotate: [0, 5, -5, 0] }}
                                                            transition={{ duration: 4, repeat: Infinity }}
                                                        >
                                                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </motion.div>
                                                        
                                                        <h3 className="text-2xl font-unbounded font-bold text-gray-900 mb-3">
                                                            Tidak Ada <span className="text-[#1a7be6]">Event</span>
                                                        </h3>
                                                        <p className="text-gray-600 font-inter leading-relaxed">
                                                            Belum ada event yang terjadwal. Pantau terus halaman ini untuk update event terbaru!
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
