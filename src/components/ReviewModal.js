import { useState } from "react";
import Modal from "react-modal";

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
   <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    ariaHideApp={false}
    className="fixed inset-0 flex items-center justify-center z-[9999]"
    overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
  >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Tulis Review</h2>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nama</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Bintang</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => handleStar(s)}
                className={`text-2xl ${
                  form.star >= s ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-label={`${s} star`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Pesan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </form>
    </Modal>
  );
}