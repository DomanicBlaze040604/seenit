"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks";

type Step = 1 | 2 | 3 | 4;
const stepLabels = ["Video", "Product", "Details", "Submit"];

export default function UploadPage() {
    const router = useRouter();
    const { products } = useProducts();
    const [step, setStep] = React.useState<Step>(1);
    const [videoFile, setVideoFile] = React.useState<File | null>(null);
    const [productId, setProductId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [proofType, setProofType] = React.useState("USAGE");
    const [usageMonths, setUsageMonths] = React.useState(1);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [dragOver, setDragOver] = React.useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith("video/")) setVideoFile(file);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    product_id: productId || undefined,
                    proof_type: proofType,
                    usage_duration_months: usageMonths,
                    video_url: "pending_upload",
                    duration: 0,
                }),
            });
            if (res.ok) router.push("/reviews");
        } catch { /* silent */ } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Review</h1>
            <p className="text-gray-500 mb-8">Share your honest experience with a product</p>

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-10">
                {stepLabels.map((label, i) => {
                    const num = (i + 1) as Step;
                    const isActive = step === num;
                    const isDone = step > num;
                    return (
                        <React.Fragment key={label}>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isDone ? "bg-accent-green-500 text-white" : isActive ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                    {isDone ? "✓" : num}
                                </div>
                                <span className={`text-sm font-medium hidden sm:inline ${isActive ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
                            </div>
                            {i < 3 && <div className={`flex-1 h-0.5 ${isDone ? "bg-accent-green-500" : "bg-gray-200"}`} />}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
                {step === 1 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Upload your video</h2>
                        <div
                            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragOver ? "border-primary-400 bg-primary-50" : videoFile ? "border-accent-green-400 bg-accent-green-50" : "border-gray-300 hover:border-gray-400"}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            <span className={`material-symbols-outlined !text-5xl mb-4 block ${videoFile ? "text-accent-green-500" : "text-gray-300"}`}>
                                {videoFile ? "check_circle" : "cloud_upload"}
                            </span>
                            {videoFile ? (
                                <div>
                                    <p className="text-gray-900 font-semibold">{videoFile.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                                    <button className="text-accent-red-500 text-sm mt-3 font-medium hover:underline" onClick={() => setVideoFile(null)}>Remove</button>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-700 font-medium">Drag and drop your video here</p>
                                    <p className="text-sm text-gray-400 mt-1">MP4, MOV, or WebM • Max 500MB</p>
                                    <label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-50 text-primary-600 font-semibold text-sm cursor-pointer hover:bg-primary-100 transition-colors">
                                        <span className="material-symbols-outlined !text-[18px]">folder_open</span>
                                        Browse Files
                                        <input type="file" accept="video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) setVideoFile(e.target.files[0]); }} />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Select product</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                            {products?.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setProductId(p.id)}
                                    className={`text-left p-4 rounded-lg border transition-colors ${productId === p.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
                                >
                                    <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{p.category}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Review details</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                                placeholder="Give your review a descriptive title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Proof Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: "USAGE", label: "Daily Usage", icon: "schedule", desc: "Used regularly" },
                                    { value: "PURCHASE", label: "Purchased", icon: "receipt_long", desc: "Bought myself" },
                                    { value: "UNBOXING", label: "Unboxing", icon: "package_2", desc: "First open" },
                                    { value: "COMPARISON", label: "Comparison", icon: "compare", desc: "Side by side" },
                                ].map((pt) => (
                                    <button
                                        key={pt.value}
                                        onClick={() => setProofType(pt.value)}
                                        className={`p-4 rounded-lg border text-left transition-colors ${proofType === pt.value ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
                                    >
                                        <span className={`material-symbols-outlined !text-[22px] mb-2 block ${proofType === pt.value ? "text-primary-500" : "text-gray-400"}`}>{pt.icon}</span>
                                        <p className="text-sm font-semibold text-gray-900">{pt.label}</p>
                                        <p className="text-xs text-gray-500">{pt.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Months of usage</label>
                            <input
                                type="number"
                                min={0}
                                max={120}
                                value={usageMonths}
                                onChange={(e) => setUsageMonths(Number(e.target.value))}
                                className="w-32 h-11 px-4 rounded-lg border border-gray-300 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-center py-8">
                        <span className="material-symbols-outlined !text-5xl text-primary-500 mb-4 block">preview</span>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to submit</h2>
                        <div className="bg-gray-50 rounded-lg p-5 mb-6 text-left max-w-sm mx-auto">
                            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Title:</span> {title || "Untitled"}</p>
                            <p className="text-sm text-gray-600 mt-2"><span className="font-semibold text-gray-800">Proof:</span> {proofType}</p>
                            <p className="text-sm text-gray-600 mt-2"><span className="font-semibold text-gray-800">Usage:</span> {usageMonths} months</p>
                            {videoFile && <p className="text-sm text-gray-600 mt-2"><span className="font-semibold text-gray-800">Video:</span> {videoFile.name}</p>}
                        </div>
                        <p className="text-sm text-gray-400">Your review will be verified through SARS™ before publishing.</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
                    disabled={step === 1}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    Back
                </button>
                {step < 4 ? (
                    <button
                        onClick={() => setStep((s) => Math.min(4, s + 1) as Step)}
                        disabled={step === 1 && !videoFile}
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold gradient-btn-primary text-white hover:opacity-90 disabled:opacity-40 transition-all"
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title}
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold gradient-btn-primary text-white hover:opacity-90 disabled:opacity-40 transition-all"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                )}
            </div>
        </div>
    );
}
