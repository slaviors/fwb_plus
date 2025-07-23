'use client';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function ReviewAdminPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
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
        fetch("/api/fwb-config/fetchReview", { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.reviews || []);
                setLoading(false);
            });
    }, [user]);

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto py-10">
            <button
                onClick={() => router.push('/fwb-config')}
                className="mb-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
            >
                ← Back to Admin Panel
            </button>
            <h1 className="text-2xl font-bold mb-6">Review List</h1>
            {loading ? (
                <div>Loading...</div>
            ) : reviews.length === 0 ? (
                <div>No reviews yet.</div>
            ) : (
                <ul className="space-y-4">
                    {reviews.map((r) => (
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
                            <div className="text-gray-700">{r.message}</div>
                            <div className="text-xs text-gray-400 mt-2">
                                {new Date(r.createdAt).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}