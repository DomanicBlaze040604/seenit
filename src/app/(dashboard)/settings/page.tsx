"use client";

import * as React from "react";
import { useProfile } from "@/hooks";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
    const { profile, isLoading, refetch } = useProfile();
    const [displayName, setDisplayName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [isSaving, setIsSaving] = React.useState(false);
    const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

    React.useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || "");
            setBio(profile.bio || "");
        }
    }, [profile]);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ display_name: displayName, bio }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            await refetch();
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Failed to save changes" });
        } finally {
            setIsSaving(false);
        }
    };

    const credibilityScore = profile?.credibility?.score || 75;
    const gaugeOffset = 251.2 - (credibilityScore / 100) * 251.2;

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
                <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your profile and account settings</p>
            </div>

            {message && (
                <div
                    className={`p-4 rounded-lg text-sm flex items-center gap-2 ${message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                >
                    <span className="material-symbols-outlined text-lg">
                        {message.type === "success" ? "check_circle" : "error"}
                    </span>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Profile Information</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Your public name"
                                    className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2b8cee]/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell viewers about yourself..."
                                    rows={4}
                                    className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2b8cee]/20 resize-none"
                                />
                                <p className="text-xs text-slate-400 mt-1">{bio.length}/300 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile?.email || ""}
                                    disabled
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#2b8cee] text-white font-bold rounded-lg hover:bg-[#1e7ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">save</span>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Notifications</h2>
                        <div className="space-y-4">
                            {[
                                { label: "Email notifications", desc: "Get emails about review status" },
                                { label: "Review approved", desc: "When your review is verified" },
                                { label: "New comments", desc: "When someone comments on your review" },
                            ].map((item, i) => (
                                <label key={i} className="flex items-start gap-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="mt-1 w-5 h-5 rounded border-slate-300 text-[#2b8cee] focus:ring-[#2b8cee]/20"
                                    />
                                    <div>
                                        <p className="font-medium text-slate-900">{item.label}</p>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Credibility Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Your Trust Score</h2>

                        <div className="flex flex-col items-center py-4">
                            <div className="relative w-32 h-32">
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
                                    <span className="text-3xl font-black text-slate-900">
                                        {Math.round(credibilityScore)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Trusted Creator
                            </div>
                        </div>

                        <div className="mt-4 space-y-3 pt-4 border-t border-slate-100">
                            {[
                                { label: "Reviews", value: profile?.stats?.totalReviews || 0 },
                                { label: "Avg Watch Time", value: "78%" },
                                { label: "Approval Rate", value: "95%" },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-slate-500">{stat.label}</span>
                                    <span className="font-bold text-slate-900">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-[#2b8cee]">lightbulb</span>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Boost Your Score</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Upload more reviews with usage proof to increase your credibility.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
