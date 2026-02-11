"use client";
import * as React from "react";
import Link from "next/link";
import { useProfile, useReviews } from "@/hooks";
import { formatDuration, formatRelativeTime } from "@/lib/utils";

const statusOptions = [
    { value: "", label: "All", color: "gray" },
    { value: "APPROVED", label: "Approved", color: "green" },
    { value: "PENDING", label: "Pending", color: "amber" },
    { value: "REJECTED", label: "Rejected", color: "red" },
];

export default function ReviewsPage() {
    const { profile } = useProfile();
    const { reviews, isLoading } = useReviews();
    const [filter, setFilter] = React.useState("");

    const filtered = React.useMemo(() => {
        if (!reviews) return [];
        return filter ? reviews.filter((r) => r.status === filter) : reviews;
    }, [reviews, filter]);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
                    <p className="text-gray-500 mt-1">{reviews?.length || 0} total reviews</p>
                </div>
                <Link
                    href="/upload"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-btn-primary text-white font-semibold text-sm hover:opacity-90 transition-all"
                >
                    <span className="material-symbols-outlined !text-[20px]">add</span>
                    New Review
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
                {statusOptions.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filter === opt.value ? "bg-primary-50 text-primary-700 border border-primary-200" : "text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700"}`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            {isLoading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <span className="material-symbols-outlined !text-5xl text-gray-300 mb-3 block">videocam_off</span>
                    <p className="text-gray-900 font-semibold">No reviews found</p>
                    <p className="text-sm text-gray-400 mt-1">Create your first review to get started</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-4">
                            <div className="w-20 h-14 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-gray-400">play_circle</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 truncate">{review.title}</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {formatRelativeTime(review.created_at)} • {formatDuration(review.duration || 0)} • {review.proof_type || "N/A"}
                                </p>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${review.status === "APPROVED" ? "bg-accent-green-50 text-accent-green-700" :
                                    review.status === "PENDING" ? "bg-accent-amber-50 text-accent-amber-700" :
                                        "bg-accent-red-50 text-accent-red-700"
                                }`}>{review.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
