import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/profile - Get current user's profile
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (profileError) {
            return NextResponse.json({ error: profileError.message }, { status: 500 });
        }

        const { data: score } = await supabase
            .from("credibility_scores")
            .select("*")
            .eq("user_id", user.id)
            .single();

        // Get review stats
        const { data: reviews } = await supabase
            .from("reviews")
            .select("id, status")
            .eq("user_id", user.id);

        const stats = {
            totalReviews: reviews?.length || 0,
            approvedReviews: reviews?.filter(r => r.status === "APPROVED").length || 0,
            pendingReviews: reviews?.filter(r => r.status === "PENDING").length || 0,
        };

        return NextResponse.json({
            ...profile,
            email: user.email,
            phone: user.phone,
            credibility: score,
            stats,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH /api/profile - Update current user's profile
export async function PATCH(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const allowedFields = ["display_name", "avatar_url", "bio"];
        const updates: Record<string, any> = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updates[field] = body[field];
            }
        }

        const { data, error } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
