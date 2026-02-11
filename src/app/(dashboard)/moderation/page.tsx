"use client";
import * as React from "react";
import { useModerationQueue } from "@/hooks";
import { formatRelativeTime } from "@/lib/utils";

export default function ModerationPage() {
    const [activeTab, setActiveTab] = React.useState<"reviews" | "reports">("reviews");
    const { items: pendingReviews, isLoading: reviewsLoading, moderateReview } = useModerationQueue("reviews");
    const { items: reports, isLoading: reportsLoading, resolveReport } = useModerationQueue("reports");
    const isLoading = activeTab === "reviews" ? reviewsLoading : reportsLoading;
    const [actionLoading, setActionLoading] = React.useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setActionLoading(id);
        try { await moderateReview(id, "approve"); } finally { setActionLoading(null); }
    };

    const handleReject = async (id: string) => {
        setActionLoading(id);
        try { await moderateReview(id, "reject"); } finally { setActionLoading(null); }
    };

    const handleResolve = async (id: string, action: "action" | "dismiss") => {
        setActionLoading(id);
        try { await resolveReport(id, action); } finally { setActionLoading(null); }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Moderation</h1>
            <p className="text-gray-500 mb-8">Review and manage submitted content</p>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
                <button onClick={() => setActiveTab("reviews")} className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${activeTab === "reviews" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    Pending Reviews
                    {pendingReviews && pendingReviews.length > 0 && <span className="ml-2 px-2 py-0.5 text-xs bg-accent-amber-100 text-accent-amber-700 rounded-full">{pendingReviews.length}</span>}
                </button>
                <button onClick={() => setActiveTab("reports")} className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-all ${activeTab === "reports" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                    Reports
                    {reports && reports.length > 0 && <span className="ml-2 px-2 py-0.5 text-xs bg-accent-red-100 text-accent-red-700 rounded-full">{reports.length}</span>}
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-48">
                    <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
                </div>
            ) : activeTab === "reviews" ? (
                <div>
                    {!pendingReviews || pendingReviews.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <span className="material-symbols-outlined !text-5xl text-gray-300 mb-3 block">check_circle</span>
                            <p className="text-gray-900 font-semibold">All caught up</p>
                            <p className="text-sm text-gray-400 mt-1">No pending reviews to moderate</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingReviews.map((review: any) => (
                                <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-200">
                                    <div className="flex items-start gap-4">
                                        <div className="w-24 h-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-gray-400">play_circle</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900">{review.title || `Review #${review.id.slice(0, 8)}`}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatRelativeTime(review.created_at)} • Proof: {review.proof_type || "None"}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => handleApprove(review.id)}
                                                disabled={actionLoading === review.id}
                                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-accent-green-50 text-accent-green-700 border border-accent-green-200 hover:bg-accent-green-100 disabled:opacity-50 transition-colors"
                                            >Approve</button>
                                            <button
                                                onClick={() => handleReject(review.id)}
                                                disabled={actionLoading === review.id}
                                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-accent-red-50 text-accent-red-700 border border-accent-red-200 hover:bg-accent-red-100 disabled:opacity-50 transition-colors"
                                            >Reject</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {!reports || reports.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                            <span className="material-symbols-outlined !text-5xl text-gray-300 mb-3 block">shield</span>
                            <p className="text-gray-900 font-semibold">No open reports</p>
                            <p className="text-sm text-gray-400 mt-1">All reports have been resolved</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reports.map((report: any) => (
                                <div key={report.id} className="bg-white rounded-xl p-5 border border-gray-200">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-accent-red-50 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-accent-red-500 !text-[20px]">flag</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900">{report.reason || report.category || "Report"}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatRelativeTime(report.created_at)} • Category: {report.category || "General"}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => handleResolve(report.id, "dismiss")}
                                                disabled={actionLoading === report.id}
                                                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                                            >Dismiss</button>
                                            <button
                                                onClick={() => handleResolve(report.id, "action")}
                                                disabled={actionLoading === report.id}
                                                className="px-4 py-2 rounded-lg text-sm font-semibold bg-accent-red-50 text-accent-red-700 border border-accent-red-200 hover:bg-accent-red-100 disabled:opacity-50 transition-colors"
                                            >Take Action</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
