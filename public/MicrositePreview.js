import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MicrositePreview = ({ microsite, isHovering, setIsHovering }) => {
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

  const STATIC_TITLE = "FWB Plus";
  const STATIC_ICON = "🔗";

  // SVG Social Media Icons
  const socialIcons = {
    website: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.528" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    facebook: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
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

  const openRealMicrosite = () => {
    const micrositeUrl = "https://links-fwbplus.id";
    window.open(micrositeUrl, "_blank");
  };

  return (
    <div className="relative w-full max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
      <div className="relative h-[450px] sm:h-[500px] lg:h-[600px]">
        {/* Device frame with animation */}
        <div className="absolute inset-0 bg-gray-800 rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-blue-200/50 overflow-hidden border-4 sm:border-8 border-gray-800">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-7 bg-gray-800 rounded-b-xl z-20"></div>

          {/* Screen Content */}
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto p-4 sm:p-6">
            {/* Preview header */}
            <div className="text-center mb-4 sm:mb-6 pt-3 sm:pt-4">
              <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{STATIC_ICON}</div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-unbounded font-bold text-gray-900 mb-1 sm:mb-2">
                {STATIC_TITLE}
              </h2>
              {microsite.isPublished && (
                <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  <svg
                    className="w-2 h-2 sm:w-3 sm:h-3 mr-1"
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

            {/* Links carousel */}
            <div
              className="relative h-[200px] sm:h-[250px] lg:h-[300px] mb-4 sm:mb-6"
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
                    className="h-full w-full flex flex-col items-center justify-center text-center bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-200/30 border border-blue-100/50 p-4 sm:p-6"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-blue-50 rounded-full flex items-center justify-center">
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
                    <h3 className="text-sm sm:text-lg font-unbounded font-semibold text-gray-900 mb-2">
                      Belum Ada Link
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-rubik">
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
                      <div className="h-full w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-200/30 border border-blue-100/50 overflow-hidden group">
                        <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 relative">
                          <div className="mb-3 sm:mb-4 text-center">
                            <h3 className="text-base sm:text-lg lg:text-xl font-unbounded font-bold text-gray-900">
                              {link.title || "Untitled Link"}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-rubik mt-2 break-all">
                              {link.url
                                ? link.url.length > 25
                                  ? link.url.substring(0, 25) + "..."
                                  : link.url
                                : "No URL"}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#1a7be6] text-white font-medium shadow-md group"
                          >
                            <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
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
                          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
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
                <div className="absolute -bottom-8 sm:-bottom-10 left-0 right-0 flex justify-center gap-2 sm:gap-3">
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
                        className={`block w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
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
              <div className="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-10">
                {Object.entries(microsite.socialMedia).map(
                  ([platform, url]) =>
                    url ? (
                      <motion.div
                        key={platform}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center text-[#1a7be6] hover:bg-blue-50 shadow-md transition-all duration-300 cursor-pointer"
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
        <div className="absolute -bottom-12 sm:-bottom-16 left-0 right-0 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
          <motion.button
            onClick={openPreviewInNewTab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white text-[#1a7be6] font-medium shadow-md border border-blue-200 flex items-center justify-center text-xs sm:text-sm hover:bg-blue-50 transition-colors"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="hidden sm:inline">Preview in New Tab</span>
            <span className="sm:hidden">Preview</span>
          </motion.button>
          <motion.button
            onClick={openRealMicrosite}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-[#1a7be6] text-white font-medium shadow-md flex items-center justify-center text-xs sm:text-sm"
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
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <span className="hidden sm:inline">Open Live Site</span>
            <span className="sm:hidden">Live Site</span>
          </motion.button>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="hidden md:block absolute -top-6 -right-12 w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-orange-200/50 z-0"
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
        className="hidden md:block absolute -bottom-8 -left-8 w-20 h-20 lg:w-24 lg:h-24 rounded-xl border-4 border-blue-200/50 z-0 rotate-12"
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
    </div>
  );
};

export default MicrositePreview;