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

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
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
            className="relative"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-orange-50/90 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl"></div>
            <div className="absolute inset-0 bg-white/70 rounded-2xl"></div>
            
            {/* Animated Background Orbs */}
            <motion.div 
              className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-10 -right-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-xl border border-white/30"
            >
              {/* Close Button */}
              <motion.button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center transition-all duration-200 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Header */}
              <motion.div 
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-[#1a7be6] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <motion.svg 
                    className="w-7 h-7 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: [0, 0, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                </div>
                <h2 className="text-xl font-bold font-unbounded">
                  <span className="text-gray-800">Tulis</span>{" "}
                  <span className="text-[#f35e0e]">Ulasan Anda</span>
                </h2>
                <p className="text-gray-600 text-xs mt-1">Bagikan pengalaman Anda bersama kami</p>
              </motion.div>

              {/* Name Input */}
              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label className="flex items-center mb-2 font-semibold text-gray-700 text-sm">
                  <svg className="w-4 h-4 mr-2 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Nama Lengkap
                </label>
                <motion.input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1a7be6] focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="Masukkan nama Anda"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Star Rating */}
              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label className="flex items-center mb-2 font-semibold text-gray-700 text-sm">
                  <svg className="w-4 h-4 mr-2 text-[#f35e0e]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Rating ({form.star}/5)
                </label>
                <div className="flex justify-center space-x-2 p-3 bg-gradient-to-r from-blue-50/50 to-orange-50/50 rounded-xl border border-gray-100">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <motion.button
                      type="button"
                      key={s}
                      onClick={() => handleStar(s)}
                      className={`text-2xl transition-all duration-300 ${
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
              </motion.div>

              {/* Message Input */}
              <motion.div 
                className="mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="flex items-center font-semibold text-gray-700 text-sm">
                    <svg className="w-4 h-4 mr-2 text-[#1a7be6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m-7 8l4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-4 4z" />
                    </svg>
                    Pesan Review
                  </label>
                  <span className={`text-xs ${form.message.length > 250 ? 'text-red-500' : 'text-gray-500'}`}>
                    {form.message.length}/250
                  </span>
                </div>
                <motion.textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#1a7be6] focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                  rows={3}
                  placeholder="Ceritakan pengalaman Anda..."
                  maxLength={250}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <motion.div 
                className="flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all duration-300 border border-gray-200 text-sm"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Batal
                </motion.button>
                <motion.button
                  type="submit"
                  className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a7be6] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center text-sm"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <motion.svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </motion.svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Kirim
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}