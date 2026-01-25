import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/reports - Create a report
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { review_id, category, description } = body;

        if (!review_id || !category) {
            return NextResponse.json(
                { error: "review_id and category are required" },
                { status: 400 }
            );
        }

        // Check if user already reported this review
        const { data: existing } = await supabase
            .from("reports")
            .select("id")
            .eq("review_id", review_id)
            .eq("reporter_id", user.id)
            .single();

        if (existing) {
            return NextResponse.json(
                { error: "You have already reported this review" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("reports")
            .insert({
                review_id,
                reporter_id: user.id,
                category,
                description,
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

// GET /api/reports - Get user's reports
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from("reports")
            .select(`
        *,
        reviews:review_id (id, video_url, thumbnail_url, products:product_id (name))
      `)
            .eq("reporter_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
