"use client";

import * as React from "react";
import Link from "next/link";

type ReviewStatus = "all" | "approved" | "pending" | "rejected";

interface Review {
    id: string;
    title: string;
    product: string;
    thumbnail: string;
    status: string;
    date: string;
    views: number;
    duration: number;
}

const mockReviews: Review[] = [
    {
        id: "1",
        title: "Sony WH-1000XM5: Complete Review",
        product: "Sony WH-1000XM5",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        status: "APPROVED",
        date: "2026-01-12",
        views: 12400,
        duration: 245,
    },
    {
        id: "2",
        title: "Premium Coffee Machine Setup",
        product: "Breville Barista Express",
        thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
        status: "PENDING",
        date: "2026-01-14",
        views: 0,
        duration: 180,
    },
    {
        id: "3",
        title: "Skincare Routine Unboxing",
        product: "The Ordinary Set",
        thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
        status: "REJECTED",
        date: "2026-01-08",
        views: 245,
        duration: 120,
    },
    {
        id: "4",
        title: "Framework Laptop 16 Review",
        product: "Framework Laptop 16",
        thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
        status: "APPROVED",
        date: "2026-01-05",
        views: 45200,
        duration: 480,
    },
];

export default function ReviewsPage() {
    const [statusFilter, setStatusFilter] = React.useState<ReviewStatus>("all");
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredReviews = mockReviews.filter((review) => {
        const matchesStatus =
            statusFilter === "all" || review.status.toLowerCase() === statusFilter;
        const matchesSearch =
            review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.product.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Approved
                    </span>
                );
            case "PENDING":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Pending
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        <span className="material-symbols-outlined text-sm">cancel</span>
                        Rejected
                    </span>
                );
            default:
                return null;
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const formatViews = (views: number) => {
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}k`;
        }
        return views.toString();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900">My Reviews</h1>
                    <p className="text-slate-500 mt-1">Manage and track all your video reviews</p>
                </div>
                <Link
                    href="/upload"
                    className="inline-flex items-center gap-2 bg-[#2b8cee] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#1e7ed8] transition-colors w-fit"
                >
                    <span className="material-symbols-outlined text-lg">add</span>
                    New Review
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <span className="material-symbols-outlined text-lg">search</span>
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search reviews..."
                        className="w-full bg-white border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2b8cee]/20 focus:border-[#2b8cee]"
                    />
                </div>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                    {(["all", "approved", "pending", "rejected"] as ReviewStatus[]).map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${statusFilter === status
                                    ? "bg-[#2b8cee] text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews Grid */}
            {filteredReviews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            <div className="relative aspect-video">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${review.thumbnail}')` }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                                    {formatDuration(review.duration)}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 line-clamp-2 mb-2">{review.title}</h3>
                                <p className="text-sm text-slate-500 mb-3">{review.product}</p>
                                <div className="flex items-center justify-between">
                                    {getStatusBadge(review.status)}
                                    <div className="flex items-center gap-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">visibility</span>
                                            {formatViews(review.views)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
                        video_library
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No reviews found</h3>
                    <p className="text-slate-500 mb-6">
                        {searchQuery || statusFilter !== "all"
                            ? "Try adjusting your filters"
                            : "Upload your first video review to get started"}
                    </p>
                    <Link
                        href="/upload"
                        className="inline-flex items-center gap-2 bg-[#2b8cee] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1e7ed8] transition-colors"
                    >
                        <span className="material-symbols-outlined">cloud_upload</span>
                        Upload Review
                    </Link>
                </div>
            )}
        </div>
    );
}
