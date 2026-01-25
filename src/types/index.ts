// User Types
export type TrustLevel = "NEW" | "TRUSTED" | "ELITE";

export interface User {
    id: string;
    email: string | null;
    phone: string | null;
    email_verified: boolean;
    phone_verified: boolean;
    identity_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface Profile {
    id: string;
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    trust_level: TrustLevel;
    bio: string | null;
}

// Review Types
export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ProofType = "USAGE" | "UNBOXING" | "FOLLOWUP";

export interface Review {
    id: string;
    user_id: string;
    product_id: string;
    video_url: string;
    thumbnail_url: string | null;
    duration: number;
    status: ReviewStatus;
    proof_type: ProofType;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}

export interface ReviewWithDetails extends Review {
    user: Profile;
    product: Product;
    watch_time_total: number;
}

// Product Types
export interface Product {
    id: string;
    name: string;
    category: string;
    image_url: string | null;
    external_id: string | null;
    created_at: string;
}

// Credibility Types
export interface CredibilityScore {
    id: string;
    user_id: string;
    score: number;
    consistency_factor: number;
    watch_time_factor: number;
    proof_factor: number;
    community_trust: number;
    last_calculated: string;
}

export interface ScoreHistory {
    id: string;
    score_id: string;
    old_score: number;
    new_score: number;
    reason: string;
    created_at: string;
}

// Report Types
export type ReportCategory = "FAKE" | "MISLEADING" | "INAPPROPRIATE" | "SPAM";
export type ReportStatus = "PENDING" | "REVIEWED" | "ACTIONED" | "DISMISSED";

export interface Report {
    id: string;
    review_id: string;
    reporter_id: string;
    category: ReportCategory;
    status: ReportStatus;
    created_at: string;
}

// Evidence Types
export type EvidenceType = "RECEIPT" | "SCREENSHOT" | "PHOTO";

export interface Evidence {
    id: string;
    review_id: string;
    type: EvidenceType;
    url: string;
    created_at: string;
}

// Watch Event Types
export interface WatchEvent {
    id: string;
    review_id: string;
    watch_time: number;
    completed: boolean;
    created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// Auth Types
export interface OTPRequest {
    type: "email" | "phone";
    value: string;
}

export interface OTPVerification {
    type: "email" | "phone";
    value: string;
    otp: string;
}

// Upload Types
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

export interface VideoUploadResult {
    url: string;
    thumbnailUrl: string;
    duration: number;
    size: number;
}
