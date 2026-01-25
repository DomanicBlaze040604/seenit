import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/evidence - Add evidence to a review
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { review_id, type, url } = body;

        if (!review_id || !type || !url) {
            return NextResponse.json(
                { error: "review_id, type, and url are required" },
                { status: 400 }
            );
        }

        // Verify user owns the review
        const { data: review } = await supabase
            .from("reviews")
            .select("id, user_id")
            .eq("id", review_id)
            .single();

        if (!review || review.user_id !== user.id) {
            return NextResponse.json(
                { error: "You can only add evidence to your own reviews" },
                { status: 403 }
            );
        }

        const { data, error } = await supabase
            .from("evidence")
            .insert({
                review_id,
                type,
                url,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
