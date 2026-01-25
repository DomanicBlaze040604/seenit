import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search");
        const category = searchParams.get("category");

        let query = supabase
            .from("products")
            .select("*")
            .order("name");

        if (search) {
            query = query.ilike("name", `%${search}%`);
        }

        if (category) {
            query = query.eq("category", category);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/products - Create a new product (for manual entry)
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, category, image_url, external_id } = body;

        if (!name || !category) {
            return NextResponse.json(
                { error: "Name and category are required" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("products")
            .insert({ name, category, image_url, external_id })
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
