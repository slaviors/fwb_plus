"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FWBConfigPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const router = useRouter();

  const adminCards = [
    // {
    //   title: "Event Management",
    //   description:
    //     "Buat, edit, dan kelola semua event FWB Plus. Atur detail acara, peserta, dan jadwal.",
    //   icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    //   color: "#1a7be6",
    //   path: "/fwb-config/event",
    // },
    {
      title: "Microsite Builder",
      description:
        "Buat dan kustomisasi halaman link khusus untuk event. Desain landing page yang menarik.",
      icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
      color: "#f35e0e",
      path: "/fwb-config/microsite",
    },
    {
      title: "Review Management",
      description: "Lihat dan kelola review dari pengguna.",
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      color: "#fbbf24",
      path: "/fwb-config/review",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % adminCards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [adminCards.length]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          <div className="text-lg font-rubik font-medium text-gray-700">
            Memuat Admin Panel...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-orange-100/30 blur-3xl"></div>

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

      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center p-1">
                  <Image
                    src="/images/assets/logo/Logo FWB PNG Transparan.png"
                    alt="FWB Plus"
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-sm sm:text-lg lg:text-xl font-unbounded font-bold text-gray-900">
                    Admin Panel
                  </h1>
                  <p className="text-xs font-rubik text-gray-500 hidden sm:block">FWB Plus</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-[#1a7be6] px-2 py-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1"
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
                  <span className="hidden sm:inline">Website</span>
                </motion.div>
              </Link>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-3 py-2 sm:px-5 sm:py-2 rounded-full bg-[#f35e0e] text-white font-medium text-xs sm:text-sm shadow-md group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1"
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
                  <span className="hidden sm:inline">Logout</span>
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

      <main className="max-w-7xl mx-auto pt-20 sm:pt-24 pb-8 px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-3xl shadow-md p-8 mb-8 border border-blue-100/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-unbounded font-bold text-gray-900 mb-2"
                >
                  Selamat Datang,
                  <span className="relative">
                    <span className="relative z-10 text-[#1a7be6]">
                      {" "}
                      {user.username}!{" "}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-100 rounded-full -z-0"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-lg text-gray-600 font-rubik mb-4 max-w-2xl"
                >
                  Panel kontrol FWB Plus Event Organizer. Kelola pengaturan
                  aplikasi dan konten website Anda dengan mudah.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center text-sm text-gray-500 font-rubik"
                >
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
                  Terakhir login:{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="w-24 h-24  rounded-2xl hidden lg:flex items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/images/assets/logo/Logo FWB PNG Transparan.png"
                      alt="FWB Plus Logo"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-unbounded text-2xl font-bold text-gray-900 mb-6">
              Management Menu
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => router.push(card.path)}
                  className="h-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border border-blue-100/50 hover:border-blue-300/50 hover:-translate-y-1"
                  style={{ "--card-color": card.color }} // Store the color as a CSS variable for hover effects
                >
                  <div className="h-full w-full p-8 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${card.color}20` }}
                      >
                        <svg
                          className="w-8 h-8"
                          style={{ color: card.color }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={card.icon}
                          />
                        </svg>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-gray-400 transition-colors"
                        style={{ color: "var(--text-hover-color, #gray-400)" }}
                      >
                        <svg
                          className="w-5 h-5 group-hover:text-[var(--card-color)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-2xl font-unbounded font-bold text-gray-900 mb-3 transition-colors group-hover:[color:var(--card-color)]">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 font-rubik mb-6 max-w-lg">
                        {card.description}
                      </p>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden inline-flex items-center px-6 py-3 rounded-full text-white font-medium shadow-md"
                        style={{ backgroundColor: card.color }}
                      >
                        <span className="relative z-10 flex items-center">
                          <span>Buka {card.title}</span>
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
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

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
    </div>
  );
}
