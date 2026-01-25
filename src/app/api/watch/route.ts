import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/watch - Record a watch event
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { review_id, watch_time, completed } = body;

        if (!review_id || watch_time === undefined) {
            return NextResponse.json(
                { error: "review_id and watch_time are required" },
                { status: 400 }
            );
        }

        // Get viewer if authenticated
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("watch_events")
            .insert({
                review_id,
                viewer_id: user?.id || null,
                watch_time,
                completed: completed || false,
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
