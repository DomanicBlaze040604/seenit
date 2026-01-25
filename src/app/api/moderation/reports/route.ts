import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/moderation/reports - Get pending reports
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const admin = await createAdminClient();
        const status = searchParams.get("status") || "PENDING";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = (page - 1) * limit;

        const { data, error, count } = await admin
            .from("reports")
            .select(`
        *,
        reporter:reporter_id (id, display_name),
        reviews:review_id (
          id, video_url, thumbnail_url, status,
          profiles:user_id (id, display_name, trust_level),
          products:product_id (name)
        )
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
