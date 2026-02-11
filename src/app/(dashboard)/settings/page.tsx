"use client";
import * as React from "react";
import { useProfile } from "@/hooks";

export default function SettingsPage() {
    const { profile, isLoading, updateProfile } = useProfile();
    const [displayName, setDisplayName] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [saving, setSaving] = React.useState(false);
    const [saved, setSaved] = React.useState(false);

    React.useEffect(() => {
        if (profile) {
            setDisplayName(profile.display_name || "");
            setBio(profile.bio || "");
        }
    }, [profile]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile({ display_name: displayName, bio });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-500 mb-8">Manage your profile and preferences</p>

            {/* Profile Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-5">Profile</h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                        <input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                            placeholder="Your display name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
                            rows={4}
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>
            </div>

            {/* Trust Level */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trust Level</h3>
                <div className="flex items-center gap-4 mb-4">
                    <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${profile?.trust_level === "ELITE" ? "bg-primary-50 text-primary-700" :
                            profile?.trust_level === "TRUSTED" ? "bg-accent-green-50 text-accent-green-700" :
                                "bg-gray-100 text-gray-600"
                        }`}>{profile?.trust_level || "NEW"}</span>
                    <span className="text-sm text-gray-500">Your current trust level based on SARS™ scoring</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-800">Tip:</span> Upload more verified reviews with proof to increase your trust level.
                    </p>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-lg gradient-btn-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
                {saved && <span className="text-sm text-accent-green-600 font-medium">✓ Saved successfully</span>}
            </div>
        </div>
    );
}
