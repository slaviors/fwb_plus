"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MicrositePreview from "./MicrositePreview";

export default function MicrositePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [microsite, setMicrosite] = useState({
    links: [],
    socialMedia: {
      website: "",
      whatsapp: "",
      instagram: "",
      facebook: "",
      twitter: "",
    },
    isPublished: false,
    _id: null
  });
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const router = useRouter();

  // SVG Social Media Icons
  const socialIcons = {
    website: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  };

  const fetchMicrosite = useCallback(async () => {
    try {
      const response = await fetch("/api/fwb-config/microsite");
      if (response.ok) {
        const data = await response.json();
        if (data.microsite) {
          setMicrosite(prevState => ({
            ...prevState,
            ...data.microsite,
            socialMedia: {
              ...prevState.socialMedia,
              ...data.microsite.socialMedia
            }
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching microsite:", error);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        await fetchMicrosite();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router, fetchMicrosite]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const generateLinkId = () => {
    return "link_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  };

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      const link = {
        id: generateLinkId(),
        title: newLink.title.trim(),
        url: newLink.url.trim(),
        order: microsite.links ? microsite.links.length : 0,
      };

      setMicrosite(prevState => ({
        ...prevState,
        links: [...(prevState.links || []), link],
      }));

      setNewLink({ title: "", url: "" });
    }
  };

  const removeLink = (linkId) => {
    const newLinks = (microsite.links || []).filter((link) => link.id !== linkId);
    // Reorder remaining links
    const reorderedLinks = newLinks.map((link, index) => ({
      ...link,
      order: index,
    }));

    setMicrosite(prevState => ({
      ...prevState,
      links: reorderedLinks,
    }));
  };

  const updateLink = (linkId, field, value) => {
    setMicrosite(prevState => ({
      ...prevState,
      links: (prevState.links || []).map((link) =>
        link.id === linkId ? { ...link, [field]: value } : link
      ),
    }));
  };

  const moveLink = (linkId, direction) => {
    const currentLinks = [...(microsite.links || [])].sort((a, b) => a.order - b.order);
    const currentIndex = currentLinks.findIndex(link => link.id === linkId);
    
    if (direction === 'up' && currentIndex > 0) {
      // Swap with previous item
      const newLinks = [...currentLinks];
      [newLinks[currentIndex], newLinks[currentIndex - 1]] = [newLinks[currentIndex - 1], newLinks[currentIndex]];
      
      // Update order values
      const updatedLinks = newLinks.map((link, index) => ({
        ...link,
        order: index,
      }));

      setMicrosite(prevState => ({
        ...prevState,
        links: updatedLinks,
      }));
    } else if (direction === 'down' && currentIndex < currentLinks.length - 1) {
      // Swap with next item
      const newLinks = [...currentLinks];
      [newLinks[currentIndex], newLinks[currentIndex + 1]] = [newLinks[currentIndex + 1], newLinks[currentIndex]];
      
      // Update order values  
      const updatedLinks = newLinks.map((link, index) => ({
        ...link,
        order: index,
      }));

      setMicrosite(prevState => ({
        ...prevState,
        links: updatedLinks,
      }));
    }
  };

  const updateSocialMedia = (platform, url) => {
    setMicrosite(prevState => ({
      ...prevState,
      socialMedia: {
        ...prevState.socialMedia,
        [platform]: url,
      },
    }));
  };

  const saveMicrosite = async () => {
    setSaving(true);
    try {
      const method = microsite._id ? "PUT" : "POST";
      const body = microsite._id
        ? { ...microsite, id: microsite._id }
        : microsite;

      const response = await fetch("/api/fwb-config/microsite", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setMicrosite(prevState => ({
          ...prevState,
          ...data.microsite
        }));
        alert("Microsite saved successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save microsite: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error saving microsite:", error);
      alert("Error saving microsite");
    } finally {
      setSaving(false);
    }
  };

  const publishMicrosite = async () => {
    if (!microsite._id) {
      alert("Please save the microsite first");
      return;
    }

    try {
      const response = await fetch("/api/fwb-config/microsite", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...microsite,
          id: microsite._id,
          isPublished: true,
        }),
      });

      if (response.ok) {
        alert("Microsite published successfully!");
        await fetchMicrosite();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to publish microsite: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error publishing microsite:", error);
      alert("Error publishing microsite");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if logout request fails
      router.push("/login");
    }
  };

  const copyPublicAPI = () => {
    if (typeof window === 'undefined') return;
    
    const apiUrl = `${window.location.origin}/api/public/microsite`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(apiUrl)
        .then(() => {
          alert("Public API URL copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy with clipboard API:", err);
          fallbackCopyTextToClipboard(apiUrl);
        });
    } else {
      fallbackCopyTextToClipboard(apiUrl);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert("Public API URL copied to clipboard!");
      } else {
        alert("Failed to copy URL. Please copy manually: " + text);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert("Failed to copy URL. Please copy manually: " + text);
    }
    
    document.body.removeChild(textArea);
  };

  // Handle Enter key press for adding links
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
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
          <div className="text-base sm:text-lg font-medium text-gray-700">
            Memuat Microsite Builder...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circles */}
        <div className="absolute top-20 right-[10%] w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 rounded-full bg-orange-100/30 blur-3xl"></div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-[#1a7be6]/20"
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
          className="absolute top-[30%] right-[15%] w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f35e0e]/20"
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
          className="absolute bottom-[25%] right-[20%] w-10 h-10 sm:w-12 sm:h-12 rounded-md rotate-45 bg-[#1a7be6]/10"
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
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center p-1">
                  <img 
                    src="/images/assets/logo/Logo FWB PNG Transparan.png" 
                    alt="FWB Plus" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900">
                    Admin Panel
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">Microsite Builder</p>
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
                className="relative overflow-hidden px-3 py-2 sm:px-4 sm:py-2 lg:px-5 lg:py-2 rounded-full bg-[#f35e0e] text-white font-medium text-xs sm:text-sm shadow-md group"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-24 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900 text-center lg:text-left"
            >
              Buat Microsite
              <span className="relative">
                <span className="relative z-10 text-[#1a7be6]"> FWB Plus </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-blue-100 rounded-full -z-0"
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
              className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
            >
              Buat dan kelola landing page kustom dengan mudah. Tambahkan tautan
              dan media sosial untuk meningkatkan visibilitas online Anda.
            </motion.p>

            {/* Stats with animation */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              {[
                {
                  number: (microsite.links || []).length,
                  label: "Links",
                  delay: 0.3,
                  color: "#1a7be6",
                },
                {
                  number: Object.values(microsite.socialMedia || {}).filter(Boolean).length,
                  label: "Social Media",
                  delay: 0.5,
                  color: "#1a7be6",
                },
                {
                  number: microsite.isPublished ? "Yes" : "No",
                  label: "Published",
                  delay: 0.7,
                  color: "#1a7be6",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  whileHover={{ y: -5 }}
                  className="p-3 sm:p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3
                    className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Form for new links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-6 border border-blue-100/50"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-3">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Tambah Link Baru
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Judul link (contoh: Portfolio Kami)"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors text-sm sm:text-base"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors text-sm sm:text-base"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  onKeyPress={handleKeyPress}
                />
                <motion.button
                  onClick={addLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden w-full px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#1a7be6] text-white font-medium text-sm sm:text-base lg:text-lg shadow-lg shadow-blue-200 group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Tambah Link</span>
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-blue-600 z-0"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 bg-white rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-6 border border-blue-100/50"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-3">
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
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v1m0 2h8"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Media Sosial
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.keys(socialIcons).map((platform) => (
                  <div key={platform} className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 flex-shrink-0">
                      {socialIcons[platform]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <input
                        type="url"
                        placeholder={`${
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        } URL`}
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors text-xs sm:text-sm"
                        value={microsite.socialMedia[platform] || ""}
                        onChange={(e) =>
                          updateSocialMedia(platform, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0"
            >
              <motion.button
                onClick={saveMicrosite}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden flex-1 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#1a7be6] text-white font-medium text-sm sm:text-base lg:text-lg shadow-lg shadow-blue-200 group disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  <span>{saving ? "Menyimpan..." : "Simpan"}</span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-blue-600 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </motion.button>

              <motion.button
                onClick={publishMicrosite}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-[#1a7be6] font-medium text-sm sm:text-base lg:text-lg shadow-lg border border-blue-200 flex items-center justify-center group hover:bg-blue-50 transition-colors"
              >
                <span>Publikasikan</span>
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:rotate-45"
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

          {/* Right Content - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <MicrositePreview 
              microsite={microsite} 
              isHovering={isHovering} 
              setIsHovering={setIsHovering} 
            />
          </motion.div>
        </div>

        {/* Link Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 border border-blue-100/50"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a7be6] rounded-xl flex items-center justify-center mr-3">
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Atur Urutan Link
              </h3>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={copyPublicAPI}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow-sm flex items-center text-xs sm:text-sm hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="hidden sm:inline">Copy API URL</span>
                <span className="sm:hidden">API</span>
              </motion.button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Gunakan tombol naik/turun untuk mengatur urutan link yang akan ditampilkan pada microsite.
          </p>

          {/* Links List with Up/Down Controls */}
          <div className="space-y-3 sm:space-y-4">
            {(!microsite.links || microsite.links.length === 0) ? (
              <div className="p-6 sm:p-8 text-center bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#1a7be6]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Belum Ada Link
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Tambahkan link pertama Anda menggunakan form di atas
                </p>
              </div>
            ) : (
              microsite.links
                .sort((a, b) => a.order - b.order)
                .map((link, index) => (
                  <motion.div
                    key={link.id}
                    className="p-3 sm:p-4 rounded-xl bg-white shadow-md border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      {/* Order Controls */}
                      <div className="flex sm:flex-col gap-1 order-3 sm:order-1">
                        <motion.button
                          onClick={() => moveLink(link.id, 'up')}
                          disabled={index === 0}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:hover:scale-100 transition-all"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </motion.button>
                        <motion.button
                          onClick={() => moveLink(link.id, 'down')}
                          disabled={index === microsite.links.length - 1}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 text-blue-600 hover:text-blue-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:hover:scale-100 transition-all"
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Link Content */}
                      <div className="flex-1 space-y-2 sm:space-y-3 order-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={link.title || ""}
                          onChange={(e) =>
                            updateLink(link.id, "title", e.target.value)
                          }
                          className="w-full border-gray-200 rounded-lg border px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6]"
                          placeholder="Judul link"
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="url"
                            value={link.url || ""}
                            onChange={(e) =>
                              updateLink(link.id, "url", e.target.value)
                            }
                            className="flex-1 border-gray-200 rounded-lg border px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6]"
                            placeholder="URL"
                          />
                          <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap">
                            #{index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="order-1 sm:order-3 self-start sm:self-center">
                        <motion.button
                          onClick={() => removeLink(link.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-1.5 sm:p-2 rounded-lg text-[#f35e0e] hover:bg-orange-50 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
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
                    </div>
                  </motion.div>
                ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Wave divider integrated with background */}
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