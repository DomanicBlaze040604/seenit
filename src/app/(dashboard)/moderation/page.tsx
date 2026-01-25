"use client";

import * as React from "react";
import {
    Video,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    Eye,
    User,
    Package,
} from "lucide-react";
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    TrustBadge,
    Badge,
    Input,
} from "@/components/ui";
import { useModerationQueue } from "@/hooks";
import { cn, formatDuration, formatRelativeTime } from "@/lib/utils";

export default function ModerationPage() {
    const [activeTab, setActiveTab] = React.useState<"reviews" | "reports">("reviews");
    const [selectedReview, setSelectedReview] = React.useState<any>(null);
    const [rejectReason, setRejectReason] = React.useState("");
    const [showRejectModal, setShowRejectModal] = React.useState(false);

    const {
        items,
        total,
        page,
        setPage,
        isLoading,
        moderateReview,
        resolveReport,
    } = useModerationQueue(activeTab);

    const handleApprove = async (id: string) => {
        await moderateReview(id, "approve");
    };

    const handleReject = async (id: string) => {
        if (!rejectReason.trim()) return;
        await moderateReview(id, "reject", rejectReason);
        setRejectReason("");
        setShowRejectModal(false);
        setSelectedReview(null);
    };

    const handleReportAction = async (id: string, action: "action" | "dismiss") => {
        await resolveReport(id, action);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        Moderation
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Review and approve content submissions
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {total} pending {activeTab}
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={cn(
                        "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                        activeTab === "reviews"
                            ? "border-primary-600 text-primary-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Reviews
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("reports")}
                    className={cn(
                        "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                        activeTab === "reports"
                            ? "border-primary-600 text-primary-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Reports
                    </div>
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <Card variant="elevated">
                    <CardContent className="py-16 text-center">
                        <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            All caught up!
                        </h3>
                        <p className="text-gray-500">
                            No pending {activeTab} to review.
                        </p>
                    </CardContent>
                </Card>
            ) : activeTab === "reviews" ? (
                <div className="space-y-4">
                    {items.map((review) => (
                        <Card key={review.id} variant="elevated" className="overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Video Preview */}
                                <div className="lg:w-80 aspect-video bg-black relative flex-shrink-0">
                                    {review.thumbnail_url ? (
                                        <img
                                            src={review.thumbnail_url}
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Video className="w-12 h-12 text-gray-600" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                                        {formatDuration(review.duration)}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 p-4 lg:p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {review.products?.name || "Unknown Product"}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {review.products?.category}
                                            </p>
                                        </div>
                                        <Badge variant="default">{review.proof_type}</Badge>
                                    </div>

                                    {/* Creator Info */}
                                    <div className="flex items-center gap-3 mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                                            {review.profiles?.display_name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {review.profiles?.display_name || "Anonymous"}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <TrustBadge level={review.profiles?.trust_level || "NEW"} size="sm" />
                                                <span className="text-xs text-gray-500">
                                                    • Submitted {formatRelativeTime(new Date(review.created_at))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 mt-4">
                                        <a
                                            href={review.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1"
                                        >
                                            <Button variant="outline" className="w-full">
                                                <Eye className="w-4 h-4" />
                                                Watch Video
                                            </Button>
                                        </a>
                                        <Button
                                            variant="success"
                                            onClick={() => handleApprove(review.id)}
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                setSelectedReview(review);
                                                setShowRejectModal(true);
                                            }}
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((report) => (
                        <Card key={report.id} variant="elevated">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="warning">{report.category}</Badge>
                                            <span className="text-sm text-gray-500">
                                                {formatRelativeTime(new Date(report.created_at))}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                                            {report.description || "No description provided"}
                                        </p>

                                        {/* Review Info */}
                                        {report.reviews && (
                                            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Review: {report.reviews.products?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    By {report.reviews.profiles?.display_name}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleReportAction(report.id, "action")}
                                        >
                                            Take Action
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleReportAction(report.id, "dismiss")}
                                        >
                                            Dismiss
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {total > 10 && (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-sm text-gray-600">
                        Page {page} of {Math.ceil(total / 10)}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= Math.ceil(total / 10)}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <Card variant="elevated" className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Reject Review</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Please provide a reason for rejecting this review. This will be shown to the creator.
                            </p>
                            <Input
                                label="Rejection Reason"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="e.g., Video doesn't show actual product usage"
                            />
                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowRejectModal(false);
                                        setSelectedReview(null);
                                        setRejectReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleReject(selectedReview.id)}
                                    disabled={!rejectReason.trim()}
                                >
                                    Reject Review
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
