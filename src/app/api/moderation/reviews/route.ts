import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/moderation/reviews - Get reviews pending moderation
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Check if user is a moderator
        // For MVP, we'll use the service role to access all pending reviews

        const admin = await createAdminClient();
        const status = searchParams.get("status") || "PENDING";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = (page - 1) * limit;

        const { data, error, count } = await admin
            .from("reviews")
            .select(`
        *,
        profiles:user_id (id, display_name, avatar_url, trust_level),
        products:product_id (id, name, category)
      `, { count: "exact" })
            .eq("status", status)
            .order("created_at", { ascending: true })
            .range(offset, offset + limit - 1);

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
