import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
    params: Promise<{ id: string }>;
}

// PATCH /api/moderation/reports/[id] - Resolve a report
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { action } = body;

        if (!action || !["action", "dismiss"].includes(action)) {
            return NextResponse.json(
                { error: "Action must be 'action' or 'dismiss'" },
                { status: 400 }
            );
        }

        const admin = await createAdminClient();

        // Update report
        const { data: report, error: reportError } = await admin
            .from("reports")
            .update({
                status: action === "action" ? "ACTIONED" : "DISMISSED",
                resolved_at: new Date().toISOString(),
                resolved_by: user.id,
            })
            .eq("id", id)
            .select("*, reviews:review_id (id, user_id)")
            .single();

        if (reportError) {
            return NextResponse.json({ error: reportError.message }, { status: 500 });
        }

        // If actioned, reject the review
        if (action === "action" && report?.reviews) {
            const reviewData = report.reviews as any;
            await admin
                .from("reviews")
                .update({
                    status: "REJECTED",
                    rejection_reason: "Content flagged by community moderation",
                })
                .eq("id", reviewData.id);

            // Recalculate creator's credibility score
            await admin.rpc("calculate_credibility_score", { p_user_id: reviewData.user_id });
        }

        return NextResponse.json({ data: report });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
