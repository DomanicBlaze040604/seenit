"use client";
import * as React from "react";
import Link from "next/link";
import { useProfile, useReviews } from "@/hooks";
import { formatDuration, formatRelativeTime } from "@/lib/utils";

export default function DashboardPage() {
    const { profile, isLoading: profileLoading } = useProfile();
    const { reviews, isLoading: reviewsLoading } = useReviews();

    const isLoading = profileLoading || reviewsLoading;
    const approvedReviews = reviews?.filter((r) => r.status === "APPROVED") || [];
    const totalWatchTime = reviews?.reduce((t, r) => t + (r.duration || 0), 0) || 0;

    // Calculate a simple SARS score
    const sarsScore = React.useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        const base = Math.min(reviews.length * 8, 40);
        const approved = approvedReviews.length / Math.max(reviews.length, 1) * 30;
        const tenure = Math.min(20, 20);
        const quality = Math.min(10, reviews.length * 2);
        return Math.round(base + approved + tenure + quality);
    }, [reviews, approvedReviews]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, {profile?.display_name || "Creator"}</p>
                </div>
                <Link
                    href="/upload"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-btn-primary text-white font-semibold text-sm hover:opacity-90 transition-all"
                >
                    <span className="material-symbols-outlined !text-[20px]">cloud_upload</span>
                    Upload Review
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-500 !text-[20px]">rate_review</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">Total Reviews</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{reviews?.length || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-green-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-green-500 !text-[20px]">check_circle</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">Approved</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{approvedReviews.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-amber-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-amber-500 !text-[20px]">timer</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">Watch Time</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{formatDuration(totalWatchTime)}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-sky-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-accent-sky-500 !text-[20px]">verified</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500">Trust Level</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{profile?.trust_level || "NEW"}</p>
                </div>
            </div>

            {/* SARS Score & Recent Reviews */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SARS Score Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">SARS™ Score</h3>
                    <div className="flex items-center justify-center mb-4">
                        <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                <circle cx="50" cy="50" r="42" fill="none" stroke={sarsScore >= 70 ? "#10b981" : sarsScore >= 40 ? "#f59e0b" : "#f43f5e"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${sarsScore * 2.64} 264`} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-gray-900">{sarsScore}</span>
                                <span className="text-xs text-gray-500 font-medium">/ 100</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: "Experience", value: 35, max: 40, color: "bg-primary-500" },
                            { label: "Credibility", value: 25, max: 30, color: "bg-accent-green-500" },
                            { label: "Quality", value: 15, max: 20, color: "bg-accent-amber-500" },
                            { label: "Engagement", value: 8, max: 10, color: "bg-accent-sky-500" },
                        ].map((f) => (
                            <div key={f.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600 font-medium">{f.label}</span>
                                    <span className="text-gray-400">{f.value}/{f.max}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${f.color} rounded-full`} style={{ width: `${(f.value / f.max) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Reviews */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Recent Reviews</h3>
                        <Link href="/reviews" className="text-sm text-primary-600 font-medium hover:text-primary-700">View all →</Link>
                    </div>
                    {!reviews || reviews.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <span className="material-symbols-outlined !text-5xl mb-3 block text-gray-300">videocam_off</span>
                            <p className="font-medium">No reviews yet</p>
                            <p className="text-sm mt-1">Upload your first review to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {reviews.slice(0, 5).map((review) => (
                                <div key={review.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                    <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-gray-400">play_circle</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{review.title}</p>
                                        <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(review.created_at)} • {formatDuration(review.duration || 0)}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${review.status === "APPROVED" ? "bg-accent-green-50 text-accent-green-700" :
                                        review.status === "PENDING" ? "bg-accent-amber-50 text-accent-amber-700" :
                                            "bg-accent-red-50 text-accent-red-700"
                                        }`}>{review.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Monetisation & Rewards Section */}
            <div className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-amber-400 to-accent-amber-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white !text-[20px]">monetization_on</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Monetisation & Rewards</h3>
                        <p className="text-xs text-gray-500">Your earning potential on SeenIt</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Creator Side */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
                            <div className="flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined !text-[20px]">videocam</span>
                                <h4 className="font-bold text-sm">Creator Earnings</h4>
                            </div>
                            <p className="text-primary-100 text-xs mt-1">Get paid for your impact, not just opinions</p>
                        </div>
                        <div className="p-6 space-y-5">
                            {/* Views Earning */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary-500 !text-[18px]">visibility</span>
                                    <span className="text-sm font-bold text-gray-900">Per 1,000 Views</span>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-gray-500 font-medium">Earned based on SARS™ Score</span>
                                        <span className="text-xs text-primary-600 font-bold">$1 – $7 / 1K views</span>
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { tier: "Elite", range: "80–100", rate: "$5 – $7", color: "bg-accent-amber-400", width: "100%" },
                                            { tier: "Trusted", range: "50–79", rate: "$2 – $5", color: "bg-primary-500", width: "65%" },
                                            { tier: "New", range: "0–49", rate: "$1 – $2", color: "bg-gray-400", width: "30%" },
                                        ].map((t) => (
                                            <div key={t.tier} className="flex items-center gap-3">
                                                <span className="text-xs text-gray-600 font-medium w-14">{t.tier}</span>
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${t.color} rounded-full`} style={{ width: t.width }}></div>
                                                </div>
                                                <span className="text-xs text-gray-700 font-semibold w-20 text-right">{t.rate}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sales Commission */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-accent-green-500 !text-[18px]">shopping_bag</span>
                                    <span className="text-sm font-bold text-gray-900">Sales Commission</span>
                                </div>
                                <div className="bg-accent-green-50 rounded-lg p-4 border border-accent-green-100">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Earn a <span className="font-bold text-accent-green-700">%&nbsp;commission</span> on every purchase made through your review. Rates vary by product category and brand partnership.
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded font-medium border border-accent-green-200">Electronics: 2–4%</span>
                                        <span className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded font-medium border border-accent-green-200">Beauty: 5–8%</span>
                                        <span className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded font-medium border border-accent-green-200">Fashion: 4–7%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Side */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-accent-amber-500 to-accent-amber-400 px-6 py-4">
                            <div className="flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined !text-[20px]">redeem</span>
                                <h4 className="font-bold text-sm">Customer Rewards</h4>
                            </div>
                            <p className="text-amber-100 text-xs mt-1">Discover, watch, buy — and get rewarded</p>
                        </div>
                        <div className="p-6 space-y-5">
                            {/* Purchase Intent */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-accent-amber-500 !text-[18px]">explore</span>
                                    <span className="text-sm font-bold text-gray-900">Purchase Intent</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    Browse honest, layman reviews from real users — build genuine confidence before you buy.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Browse Reviews", "Compare Products", "Save Favourites", "Follow Creators"].map((item) => (
                                        <span key={item} className="text-xs bg-accent-amber-50 text-accent-amber-700 px-3 py-1.5 rounded-full font-medium border border-accent-amber-200">{item}</span>
                                    ))}
                                </div>
                            </div>

                            {/* SARS-based Rewards */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-accent-red-500 !text-[18px]">local_offer</span>
                                    <span className="text-sm font-bold text-gray-900">SARS™ Based Perks</span>
                                </div>
                                <div className="bg-accent-red-50 rounded-lg p-4 border border-accent-red-100">
                                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                        Your SARS™ score unlocks <span className="font-bold text-accent-red-600">exclusive offers, promotions & discounts</span> from partner brands.
                                    </p>
                                    <div className="space-y-2">
                                        {[
                                            { icon: "percent", label: "Exclusive Discounts", desc: "Score-based discount tiers" },
                                            { icon: "campaign", label: "Early Access", desc: "New product launches & deals" },
                                            { icon: "card_giftcard", label: "Rewards Points", desc: "Earn XP on every interaction" },
                                        ].map((perk) => (
                                            <div key={perk.label} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-accent-red-100">
                                                <span className="material-symbols-outlined text-accent-red-400 !text-[16px]">{perk.icon}</span>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-800">{perk.label}</p>
                                                    <p className="text-[10px] text-gray-500">{perk.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Gamified */}
                            <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-accent-amber-50 rounded-lg px-4 py-3 border border-primary-100">
                                <span className="material-symbols-outlined text-primary-500 !text-[20px]">sports_esports</span>
                                <div>
                                    <p className="text-xs font-bold text-gray-900">Gamified Experience</p>
                                    <p className="text-[10px] text-gray-500">Earn XP, unlock badges, climb leaderboards — both as a customer and creator!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
