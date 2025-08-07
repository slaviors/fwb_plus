import { useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", star: 5, message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStar = (star) => setForm((f) => ({ ...f, star }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sendReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send review");
      setForm({ name: "", star: 5, message: "" });
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          className="fixed inset-0 flex items-center justify-center z-[9999] scale-90 lg:scale-75 w-full"
          overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4 
            }}
            className="relative w-full max-w-3xl"
          >
            {/* Enhanced Background with Multiple Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {/* Primary gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-orange-50/90 rounded-3xl"></div>
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl shadow-blue-200/20"></div>
              
              {/* Large background shapes - matching About section */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gradient-to-tr from-orange-100/40 to-orange-200/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-blue-50/60 to-orange-50/60 rounded-full blur-2xl"></div>
            </div>

            {/* Animated Floating Orbs */}
            <motion.div 
              className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-300/30 to-blue-500/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-tr from-orange-300/30 to-orange-500/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Form Container with Enhanced Glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-white/30 via-white/20 to-transparent backdrop-blur-xl border border-white/40 shadow-xl">
              <form
                onSubmit={handleSubmit}
                className="relative rounded-[22px] bg-white/50 backdrop-blur-md border border-white/60 p-4 lg:p-8 overflow-hidden"
              >
                {/* Floating decorative elements inside form */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-300/20 to-blue-500/10 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-tr from-orange-400/15 to-orange-600/10 rounded-2xl rotate-45 blur-lg"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [45, 90, 45],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {/* Close Button */}
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-100/80 to-gray-200/60 hover:from-gray-200/80 hover:to-gray-300/60 flex items-center justify-center transition-all duration-300 group backdrop-blur-sm border border-white/40 shadow-lg z-50"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Header Section */}
                <motion.div 
                  className="text-center mb-8 relative z-10"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  {/* Badge */}
                  <motion.div 
                    className="inline-block mb-6"
                    variants={scaleIn}
                    custom={0}
                  >
                    <span className="inline-flex items-center py-2 px-4 text-sm font-inter font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-[#1a7be6] rounded-full border border-blue-200/50 shadow-sm backdrop-blur-sm">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Review & Testimoni
                    </span>
                  </motion.div>

                  {/* Main Title */}
                  <motion.h2
                    variants={fadeInUp}
                    custom={1}
                    className="font-unbounded text-2xl lg:text-3xl font-bold mb-4 text-gray-900 leading-tight"
                  >
                    Bagikan{" "}
                    <span className="relative">
                      <span className="text-[#1a7be6]">Pengalaman </span>
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-100 rounded-full -z-10"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 1.5 }}
                      />
                    </span>
                    <span className="text-[#f35e0e]">Anda</span>
                  </motion.h2>
                </motion.div>

                {/* Form Fields */}
                <div className="space-y-3 sm:space-y-6 relative z-10">
                  {/* Name Input */}
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-blue-200/20 via-blue-100/10 to-transparent backdrop-blur-lg border border-white/30">
                      <div className="relative rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 p-4">
                        <label className="flex items-center mb-3 font-inter font-semibold text-gray-700">
                          <div className="w-6 h-6 mr-3 rounded-lg bg-gradient-to-br from-[#1a7be6]/20 to-[#1a7be6]/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          Nama Lengkap
                          <span className={`ml-auto text-xs font-inter ${
                            form.name.length > 40 
                              ? 'text-orange-600' 
                              : form.name.length > 30 
                                ? 'text-yellow-600' 
                                : 'text-gray-500'
                          }`}>
                            {form.name.length}/50
                          </span>
                        </label>
                        <motion.input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full border-2 border-white/60 rounded-xl px-4 py-3 focus:border-[#1a7be6] focus:ring-2 focus:ring-blue-100/50 transition-all duration-300 bg-white/80 backdrop-blur-sm font-inter placeholder-gray-400"
                          placeholder="Masukkan nama lengkap Anda"
                          maxLength={50}
                          required
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Star Rating */}
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-orange-200/20 via-orange-100/10 to-transparent backdrop-blur-lg border border-white/30">
                      <div className="relative rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 p-4">
                        <label className="flex items-center mb-3 font-inter font-semibold text-gray-700">
                          <div className="w-6 h-6 mr-3 rounded-lg bg-gradient-to-br from-[#f35e0e]/20 to-[#f35e0e]/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#f35e0e]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          Rating Kepuasan ({form.star}/5)
                        </label>
                        <div className="flex justify-center space-x-3 p-4 bg-gradient-to-r from-blue-50/60 to-orange-50/60 rounded-xl border border-white/40 backdrop-blur-sm">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <motion.button
                              type="button"
                              key={s}
                              onClick={() => handleStar(s)}
                              className={`text-3xl transition-all duration-300 ${
                                form.star >= s ? "text-[#f35e0e]" : "text-gray-300"
                              }`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label={`${s} star`}
                            >
                              ★
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Message Input */}
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-blue-200/20 via-blue-100/10 to-transparent backdrop-blur-lg border border-white/30">
                      <div className="relative rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 p-4">
                        <div className="flex justify-between items-center mb-3">
                          <label className="flex items-center font-inter font-semibold text-gray-700">
                            <div className="w-6 h-6 mr-3 rounded-lg bg-gradient-to-br from-[#1a7be6]/20 to-[#1a7be6]/30 flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m-7 8l4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 4z" />
                              </svg>
                            </div>
                            Pesan Review
                          </label>
                          <span className={`text-xs font-inter ${
                            form.message.length > 400 
                              ? 'text-red-600' 
                              : form.message.length > 300 
                                ? 'text-orange-600' 
                                : form.message.length > 200 
                                  ? 'text-yellow-600' 
                                  : 'text-gray-500'
                          }`}>
                            {form.message.length}/500
                          </span>
                        </div>
                        <motion.textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          className="w-full border-2 border-white/60 rounded-xl px-4 py-3 focus:border-[#1a7be6] focus:ring-2 focus:ring-blue-100/50 transition-all duration-300 bg-white/80 backdrop-blur-sm resize-none font-inter placeholder-gray-400"
                          rows={4}
                          placeholder="Ceritakan pengalaman terbaik Anda dengan layanan kami..."
                          maxLength={500}
                          required
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      className="mt-6 relative"
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-red-200/30 via-red-100/20 to-transparent backdrop-blur-lg border border-white/30">
                        <div className="relative rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/50 p-4 flex items-center">
                          <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-red-700 font-inter">{error}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <motion.div 
                  className="flex space-x-4 mt-3 md:mt-8 relative z-10"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                >
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/60 hover:from-gray-200/80 hover:to-gray-300/60 text-gray-700 font-inter font-semibold transition-all duration-300 border border-white/40 backdrop-blur-sm shadow-lg"
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1a7be6] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-inter font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center justify-center border border-white/20 backdrop-blur-sm"
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <motion.svg 
                          className="w-5 h-5 mr-2" 
                          fill="none" 
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </motion.svg>
                        Mengirim Review...
                      </>
                    ) : (
                      <>
                        Kirim
                        <svg className="w-5 h-5 ml-2 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}