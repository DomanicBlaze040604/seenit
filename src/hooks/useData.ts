"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Review, CredibilityScore } from "@/types";

interface ProfileData extends Profile {
    email?: string;
    phone?: string;
    identity_verified?: boolean;
    credibility: CredibilityScore | null;
    stats: {
        totalReviews: number;
        approvedReviews: number;
        pendingReviews: number;
    };
}

export function useProfile() {
    const [profile, setProfile] = React.useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchProfile = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/profile");

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const data = await response.json();
            setProfile(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateProfile = async (updates: Partial<Profile>) => {
        try {
            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const { data } = await response.json();
            setProfile(prev => prev ? { ...prev, ...data } : null);
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    React.useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile, updateProfile };
}

export function useReviews(options: {
    userId?: string;
    productId?: string;
    status?: string;
    page?: number;
    limit?: number;
} = {}) {
    const [reviews, setReviews] = React.useState<Review[]>([]);
    const [total, setTotal] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchReviews = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams();

            if (options.userId) params.set("userId", options.userId);
            if (options.productId) params.set("productId", options.productId);
            if (options.status) params.set("status", options.status);
            if (options.page) params.set("page", options.page.toString());
            if (options.limit) params.set("limit", options.limit.toString());

            const response = await fetch(`/api/reviews?${params}`);

            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const result = await response.json();
            setReviews(result.data || []);
            setTotal(result.total || 0);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [options.userId, options.productId, options.status, options.page, options.limit]);

    React.useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, total, isLoading, error, refetch: fetchReviews };
}

export function useProducts(search?: string, category?: string) {
    const [products, setProducts] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const params = new URLSearchParams();
                if (search) params.set("search", search);
                if (category) params.set("category", category);

                const response = await fetch(`/api/products?${params}`);
                const { data } = await response.json();
                setProducts(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [search, category]);

    return { products, isLoading };
}

export function useModerationQueue(type: "reviews" | "reports", status = "PENDING") {
    const [items, setItems] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const fetchItems = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams({ status, page: page.toString() });
            const response = await fetch(`/api/moderation/${type}?${params}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}`);
            }

            const result = await response.json();
            setItems(result.data || []);
            setTotal(result.total || 0);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [type, status, page]);

    const moderateReview = async (id: string, action: "approve" | "reject", reason?: string) => {
        try {
            const response = await fetch(`/api/moderation/reviews/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, rejection_reason: reason }),
            });

            if (!response.ok) {
                throw new Error("Failed to moderate review");
            }

            // Remove from list
            setItems(prev => prev.filter(item => item.id !== id));
            setTotal(prev => prev - 1);
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    const resolveReport = async (id: string, action: "action" | "dismiss") => {
        try {
            const response = await fetch(`/api/moderation/reports/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });

            if (!response.ok) {
                throw new Error("Failed to resolve report");
            }

            setItems(prev => prev.filter(item => item.id !== id));
            setTotal(prev => prev - 1);
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    React.useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return {
        items,
        total,
        page,
        setPage,
        isLoading,
        error,
        refetch: fetchItems,
        moderateReview,
        resolveReport,
    };
}
