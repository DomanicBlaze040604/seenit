import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// PATCH /api/moderation/reviews/[id] - Approve or reject a review
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // TODO: Check if user is a moderator

        const body = await request.json();
        const { action, rejection_reason } = body;

        if (!action || !["approve", "reject"].includes(action)) {
            return NextResponse.json(
                { error: "Action must be 'approve' or 'reject'" },
                { status: 400 }
            );
        }

        if (action === "reject" && !rejection_reason) {
            return NextResponse.json(
                { error: "Rejection reason is required" },
                { status: 400 }
            );
        }

        const admin = await createAdminClient();

        const updates: Record<string, any> = {
            status: action === "approve" ? "APPROVED" : "REJECTED",
            updated_at: new Date().toISOString(),
        };

        if (action === "approve") {
            updates.published_at = new Date().toISOString();
        } else {
            updates.rejection_reason = rejection_reason;
        }

        const { data, error } = await admin
            .from("reviews")
            .update(updates)
            .eq("id", id)
            .select(`
        *,
        profiles:user_id (id, display_name)
      `)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Recalculate user's credibility score after approval/rejection
        if (data) {
            await admin.rpc("calculate_credibility_score", { p_user_id: data.user_id });
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
