"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

function filterByRange(reviews, range, customStart, customEnd) {
  const now = new Date();
  let start, end;
  switch (range) {
    case "24jam":
      start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      end = now;
      break;
    case "7hari":
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      end = now;
      break;
    case "1bulan":
      start = new Date(now.setMonth(now.getMonth() - 1));
      end = new Date();
      break;
    case "custom":
      start = customStart ? new Date(customStart) : null;
      end = customEnd ? new Date(customEnd) : null;
      break;
    default:
      return reviews;
  }
  return reviews.filter((r) => {
    const created = new Date(r.createdAt);
    if (start && end) return created >= start && created <= end;
    return true;
  });
}

function exportToCSV(reviews) {
  const header = ["Nama", "Bintang", "Pesan", "Waktu"];
  const rows = reviews.map((r) => [
    `"${r.name.replace(/"/g, '""')}"`,
    r.star,
    `"${r.message.replace(/"/g, '""')}"`,
    new Date(r.createdAt).toLocaleString("id-ID"),
  ]);
  const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "review-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportToTXT(reviews) {
  const lines = reviews.map(
    (r) =>
      `Nama: ${r.name}\nBintang: ${r.star}\nPesan: ${
        r.message
      }\nWaktu: ${new Date(r.createdAt).toLocaleString("id-ID")}\n---`
  );
  const txtContent = lines.join("\n");
  const blob = new Blob([txtContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "review-export.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function exportToXLSX(reviews) {
  const data = reviews.map((r) => ({
    Nama: r.name,
    Bintang: r.star,
    Pesan: r.message,
    Waktu: new Date(r.createdAt).toLocaleString("id-ID"),
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reviews");
  XLSX.writeFile(wb, "review-export.xlsx");
}

function exportToJSON(reviews) {
  const blob = new Blob([JSON.stringify(reviews, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "review-export.json";
  a.click();
  URL.revokeObjectURL(url);
}

function exportToPDF(reviews) {
  const doc = new jsPDF();
  doc.setFontSize(12);
  let y = 10;
  reviews.forEach((r, i) => {
    doc.text(`Nama: ${r.name}`, 10, y);
    y += 7;
    doc.text(`Bintang: ${r.star}`, 10, y);
    y += 7;
    doc.text(`Pesan: ${r.message}`, 10, y);
    y += 7;
    doc.text(`Waktu: ${new Date(r.createdAt).toLocaleString("id-ID")}`, 10, y);
    y += 10;
    if (y > 270 && i < reviews.length - 1) {
      doc.addPage();
      y = 10;
    }
  });
  doc.save("review-export.pdf");
}

export default function ReviewAdminPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("7hari");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(10);
  const router = useRouter();

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
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch("/api/fwb-config/fetchReview", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setLoading(false);
      });
  }, [user]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, customStart, customEnd]);

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
            Memuat Review Admin...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  const filtered = filterByRange(reviews, filter, customStart, customEnd);

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = filtered.slice(startIndex, endIndex);

  const averageRating =
    filtered.length > 0
      ? (
          filtered.reduce((sum, r) => sum + (Number(r.star) || 0), 0) /
          filtered.length
        ).toFixed(2)
      : null;

  const exportButtons = [
    {
      label: "CSV",
      action: () => exportToCSV(filtered),
      color: "bg-green-600 hover:bg-green-700",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      label: "Excel",
      action: () => exportToXLSX(filtered),
      color: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "PDF",
      action: () => exportToPDF(filtered),
      color: "bg-red-600 hover:bg-red-700",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      label: "JSON",
      action: () => exportToJSON(filtered),
      color: "bg-orange-600 hover:bg-orange-700",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      label: "TXT",
      action: () => exportToTXT(filtered),
      color: "bg-gray-600 hover:bg-gray-700",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Decorative elements */}
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
      </div>

      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              <motion.button
                onClick={() => router.push("/fwb-config")}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-[#1a7be6] hover:text-blue-700 font-medium"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
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
              </motion.button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-20 h-20 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center p-1">
                  <img 
                    src="/images/assets/logo/Logo FWB PNG Transparan.png" 
                    alt="FWB Plus" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="hidden xs:block sm:block">
                  <h1 className="text-sm sm:text-lg lg:text-xl font-unbounded font-bold text-gray-900">
                    Admin Panel
                  </h1>
                  <p className="text-xs font-rubik text-gray-500 hidden sm:block">Review Management</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
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
                  <span className="sm:inline pl-2">Logout</span>
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-8 md:pb-12 lg:pb-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-unbounded text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900"
          >
            Kelola Review
            <span className="relative inline-block ml-2">
              <img 
                src="/images/assets/logo/Logo FWB PNG Transparan.png" 
                alt="FWB Plus" 
                className="inline-block h-8 md:h-10 lg:h-12 xl:h-14 w-auto object-contain align-baseline"
              />
              <motion.span
                className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 bg-blue-100 rounded-full -z-0"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-3 md:mt-4 lg:mt-6 text-base md:text-lg lg:text-xl text-gray-600 max-w-lg mx-auto font-rubik px-4"
          >
            Analisis dan kelola review pelanggan dengan mudah. Export data dalam
            berbagai format.
          </motion.p>

          {/* Stats Cards */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              {
                number: filtered.length,
                label: "Reviews",
                delay: 0.3,
                color: "#1a7be6",
                icon: (
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
              },
              {
                number: averageRating !== null ? averageRating : "-",
                label: "Rating Rata-rata",
                delay: 0.5,
                color: "#f59e0b",
                icon: (
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                suffix: averageRating !== null ? "/5" : "",
              },
              {
                number: reviews.length,
                label: "Total Semua Reviews",
                delay: 0.7,
                color: "#10b981",
                icon: (
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ y: -5 }}
                className="p-4 md:p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/50"
              >
                <div className="flex items-center justify-center mb-2">
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
                <h3
                  className="font-unbounded text-xl md:text-2xl lg:text-3xl font-bold text-center"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                  {stat.suffix}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 font-rubik text-center mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-blue-100/50 mb-6 sm:mb-8"
        >
          <div className="flex items-center mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-2 sm:mr-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-unbounded font-bold text-gray-900">
              Filter & Export
            </h3>
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 md:gap-3 mb-6">
            {[
              { key: "24jam", label: "24 Jam", shortLabel: "24h" },
              { key: "7hari", label: "7 Hari", shortLabel: "7h" },
              { key: "1bulan", label: "1 Bulan", shortLabel: "1bln" },
              { key: "all", label: "Semua", shortLabel: "All" },
              { key: "custom", label: "Custom", shortLabel: "Custom" },
            ].map((filterOption) => (
              <motion.button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 text-center ${
                  filter === filterOption.key
                    ? "bg-[#1a7be6] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="sm:hidden">{filterOption.shortLabel}</span>
                <span className="hidden sm:inline">{filterOption.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Custom Date Range */}
          <AnimatePresence>
            {filter === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-blue-50/50 rounded-xl"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Akhir
                  </label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Export Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2 md:gap-3">
            {exportButtons.map((btn, index) => (
              <motion.button
                key={btn.label}
                onClick={btn.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-2 rounded-full text-white font-medium text-xs sm:text-sm shadow-md transition-all duration-300 flex items-center justify-center ${btn.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="mr-1 sm:mr-2">{btn.icon}</span>
                <span className="truncate">Export {btn.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-blue-100/50"
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-unbounded font-bold text-gray-900">
              Daftar Review ({filtered.length})
              {totalPages > 1 && (
                <span className="block text-xs md:text-sm font-rubik font-normal text-gray-500 mt-1">
                  Halaman {currentPage} dari {totalPages}
                </span>
              )}
            </h3>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#1a7be6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="font-unbounded text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Review
              </h4>
              <p className="text-gray-600 font-rubik">
                Tidak ada review yang ditemukan untuk filter yang dipilih
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {currentReviews.map((review, index) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 to-white border border-blue-100/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1a7be6] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-unbounded font-bold text-sm md:text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-unbounded font-semibold text-gray-900 text-sm md:text-base truncate">
                          {review.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 md:w-4 md:h-4 ${
                                i < review.star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-xs md:text-sm text-gray-600 font-rubik">
                            {review.star}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="text-xs text-gray-500 font-rubik">
                        {new Date(review.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="text-xs text-gray-400 font-rubik">
                        {new Date(review.createdAt).toLocaleTimeString(
                          "id-ID",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 rounded-xl p-3 md:p-4 border border-blue-100/30">
                    <p className="text-gray-700 font-rubik leading-relaxed text-sm md:text-base break-words">
                      "{review.message}"
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Pagination Component */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-8 space-y-4"
                >
                  {/* Mobile Pagination Info */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600 font-rubik">
                      Menampilkan {startIndex + 1} - {Math.min(endIndex, filtered.length)} dari {filtered.length} review
                    </div>
                  </div>

                  {/* Desktop Pagination */}
                  <div className="hidden sm:flex items-center justify-between p-6 bg-gradient-to-r from-blue-50/50 to-white rounded-2xl border border-blue-100/50">
                    <div className="text-sm text-gray-600 font-rubik">
                      Menampilkan {startIndex + 1} - {Math.min(endIndex, filtered.length)} dari {filtered.length} review
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Previous Button */}
                      <motion.button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                        className={`px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 shadow-sm"
                        }`}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </motion.button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-1">
                        {(() => {
                          const pages = [];
                          const maxVisiblePages = 5;
                          let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                          let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                          if (endPage - startPage < maxVisiblePages - 1) {
                            startPage = Math.max(1, endPage - maxVisiblePages + 1);
                          }

                          if (startPage > 1) {
                            pages.push(
                              <motion.button
                                key={1}
                                onClick={() => setCurrentPage(1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 font-medium text-sm transition-all duration-300"
                              >
                                1
                              </motion.button>
                            );
                            if (startPage > 2) {
                              pages.push(
                                <span key="ellipsis1" className="text-gray-400 text-sm">...</span>
                              );
                            }
                          }

                          for (let page = startPage; page <= endPage; page++) {
                            pages.push(
                              <motion.button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                whileHover={{ scale: page === currentPage ? 1 : 1.1 }}
                                whileTap={{ scale: page === currentPage ? 1 : 0.9 }}
                                className={`w-8 h-8 rounded-lg font-medium text-sm transition-all duration-300 ${
                                  page === currentPage
                                    ? "bg-[#1a7be6] text-white shadow-md"
                                    : "bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50"
                                }`}
                              >
                                {page}
                              </motion.button>
                            );
                          }

                          if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                              pages.push(
                                <span key="ellipsis2" className="text-gray-400 text-sm">...</span>
                              );
                            }
                            pages.push(
                              <motion.button
                                key={totalPages}
                                onClick={() => setCurrentPage(totalPages)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 rounded-lg bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 font-medium text-sm transition-all duration-300"
                              >
                                {totalPages}
                              </motion.button>
                            );
                          }

                          return pages;
                        })()}
                      </div>

                      {/* Next Button */}
                      <motion.button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                        className={`px-3 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 shadow-sm"
                        }`}
                      >
                        Next
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Mobile Pagination */}
                  <div className="sm:hidden space-y-4 p-4 bg-gradient-to-r from-blue-50/50 to-white rounded-2xl border border-blue-100/50">
                    {/* Mobile Navigation Buttons */}
                    <div className="flex justify-between items-center">
                      <motion.button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 shadow-sm"
                        }`}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Prev
                      </motion.button>

                      <div className="text-sm font-medium text-gray-900">
                        {currentPage} / {totalPages}
                      </div>

                      <motion.button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-[#1a7be6] border border-blue-200 hover:bg-blue-50 shadow-sm"
                        }`}
                      >
                        Next
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Quick Jump Dropdown */}
                    <select
                      value={currentPage}
                      onChange={(e) => setCurrentPage(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik text-sm bg-white"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>
                          Halaman {page} dari {totalPages}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Wave divider */}
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
