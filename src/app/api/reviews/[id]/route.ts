import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET /api/reviews/[id] - Get a single review
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("reviews")
            .select(`
        *,
        profiles:user_id (id, display_name, avatar_url, trust_level),
        products:product_id (id, name, category, image_url),
        evidence (id, type, url)
      `)
            .eq("id", id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        // Get watch stats
        const { data: watchData } = await supabase
            .from("watch_events")
            .select("watch_time, completed")
            .eq("review_id", id);

        const totalViews = watchData?.length || 0;
        const avgWatchTime = watchData && watchData.length > 0
            ? Math.round(watchData.reduce((acc, w) => acc + w.watch_time, 0) / watchData.length)
            : 0;
        const completionRate = watchData && watchData.length > 0
            ? Math.round((watchData.filter(w => w.completed).length / watchData.length) * 100)
            : 0;

        return NextResponse.json({
            ...data,
            stats: {
                totalViews,
                avgWatchTime,
                completionRate,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH /api/reviews/[id] - Update a review
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const allowedFields = ["video_url", "thumbnail_url", "proof_type"];
        const updates: Record<string, any> = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updates[field] = body[field];
            }
        }

        const { data, error } = await supabase
            .from("reviews")
            .update(updates)
            .eq("id", id)
            .eq("user_id", user.id) // Only owner can update
            .eq("status", "PENDING") // Only pending reviews can be updated
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

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
