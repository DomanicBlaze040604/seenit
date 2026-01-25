"use client";

import * as React from "react";
import Link from "next/link";
import { useProfile } from "@/hooks";

export default function DashboardPage() {
    const { profile, isLoading } = useProfile();

    const credibilityScore = profile?.credibility?.score || 75;
    const consistencyFactor = profile?.credibility?.consistency_factor || 85;
    const watchTimeFactor = profile?.credibility?.watch_time_factor || 72;
    const proofFactor = profile?.credibility?.proof_factor || 80;
    const communityTrust = profile?.credibility?.community_trust || 90;

    // Calculate gauge offset
    const gaugeOffset = 251.2 - (credibilityScore / 100) * 251.2;

    const recentReviews = [
        {
            id: "1",
            title: "Sony WH-1000XM5: One Month Review",
            category: "Consumer Tech • Headphones",
            thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            status: "APPROVED",
            date: "Jan 12, 2026",
            views: "12.4k",
            sentiment: "98% Positive",
        },
        {
            id: "2",
            title: "Premium Espresso Machine Setup",
            category: "Home Goods • Kitchen",
            thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
            status: "PENDING",
            date: "Jan 14, 2026",
            views: "--",
            sentiment: "Processing...",
        },
        {
            id: "3",
            title: "Honest Glow Serum Unboxing",
            category: "Lifestyle • Beauty",
            thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop",
            status: "REJECTED",
            date: "Jan 08, 2026",
            views: "245",
            sentiment: "Under Review",
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "APPROVED":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Verified
                    </span>
                );
            case "PENDING":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        Pending
                    </span>
                );
            case "REJECTED":
                return (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        Flagged
                    </span>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-5 h-96 bg-slate-200 rounded-xl animate-pulse" />
                    <div className="xl:col-span-7 h-96 bg-slate-200 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                        Creator Trust Center
                    </h2>
                    <p className="text-slate-500">
                        Manage your credibility and track your UGC performance in real-time.
                    </p>
                </div>
                <Link
                    href="/upload"
                    className="inline-flex items-center gap-2 bg-[#2b8cee] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#1e7ed8] transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">cloud_upload</span>
                    Upload Review
                </Link>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left: Credibility Score */}
                <div className="xl:col-span-5 flex flex-col gap-6">
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                            <h3 className="text-lg font-bold text-slate-900">Credibility Score</h3>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Trusted
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center py-4">
                            {/* Gauge */}
                            <div className="relative w-40 h-40 md:w-48 md:h-48">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="stroke-slate-100"
                                        cx="50"
                                        cy="50"
                                        fill="transparent"
                                        r="40"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        className="stroke-[#2b8cee]"
                                        cx="50"
                                        cy="50"
                                        fill="transparent"
                                        r="40"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={gaugeOffset}
                                        strokeLinecap="round"
                                        strokeWidth="8"
                                        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl md:text-5xl font-black text-slate-900">
                                        {Math.round(credibilityScore)}
                                    </span>
                                    <span className="text-slate-500 text-sm font-medium">/ 100</span>
                                </div>
                            </div>
                            <p className="mt-6 text-center text-slate-500 max-w-xs mx-auto text-sm">
                                You are currently in the{" "}
                                <span className="text-slate-900 font-bold">top 15%</span> of trusted creators.
                            </p>
                        </div>
                    </div>

                    {/* Trust Factors Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Consistency
                            </p>
                            <div className="flex items-end justify-between mt-2">
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{consistencyFactor}%</p>
                                <span className="text-green-600 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>5%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Watch Time
                            </p>
                            <div className="flex items-end justify-between mt-2">
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{watchTimeFactor}%</p>
                                <span className="text-green-600 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>12%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Proof Quality
                            </p>
                            <div className="flex items-end justify-between mt-2">
                                <p className="text-xl md:text-2xl font-bold text-slate-900">High</p>
                                <span className="text-green-600 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Community
                            </p>
                            <div className="flex items-end justify-between mt-2">
                                <p className="text-xl md:text-2xl font-bold text-slate-900">{communityTrust}%</p>
                                <span className="text-green-600 text-xs font-bold flex items-center">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>8%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Recent Reviews List */}
                <div className="xl:col-span-7">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Recent Reviews</h3>
                            <Link
                                href="/reviews"
                                className="text-[#2b8cee] text-sm font-bold hover:underline flex items-center gap-1"
                            >
                                View All <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-4 md:px-6 py-3 md:py-4">Review</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-center">Status</th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-right hidden sm:table-cell">Views</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentReviews.map((review) => (
                                        <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 md:px-6 py-3 md:py-4">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div
                                                        className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-cover bg-center shrink-0 border border-slate-200"
                                                        style={{ backgroundImage: `url('${review.thumbnail}')` }}
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-sm text-slate-900 truncate">{review.title}</p>
                                                        <p className="text-xs text-slate-500">{review.category}</p>
                                                        <p className="text-xs text-slate-400 mt-1">{review.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                                                {getStatusBadge(review.status)}
                                            </td>
                                            <td className="px-4 md:px-6 py-3 md:py-4 text-right hidden sm:table-cell">
                                                <div className="text-sm font-bold text-slate-900">{review.views}</div>
                                                <div
                                                    className={`text-xs font-medium ${review.status === "APPROVED"
                                                            ? "text-green-600"
                                                            : review.status === "REJECTED"
                                                                ? "text-red-600"
                                                                : "text-slate-500"
                                                        }`}
                                                >
                                                    {review.sentiment}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {recentReviews.length === 0 && (
                            <div className="p-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">
                                    video_library
                                </span>
                                <p className="text-slate-500">No reviews yet</p>
                                <Link
                                    href="/upload"
                                    className="inline-flex items-center gap-2 mt-4 text-[#2b8cee] font-bold"
                                >
                                    Upload your first review
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
