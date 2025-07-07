"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function EventManagementPage() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isHoveringEvent, setIsHoveringEvent] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
  });
  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/fwb-config/event");
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        fetchEvents();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router, fetchEvents]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auto-rotate events in carousel view
  useEffect(() => {
    if (isHoveringEvent || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHoveringEvent, events.length]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const jakartaOffset = 7 * 60 * 60 * 1000;
    const jakartaDate = new Date(date.getTime() + jakartaOffset);

    return jakartaDate.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      planned: {
        bg: "bg-[#1a7be6]/10",
        text: "text-[#1a7be6]",
        icon: (
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      ongoing: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: (
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      ended: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: (
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
      },
    };

    const labels = {
      planned: "Akan Datang",
      ongoing: "Sedang Berlangsung",
      ended: "Selesai",
    };

    const badgeData = badges[status];

    return (
      <span
        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${badgeData.bg} ${badgeData.text}`}
      >
        {badgeData.icon}
        {labels[status]}
      </span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingEvent
        ? `/api/fwb-config/event/${editingEvent._id}/edit`
        : "/api/fwb-config/event";

      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEvents();
        setShowForm(false);
        setEditingEvent(null);
        setFormData({
          title: "",
          description: "",
          location: "",
          startTime: "",
          endTime: "",
        });
      } else {
        const data = await response.json();
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Network error");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      startTime: new Date(event.startTime).toISOString().slice(0, 16),
      endTime: new Date(event.endTime).toISOString().slice(0, 16),
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (confirm("Apakah Anda yakin ingin menghapus event ini?")) {
      try {
        const response = await fetch(
          `/api/fwb-config/event/${eventId}/delete`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchEvents();
        } else {
          alert("Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Network error");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Stats untuk ditampilkan
  const statItems = [
    {
      number: events.length > 0 ? events.length : "0",
      label: "Total Events",
      delay: 0.3,
      color: "#1a7be6",
    },
    {
      number: events.filter((e) => e.status === "planned").length || "0",
      label: "Upcoming",
      delay: 0.5,
      color: "#1a7be6",
    },
    {
      number: events.filter((e) => e.status === "ongoing").length || "0",
      label: "On Going",
      delay: 0.7,
      color: "#1a7be6",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4"
          >
            <svg
              className="w-full h-full text-[#1a7be6]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </motion.div>
          <div className="text-lg font-unbounded font-medium text-gray-700">
            Memuat Event Management...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section
      id="event-management"
      className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circles */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-orange-100/30 blur-3xl"></div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-8 h-8 rounded-md bg-[#1a7be6]/20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#f35e0e]/20"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[20%] w-12 h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Admin Navbar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Link href="/fwb-config">
                <motion.div
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-[#1a7be6] hover:text-blue-700 font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </motion.div>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-unbounded font-bold text-gray-900">
                    Panel
                  </h1>
                  <p className="text-xs font-rubik text-gray-500">Event</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-5 py-2 rounded-full bg-[#f35e0e] text-white font-medium text-sm shadow-md group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-orange-600 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content - Similar to Hero */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-unbounded text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900"
            >
              Kelola Event
              <span className="relative">
                <span className="relative z-10 text-[#1a7be6]"> FWB Plus </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100 rounded-full -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0"
            >
              Buat, edit, dan kelola semua event FWB Plus dengan mudah. Atur
              detail acara, lokasi, dan waktu untuk pengalaman terbaik.
            </motion.p>

            {/* Stats with animation */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
              {statItems.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  whileHover={{ y: -5 }}
                  className="p-2 md:p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3
                    className="font-unbounded text-xl md:text-2xl lg:text-3xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button with hover effect - Just like Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => {
                  setShowForm(true);
                  setEditingEvent(null);
                  setFormData({
                    title: "",
                    description: "",
                    location: "",
                    startTime: "",
                    endTime: "",
                  });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Buat Event Baru</span>
                  <motion.svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
                <motion.span
                  className="absolute inset-0 bg-blue-600 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.button>

              <motion.button
                onClick={() => setShowForm(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-[#1a7be6] font-medium text-lg shadow-lg border border-blue-200 flex items-center justify-center group hover:bg-blue-50 transition-colors"
              >
                <span>Lihat Daftar Event</span>
                <motion.svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </motion.svg>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Event Carousel (similar to Hero image carousel) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] max-w-[450px] mx-auto">
              {/* 3D stacked events with hover interaction */}
              <div
                className="relative h-full w-full"
                onMouseEnter={() => setIsHoveringEvent(true)}
                onMouseLeave={() => setIsHoveringEvent(false)}
              >
                {events.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="h-full w-full rounded-3xl shadow-2xl shadow-blue-200/50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm border border-blue-100/50"
                  >
                    <div className="w-24 h-24 mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-[#1a7be6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-unbounded font-semibold text-gray-900 mb-2">
                      Belum Ada Event
                    </h3>
                    <p className="text-gray-600 font-rubik mb-6 text-center px-6">
                      Mulai dengan membuat event pertama dengan mengklik tombol
                      Buat Event Baru
                    </p>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {events.map((event, index) => (
                      <motion.div
                        key={event._id}
                        className={`absolute inset-0 ${
                          index === currentEventIndex ? "z-20" : "z-10"
                        }`}
                        initial={{
                          opacity: 0,
                          rotateY: -20,
                          scale: 0.9,
                          x: 40,
                        }}
                        animate={{
                          opacity: index === currentEventIndex ? 1 : 0.7,
                          rotateY: index === currentEventIndex ? 0 : 10,
                          scale: index === currentEventIndex ? 1 : 0.85,
                          x:
                            index === currentEventIndex
                              ? 0
                              : index ===
                                (currentEventIndex + 1) % events.length
                              ? 40
                              : -40,
                          zIndex: index === currentEventIndex ? 20 : 10,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7 }}
                      >
                        <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl shadow-blue-200/50 hover:shadow-blue-300/70 transition-shadow group bg-white border border-blue-100/50">
                          <div className="relative h-full w-full overflow-hidden p-6 flex flex-col">
                            {/* Header with status */}
                            <div className="flex justify-between items-center mb-4">
                              <h2 className="font-unbounded text-2xl font-bold text-gray-900">
                                {event.title}
                              </h2>
                              {getStatusBadge(event.status)}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 font-rubik mb-6 flex-grow overflow-hidden">
                              {event.description.length > 150
                                ? `${event.description.substring(0, 150)}...`
                                : event.description}
                            </p>

                            {/* Progressive blur overlay - similar to Hero image overlay */}
                            <div className="absolute left-0 bottom-0 right-0 w-full h-1/2 pointer-events-none">
                              <div
                                className="absolute top-0 left-0 bottom-0 right-0"
                                style={{
                                  backdropFilter: "blur(8px)",
                                  mask: "linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 80%)",
                                  WebkitMask:
                                    "linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 80%)",
                                }}
                              ></div>

                              {/* Gradient overlay */}
                              <div
                                className="absolute top-0 left-0 right-0 bottom-0"
                                style={{
                                  background:
                                    "linear-gradient(transparent 20%, rgba(255, 255, 255, 0.9) 80%)",
                                }}
                              ></div>
                            </div>

                            {/* Event details on bottom - similar to Hero image text overlay */}
                            <div className="mt-auto relative z-10">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                  opacity: index === currentEventIndex ? 1 : 0,
                                  y: index === currentEventIndex ? 0 : 20,
                                }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 font-rubik mb-6">
                                  <div className="flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-2 text-[#1a7be6]"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                    <span className="font-medium text-gray-700">
                                      {event.location}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-2 text-[#1a7be6]"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <span className="font-medium text-gray-700">
                                      {
                                        formatDateTime(event.startTime).split(
                                          " "
                                        )[0]
                                      }
                                    </span>
                                  </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3">
                                  <motion.button
                                    onClick={() => handleEdit(event)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative overflow-hidden flex-1 px-4 py-3 rounded-full bg-[#1a7be6] text-white font-medium shadow-md group"
                                  >
                                    <span className="relative z-10 flex items-center justify-center">
                                      <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <span>Edit Event</span>
                                    </span>
                                    <motion.span
                                      className="absolute inset-0 bg-blue-600 z-0"
                                      initial={{ x: "100%" }}
                                      whileHover={{ x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  </motion.button>

                                  <motion.button
                                    onClick={() => handleDelete(event._id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative overflow-hidden px-4 py-3 rounded-full bg-white text-[#f35e0e] border border-[#f35e0e] font-medium shadow-md flex items-center"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </motion.button>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Navigation dots - exactly like in Hero */}
              {events.length > 0 && (
                <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 mt-6">
                  {events.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentEventIndex(idx)}
                      className="relative p-1 focus:outline-none"
                    >
                      <motion.span
                        animate={{
                          scale: idx === currentEventIndex ? 1 : 0.7,
                          opacity: idx === currentEventIndex ? 1 : 0.5,
                        }}
                        className={`block w-3 h-3 rounded-full ${
                          idx === currentEventIndex
                            ? "bg-[#1a7be6]"
                            : "bg-gray-300"
                        }`}
                      />
                      {idx === currentEventIndex && (
                        <motion.span
                          layoutId="dotIndicator"
                          className="absolute inset-0 rounded-full border-2 border-[#1a7be6]"
                          transition={{ duration: 0.5, type: "spring" }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Decorative elements - just like in Hero */}
            <motion.div
              className="hidden md:block absolute -top-6 -right-12 w-20 h-20 rounded-full border-4 border-orange-200/50 z-0"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="hidden md:block absolute -bottom-8 -left-8 w-24 h-24 rounded-xl border-4 border-blue-200/50 z-0 rotate-12"
              animate={{
                y: [0, 15, 0],
                rotate: [12, 20, 12],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Event Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="mt-16"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-unbounded font-bold text-gray-900">
                      {editingEvent ? "Edit Event" : "Buat Event Baru"}
                    </h3>
                    <p className="text-gray-600 font-rubik text-sm">
                      {editingEvent
                        ? "Perbarui detail event"
                        : "Isi formulir untuk membuat event baru"}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-rubik">
                      <svg
                        className="w-4 h-4 inline mr-2 text-[#1a7be6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Judul Event
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                      placeholder="Masukkan judul event..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-rubik">
                      <svg
                        className="w-4 h-4 inline mr-2 text-[#1a7be6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                      Deskripsi
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                      placeholder="Deskripsikan event Anda..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-rubik">
                      <svg
                        className="w-4 h-4 inline mr-2 text-[#1a7be6]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Lokasi
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                      placeholder="Alamat atau tempat event..."
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-rubik">
                        <svg
                          className="w-4 h-4 inline mr-2 text-[#1a7be6]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Waktu Mulai (WIB)
                      </label>
                      <input
                        type="datetime-local"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startTime: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 font-rubik">
                        <svg
                          className="w-4 h-4 inline mr-2 text-[#1a7be6]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Waktu Selesai (WIB)
                      </label>
                      <input
                        type="datetime-local"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData({ ...formData, endTime: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative overflow-hidden flex-1 px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {editingEvent ? "Perbarui Event" : "Buat Event"}
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-blue-600 z-0"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingEvent(null);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white text-gray-700 px-8 py-4 rounded-full font-medium shadow-md border border-gray-200 flex items-center justify-center group hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Batal
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events List */}
        {!showForm && events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-white rounded-3xl shadow-xl border border-blue-100/50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-unbounded font-bold text-gray-900">
                Daftar Semua Event
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-unbounded font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        {getStatusBadge(event.status)}
                      </div>
                      <p className="text-gray-600 font-rubik mb-4">
                        {event.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 font-rubik">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-[#1a7be6]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-medium">Lokasi:</span>
                          <span className="ml-1">{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-[#1a7be6]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Mulai:</span>
                          <span className="ml-1">
                            {formatDateTime(event.startTime)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-[#1a7be6]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Selesai:</span>
                          <span className="ml-1">
                            {formatDateTime(event.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 lg:ml-6">
                      <motion.button
                        onClick={() => handleEdit(event)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden px-4 py-2 rounded-full bg-[#1a7be6] text-white font-medium text-sm shadow-md group flex items-center justify-center"
                      >
                        <span className="relative z-10 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-blue-600 z-0"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </motion.button>

                      <motion.button
                        onClick={() => handleDelete(event._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden px-4 py-2 rounded-full bg-[#f35e0e] text-white font-medium text-sm shadow-md group flex items-center justify-center"
                      >
                        <span className="relative z-10 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Hapus
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-orange-600 z-0"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Wave divider integrated with background - same as in Hero */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F9FF" />
              <stop offset="50%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
  );
}
