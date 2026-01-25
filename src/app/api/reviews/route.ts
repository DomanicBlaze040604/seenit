import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/reviews - Get all approved reviews or user's own reviews
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);

        const userId = searchParams.get("userId");
        const productId = searchParams.get("productId");
        const status = searchParams.get("status");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = (page - 1) * limit;

        let query = supabase
            .from("reviews")
            .select(`
        *,
        profiles:user_id (id, display_name, avatar_url, trust_level),
        products:product_id (id, name, category, image_url)
      `, { count: "exact" })
            .order("created_at", { ascending: false })
            .range(offset, offset + limit - 1);

        if (userId) {
            query = query.eq("user_id", userId);
        }

        if (productId) {
            query = query.eq("product_id", productId);
        }

        if (status) {
            query = query.eq("status", status);
        }

        const { data, error, count } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            data,
            total: count || 0,
            page,
            pageSize: limit,
            totalPages: Math.ceil((count || 0) / limit),
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { product_id, video_url, thumbnail_url, duration, proof_type } = body;

        // Validate required fields
        if (!product_id || !video_url || !duration || !proof_type) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create review
        const { data, error } = await supabase
            .from("reviews")
            .insert({
                user_id: user.id,
                product_id,
                video_url,
                thumbnail_url,
                duration,
                proof_type,
                status: "PENDING",
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
