"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    name: string;
    category: string;
    image?: string;
}

const mockProducts: Product[] = [
    { id: "1", name: "Sony WH-1000XM5", category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" },
    { id: "2", name: "MacBook Pro 14\"", category: "Computers", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100" },
    { id: "3", name: "iPhone 15 Pro", category: "Electronics", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100" },
    { id: "4", name: "Dyson V15 Detect", category: "Home", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100" },
    { id: "5", name: "Samsung Galaxy S24", category: "Electronics", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100" },
];

type Step = 1 | 2 | 3 | 4;
type ProofType = "USAGE" | "UNBOXING" | "FOLLOWUP";

export default function UploadPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = React.useState<Step>(1);

    // Step 1: Video
    const [videoFile, setVideoFile] = React.useState<File | null>(null);
    const [videoPreview, setVideoPreview] = React.useState<string | null>(null);
    const [videoDuration, setVideoDuration] = React.useState(0);

    // Step 2: Product
    const [productSearch, setProductSearch] = React.useState("");
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    // Step 3: Details
    const [proofType, setProofType] = React.useState<ProofType | null>(null);
    const [title, setTitle] = React.useState("");

    // Step 4: Submit
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [error, setError] = React.useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const filteredProducts = productSearch
        ? mockProducts.filter((p) =>
            p.name.toLowerCase().includes(productSearch.toLowerCase())
        )
        : mockProducts;

    const handleFileSelect = (file: File) => {
        setError(null);

        if (!file.type.startsWith("video/")) {
            setError("Please select a video file");
            return;
        }

        if (file.size > 500 * 1024 * 1024) {
            setError("Video must be less than 500MB");
            return;
        }

        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
    };

    const handleVideoLoad = () => {
        if (videoRef.current) {
            const duration = videoRef.current.duration;
            setVideoDuration(duration);

            if (duration < 30) {
                setError("Video must be at least 30 seconds");
                setVideoFile(null);
                setVideoPreview(null);
                return;
            }

            if (duration > 300) {
                setError("Video must be less than 5 minutes");
                setVideoFile(null);
                setVideoPreview(null);
                return;
            }
        }
    };

    const handleSubmit = async () => {
        if (!videoFile || !selectedProduct || !proofType) return;

        setIsSubmitting(true);
        setUploadProgress(0);
        setError(null);

        try {
            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 95) {
                        clearInterval(interval);
                        return 95;
                    }
                    return prev + Math.random() * 15;
                });
            }, 200);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            clearInterval(interval);
            setUploadProgress(100);

            setTimeout(() => {
                router.push("/reviews?uploaded=true");
            }, 500);
        } catch (err: any) {
            setError(err.message || "Upload failed");
            setUploadProgress(0);
        } finally {
            setIsSubmitting(false);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return videoFile && !error;
            case 2:
                return selectedProduct;
            case 3:
                return proofType && title.trim().length >= 10;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const steps = [
        { num: 1, label: "Video", icon: "videocam" },
        { num: 2, label: "Product", icon: "inventory_2" },
        { num: 3, label: "Details", icon: "edit_note" },
        { num: 4, label: "Submit", icon: "check_circle" },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">Upload Review</h1>
                <p className="text-slate-500 mt-2">Share your authentic product experience</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.num}>
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.num
                                        ? "bg-[#2b8cee] text-white"
                                        : "bg-slate-200 text-slate-500"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg md:text-xl">{step.icon}</span>
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:block ${currentStep >= step.num ? "text-[#2b8cee]" : "text-slate-400"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2 rounded transition-colors ${currentStep > step.num ? "bg-[#2b8cee]" : "bg-slate-200"
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                </div>
            )}

            {/* Step Content */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                {/* Step 1: Video Upload */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Upload Your Video</h2>
                            <p className="text-slate-500 text-sm">30 seconds to 5 minutes, max 500MB</p>
                        </div>

                        {!videoPreview ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#2b8cee] hover:bg-[#2b8cee]/5 transition-colors"
                            >
                                <span className="material-symbols-outlined text-5xl text-slate-400 mb-4">
                                    cloud_upload
                                </span>
                                <p className="text-slate-700 font-medium mb-2">Click to upload video</p>
                                <p className="text-slate-400 text-sm">MP4, MOV, WebM supported</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        src={videoPreview}
                                        onLoadedMetadata={handleVideoLoad}
                                        controls
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-500">
                                        <span className="font-medium text-slate-700">{videoFile?.name}</span>
                                        {videoDuration > 0 && (
                                            <span className="ml-3">Duration: {formatDuration(videoDuration)}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            setVideoFile(null);
                                            setVideoPreview(null);
                                            setVideoDuration(0);
                                        }}
                                        className="text-red-600 text-sm font-medium hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        />
                    </div>
                )}

                {/* Step 2: Select Product */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Select Product</h2>
                            <p className="text-slate-500 text-sm">What product are you reviewing?</p>
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <span className="material-symbols-outlined text-lg">search</span>
                            </span>
                            <input
                                type="text"
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-slate-100 border-none rounded-lg py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2b8cee]/20"
                            />
                        </div>

                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {filteredProducts.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${selectedProduct?.id === product.id
                                            ? "border-[#2b8cee] bg-[#2b8cee]/5"
                                            : "border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <div
                                        className="w-12 h-12 rounded-lg bg-cover bg-center bg-slate-200"
                                        style={{ backgroundImage: product.image ? `url('${product.image}')` : undefined }}
                                    />
                                    <div className="flex-1 text-left">
                                        <p className="font-medium text-slate-900">{product.name}</p>
                                        <p className="text-sm text-slate-500">{product.category}</p>
                                    </div>
                                    {selectedProduct?.id === product.id && (
                                        <span className="material-symbols-outlined text-[#2b8cee]">check_circle</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Review Details</h2>
                            <p className="text-slate-500 text-sm">Tell us more about your review</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Review Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Honest review after 6 months of use"
                                className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2b8cee]/20"
                            />
                            <p className="text-xs text-slate-400 mt-1">{title.length}/100 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Proof Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {([
                                    { value: "USAGE", label: "Usage Proof", icon: "inventory_2", desc: "Show product in use" },
                                    { value: "UNBOXING", label: "Unboxing", icon: "package_2", desc: "Fresh out of box" },
                                    { value: "FOLLOWUP", label: "Follow-up", icon: "update", desc: "Long-term review" },
                                ] as const).map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => setProofType(type.value)}
                                        className={`p-4 rounded-lg border text-left transition-colors ${proofType === type.value
                                                ? "border-[#2b8cee] bg-[#2b8cee]/5"
                                                : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span
                                            className={`material-symbols-outlined text-2xl mb-2 ${proofType === type.value ? "text-[#2b8cee]" : "text-slate-400"
                                                }`}
                                        >
                                            {type.icon}
                                        </span>
                                        <p className="font-medium text-slate-900">{type.label}</p>
                                        <p className="text-xs text-slate-500">{type.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Review & Submit</h2>
                            <p className="text-slate-500 text-sm">Confirm your review details</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 space-y-4">
                            <div className="flex items-center gap-4">
                                {videoPreview && (
                                    <video
                                        src={videoPreview}
                                        className="w-24 h-16 rounded object-cover"
                                    />
                                )}
                                <div>
                                    <p className="font-medium text-slate-900">{title || "Untitled Review"}</p>
                                    <p className="text-sm text-slate-500">{formatDuration(videoDuration)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Product</p>
                                    <p className="font-medium text-slate-900">{selectedProduct?.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Proof Type</p>
                                    <p className="font-medium text-slate-900 capitalize">
                                        {proofType?.toLowerCase().replace("_", " ")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {isSubmitting && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Uploading...</span>
                                    <span className="text-[#2b8cee] font-medium">{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#2b8cee] transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1) as Step)}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                </button>

                {currentStep < 4 ? (
                    <button
                        onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1) as Step)}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#2b8cee] text-white font-bold rounded-lg hover:bg-[#1e7ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">cloud_upload</span>
                                Submit Review
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
