'use client';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
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
    return reviews.filter(r => {
        const created = new Date(r.createdAt);
        if (start && end) return created >= start && created <= end;
        return true;
    });
}

function exportToCSV(reviews) {
    const header = ["Nama", "Bintang", "Pesan", "Waktu"];
    const rows = reviews.map(r => [
        `"${r.name.replace(/"/g, '""')}"`,
        r.star,
        `"${r.message.replace(/"/g, '""')}"`,
        new Date(r.createdAt).toLocaleString("id-ID")
    ]);
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "review-export.csv";
    a.click();
    URL.revokeObjectURL(url);
}

function exportToTXT(reviews) {
    const lines = reviews.map(r =>
        `Nama: ${r.name}\nBintang: ${r.star}\nPesan: ${r.message}\nWaktu: ${new Date(r.createdAt).toLocaleString("id-ID")}\n---`
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
    const data = reviews.map(r => ({
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
    const blob = new Blob([JSON.stringify(reviews, null, 2)], { type: "application/json" });
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
    const [filter, setFilter] = useState("24jam");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
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

    if (!user) return null;

    const filtered = filterByRange(reviews, filter, customStart, customEnd);

    const averageRating =
        filtered.length > 0
            ? (filtered.reduce((sum, r) => sum + (Number(r.star) || 0), 0) / filtered.length).toFixed(2)
            : null;

    return (
        <div className="max-w-2xl mx-auto py-10">
            <button
                onClick={() => router.push('/fwb-config')}
                className="mb-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            >
                ← Back to Admin Panel
            </button>
            <h1 className="text-2xl font-bold mb-2">Review List</h1>
            <div className="mb-4 flex items-center gap-4">
                <span className="text-lg font-medium">
                    Rata-rata rating:{" "}
                    <span className="text-yellow-500 font-bold">
                        {averageRating !== null ? averageRating : "-"}
                    </span>
                    <span className="ml-1 text-yellow-400">★</span>
                </span>
                <span className="text-gray-500 text-sm">
                    ({filtered.length} review)
                </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="font-medium">Filter:</span>
                <button
                    className={`px-3 py-1 rounded ${filter === "24jam" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("24jam")}
                >
                    24 Jam Terakhir
                </button>
                <button
                    className={`px-3 py-1 rounded ${filter === "7hari" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("7hari")}
                >
                    7 Hari Terakhir
                </button>
                <button
                    className={`px-3 py-1 rounded ${filter === "1bulan" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("1bulan")}
                >
                    1 Bulan Terakhir
                </button>
                <button
                    className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("all")}
                >
                    Semua
                </button>
                <button
                    className={`px-3 py-1 rounded ${filter === "custom" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setFilter("custom")}
                >
                    Custom
                </button>
                {filter === "custom" && (
                    <span className="flex items-center gap-1">
                        <input
                            type="date"
                            value={customStart}
                            onChange={e => setCustomStart(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                        <span>-</span>
                        <input
                            type="date"
                            value={customEnd}
                            onChange={e => setCustomEnd(e.target.value)}
                            className="border rounded px-2 py-1"
                        />
                    </span>
                )}
                <button
                    className="ml-auto px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={() => exportToCSV(filtered)}
                >
                    Export CSV
                </button>
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => exportToXLSX(filtered)}
                >
                    Export Excel
                </button>
                <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={() => exportToPDF(filtered)}
                >
                    Export PDF
                </button>
                <button
                    className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
                    onClick={() => exportToJSON(filtered)}
                >
                    Export JSON
                </button>
                <button
                    className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                    onClick={() => exportToTXT(filtered)}
                >
                    Export TXT
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : filtered.length === 0 ? (
                <div>No reviews found.</div>
            ) : (
                <ul className="space-y-4">
                    {filtered.map((r) => (
                        <li
                            key={r._id}
                            className="border rounded-lg p-4 bg-white shadow flex flex-col"
                        >
                            <div className="flex items-center mb-2">
                                <span className="font-semibold">{r.name}</span>
                                <span className="ml-3 text-yellow-400">
                                    {"★".repeat(r.star)}
                                    {"☆".repeat(5 - r.star)}
                                </span>
                            </div>
                            <div className="text-gray-700 mb-1">{r.message}</div>
                            <div className="text-xs text-gray-400 mt-1">
                                {new Date(r.createdAt).toLocaleString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}