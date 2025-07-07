"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image";

export default function MicrositePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
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
  });
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const router = useRouter();

  const STATIC_TITLE = "FWB Plus";
  const STATIC_ICON = "🔗";

  // SVG Social Media Icons
  const socialIcons = {
    website: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    facebook: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  };

  // Auto-rotate links in preview
  useEffect(() => {
    if (isHovering || microsite.links.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentLinkIndex((prev) => (prev + 1) % microsite.links.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering, microsite.links.length]);

  const fetchMicrosite = useCallback(async () => {
    try {
      const response = await fetch("/api/fwb-config/microsite");
      if (response.ok) {
        const data = await response.json();
        if (data.microsite) {
          setMicrosite(data.microsite);
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
        fetchMicrosite();
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
    if (newLink.title && newLink.url) {
      const link = {
        id: generateLinkId(),
        title: newLink.title,
        url: newLink.url,
        order: microsite.links.length,
      };

      setMicrosite({
        ...microsite,
        links: [...microsite.links, link],
      });

      setNewLink({ title: "", url: "" });
    }
  };

  const removeLink = (linkId) => {
    setMicrosite({
      ...microsite,
      links: microsite.links.filter((link) => link.id !== linkId),
    });
  };

  const updateLink = (linkId, field, value) => {
    setMicrosite({
      ...microsite,
      links: microsite.links.map((link) =>
        link.id === linkId ? { ...link, [field]: value } : link
      ),
    });
  };

  const updateSocialMedia = (platform, url) => {
    setMicrosite({
      ...microsite,
      socialMedia: {
        ...microsite.socialMedia,
        [platform]: url,
      },
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(microsite.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setMicrosite({
      ...microsite,
      links: updatedItems,
    });
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
        setMicrosite(data.microsite);
        alert("Microsite saved successfully!");
      } else {
        alert("Failed to save microsite");
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
        fetchMicrosite();
      } else {
        alert("Failed to publish microsite");
      }
    } catch (error) {
      console.error("Error publishing microsite:", error);
      alert("Error publishing microsite");
    }
  };

  const openPreviewInNewTab = () => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${STATIC_TITLE} - Microsite Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
          }
          .container { max-width: 400px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 2rem; }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
          .title { font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem; }
          .status { 
            display: inline-flex; 
            padding: 0.25rem 0.75rem; 
            font-size: 0.75rem; 
            font-weight: 600; 
            border-radius: 9999px; 
            background-color: #dcfce7; 
            color: #166534; 
          }
          .links { margin-bottom: 2rem; }
          .link {
            display: block;
            width: 100%;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
            text-align: center;
            text-decoration: none;
            color: #1f2937;
            font-weight: 500;
            transition: all 0.2s;
            cursor: pointer;
          }
          .link:hover {
            background: #f9fafb;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }
          .social { display: flex; justify-content: center; gap: 1.5rem; }
          .social-icon { 
            width: 40px; 
            height: 40px; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            background: white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            opacity: 0.8; 
            cursor: pointer;
            transition: all 0.2s;
          }
          .social-icon:hover { 
            opacity: 1; 
            transform: scale(1.1);
          }
          .social-icon svg { width: 20px; height: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">${STATIC_ICON}</div>
            <h1 class="title">${STATIC_TITLE}</h1>
            ${
              microsite.isPublished
                ? '<span class="status">Published</span>'
                : ""
            }
          </div>
          <div class="links">
            ${microsite.links
              .sort((a, b) => a.order - b.order)
              .map(
                (link) => `
                <a href="${
                  link.url.startsWith("http") ? link.url : "https://" + link.url
                }" 
                   target="_blank" 
                   class="link">
                  ${link.title}
                </a>
              `
              )
              .join("")}
          </div>
          ${
            Object.entries(microsite.socialMedia).some(([_, url]) => url)
              ? `
            <div class="social">
              ${Object.entries(microsite.socialMedia)
                .filter(([_, url]) => url)
                .map(([platform, url]) => {
                  let href = url;
                  if (
                    platform === "whatsapp" &&
                    !url.startsWith("https://wa.me/")
                  ) {
                    href = `https://wa.me/${url.replace(/[^0-9]/g, "")}`;
                  } else if (!url.startsWith("http")) {
                    href = `https://${url}`;
                  }

                  const svgIcons = {
                    website:
                      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
                    whatsapp:
                      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528"/></svg>',
                    instagram:
                      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
                    facebook:
                      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
                    twitter:
                      '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
                  };

                  return `
                    <a href="${href}" target="_blank" class="social-icon">
                      ${svgIcons[platform]}
                    </a>
                  `;
                })
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </body>
      </html>
    `);
    previewWindow.document.close();
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const openRealMicrosite = () => {
    const micrositeUrl = "https://links-fwb-plus.vercel.app";
    window.open(micrositeUrl, "_blank");
  };

  const copyPublicAPI = () => {
    const apiUrl = `${window.location.origin}/api/public/microsite`;
    navigator.clipboard
      .writeText(apiUrl)
      .then(() => {
        alert("Public API URL copied to clipboard!");
      })
      .catch(() => {
        const textArea = document.createElement("textarea");
        textArea.value = apiUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Public API URL copied to clipboard!");
      });
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
              <motion.button
                onClick={() => router.push("/fwb-config")}
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
              </motion.button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#f35e0e] rounded-xl flex items-center justify-center">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-unbounded font-bold text-gray-900">
                    Panel
                  </h1>
                  <p className="text-xs font-rubik text-gray-500">Microsite</p>
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
              Buat Microsite
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
              className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 font-rubik"
            >
              Buat dan kelola landing page kustom dengan mudah. Tambahkan tautan
              dan media sosial untuk meningkatkan visibilitas online Anda.
            </motion.p>

            {/* Stats with animation */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  number: microsite.links.length,
                  label: "Links",
                  delay: 0.3,
                  color: "#1a7be6",
                },
                {
                  number: Object.values(microsite.socialMedia).filter(Boolean)
                    .length,
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
                  className="p-2 md:p-3 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3
                    className="font-unbounded text-xl md:text-2xl lg:text-3xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-rubik">
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
              className="mt-8 bg-white rounded-3xl shadow-md p-6 border border-blue-100/50"
            >
              <div className="flex items-center mb-4">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-unbounded font-bold text-gray-900">
                  Tambah Link Baru
                </h3>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Judul link (contoh: Portfolio Kami)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors font-rubik"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
                <motion.button
                  onClick={addLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden w-full px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group"
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
              className="mt-6 bg-white rounded-3xl shadow-md p-6 border border-blue-100/50"
            >
              <div className="flex items-center mb-4">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-unbounded font-bold text-gray-900">
                  Media Sosial
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(socialIcons).map((platform) => (
                  <div key={platform} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                      {socialIcons[platform]}
                    </div>
                    <div className="flex-1">
                      <input
                        type="url"
                        placeholder={`${
                          platform.charAt(0).toUpperCase() + platform.slice(1)
                        } URL`}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6] transition-colors text-sm font-rubik"
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
              className="mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={saveMicrosite}
                disabled={saving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-8 py-4 rounded-full bg-[#1a7be6] text-white font-medium text-lg shadow-lg shadow-blue-200 group disabled:opacity-70"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white text-[#1a7be6] font-medium text-lg shadow-lg border border-blue-200 flex items-center justify-center group hover:bg-blue-50 transition-colors"
              >
                <span>Publikasikan</span>
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

          {/* Right Content - Preview (similar to Hero's image carousel) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="relative h-[500px] max-w-[450px] mx-auto">
              {/* Device frame with animation */}
              <div className="absolute inset-0 bg-gray-800 rounded-[3rem] shadow-2xl shadow-blue-200/50 overflow-hidden border-8 border-gray-800">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-xl z-20"></div>

                {/* Screen Content */}
                <div className="h-full w-full bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto p-6">
                  {/* Preview header */}
                  <div className="text-center mb-6 pt-4">
                    <div className="text-4xl mb-3">{STATIC_ICON}</div>
                    <h2 className="text-xl font-unbounded font-bold text-gray-900 mb-2">
                      {STATIC_TITLE}
                    </h2>
                    {microsite.isPublished && (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
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
                        Published
                      </span>
                    )}
                  </div>

                  {/* Links carousel - similar to Hero image carousel */}
                  <div
                    className="relative h-[300px] mb-6"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <AnimatePresence>
                      {microsite.links.length === 0 ? (
                        <motion.div
                          key="empty-state"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.7 }}
                          className="h-full w-full flex flex-col items-center justify-center text-center bg-white rounded-3xl shadow-xl shadow-blue-200/30 border border-blue-100/50 p-6"
                        >
                          <div className="w-16 h-16 mb-4 bg-blue-50 rounded-full flex items-center justify-center">
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
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-unbounded font-semibold text-gray-900 mb-2">
                            Belum Ada Link
                          </h3>
                          <p className="text-sm text-gray-600 font-rubik">
                            Tambahkan link pertama Anda untuk memulai
                          </p>
                        </motion.div>
                      ) : (
                        microsite.links.map((link, index) => (
                          <motion.div
                            key={link.id}
                            className={`absolute inset-0 ${
                              index === currentLinkIndex ? "z-20" : "z-10"
                            }`}
                            initial={{
                              opacity: 0,
                              rotateY: -20,
                              scale: 0.9,
                              x: 40,
                            }}
                            animate={{
                              opacity: index === currentLinkIndex ? 1 : 0.7,
                              rotateY: index === currentLinkIndex ? 0 : 10,
                              scale: index === currentLinkIndex ? 1 : 0.85,
                              x:
                                index === currentLinkIndex
                                  ? 0
                                  : index ===
                                    (currentLinkIndex + 1) %
                                      microsite.links.length
                                  ? 40
                                  : -40,
                              zIndex: index === currentLinkIndex ? 20 : 10,
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.7 }}
                          >
                            <div className="h-full w-full bg-white rounded-3xl shadow-xl shadow-blue-200/30 border border-blue-100/50 overflow-hidden group">
                              <div className="h-full flex flex-col items-center justify-center p-6 relative">
                                <div className="mb-4 text-center">
                                  <h3 className="text-xl font-unbounded font-bold text-gray-900">
                                    {link.title || "Untitled Link"}
                                  </h3>
                                  <p className="text-sm text-gray-600 font-rubik mt-2 break-all">
                                    {link.url
                                      ? link.url.length > 30
                                        ? link.url.substring(0, 30) + "..."
                                        : link.url
                                      : "No URL"}
                                  </p>
                                </div>

                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="relative overflow-hidden px-6 py-3 rounded-full bg-[#1a7be6] text-white font-medium shadow-md group"
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
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                    <span>Lihat Link</span>
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

                                {/* Order badge */}
                                <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                  #{link.order + 1}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>

                    {/* Navigation dots */}
                    {microsite.links.length > 0 && (
                      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-3 mt-6">
                        {microsite.links.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentLinkIndex(idx)}
                            className="relative p-1 focus:outline-none"
                          >
                            <motion.span
                              animate={{
                                scale: idx === currentLinkIndex ? 1 : 0.7,
                                opacity: idx === currentLinkIndex ? 1 : 0.5,
                              }}
                              className={`block w-3 h-3 rounded-full ${
                                idx === currentLinkIndex
                                  ? "bg-[#1a7be6]"
                                  : "bg-gray-300"
                              }`}
                            />
                            {idx === currentLinkIndex && (
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

                  {/* Social Media Icons */}
                  {Object.entries(microsite.socialMedia).some(
                    ([_, url]) => url
                  ) && (
                    <div className="flex justify-center space-x-4 mt-10">
                      {Object.entries(microsite.socialMedia).map(
                        ([platform, url]) =>
                          url ? (
                            <motion.div
                              key={platform}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a7be6] hover:bg-blue-50 shadow-md transition-all duration-300 cursor-pointer"
                            >
                              {socialIcons[platform]}
                            </motion.div>
                          ) : null
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Control buttons underneath device */}
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-3">
                <motion.button
                  onClick={openPreviewInNewTab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-white text-[#1a7be6] font-medium shadow-md border border-blue-200 flex items-center text-sm hover:bg-blue-50 transition-colors"
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Preview in New Tab
                </motion.button>
                <motion.button
                  onClick={openRealMicrosite}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-full bg-[#1a7be6] text-white font-medium shadow-md flex items-center text-sm"
                >
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Open Live Site
                </motion.button>
              </div>
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

        {/* Link Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-blue-100/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
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
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-unbounded font-bold text-gray-900">
                Atur Urutan Link
              </h3>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={copyPublicAPI}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium shadow-sm flex items-center text-sm hover:bg-gray-200 transition-colors"
              >
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy API URL
              </motion.button>
            </div>
          </div>

          <p className="text-gray-600 font-rubik mb-6">
            Seret dan letakkan untuk mengatur urutan link yang akan ditampilkan
            pada microsite.
          </p>

          {/* Drag and Drop Links */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {microsite.links.length === 0 ? (
                    <div className="p-8 text-center bg-blue-50/50 rounded-xl border border-blue-100">
                      <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
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
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                      </div>
                      <h4 className="font-unbounded text-lg font-semibold text-gray-900 mb-2">
                        Belum Ada Link
                      </h4>
                      <p className="text-gray-600 font-rubik">
                        Tambahkan link pertama Anda menggunakan form di atas
                      </p>
                    </div>
                  ) : (
                    microsite.links.map((link, index) => (
                      <Draggable
                        key={link.id}
                        draggableId={link.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`p-4 rounded-xl bg-white transition-all duration-300 ${
                              snapshot.isDragging
                                ? "shadow-2xl border-2 border-blue-300"
                                : "shadow-md border border-gray-200 hover:border-blue-200 hover:shadow-lg"
                            }`}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                  />
                                </svg>
                              </div>
                              <div className="flex-1 space-y-2">
                                <input
                                  type="text"
                                  value={link.title}
                                  onChange={(e) =>
                                    updateLink(link.id, "title", e.target.value)
                                  }
                                  className="w-full border-gray-200 rounded-lg border px-3 py-2 text-sm font-rubik focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6]"
                                  placeholder="Judul link"
                                />
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) =>
                                      updateLink(link.id, "url", e.target.value)
                                    }
                                    className="flex-1 border-gray-200 rounded-lg border px-3 py-2 text-sm font-rubik focus:ring-2 focus:ring-[#1a7be6] focus:border-[#1a7be6]"
                                    placeholder="URL"
                                  />
                                  <span className="inline-flex items-center justify-center bg-blue-50 text-blue-600 text-sm font-medium px-3 rounded-lg">
                                    #{index + 1}
                                  </span>
                                </div>
                              </div>
                              <motion.button
                                onClick={() => removeLink(link.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg text-[#f35e0e] hover:bg-orange-50 transition-colors"
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
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </motion.div>
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
