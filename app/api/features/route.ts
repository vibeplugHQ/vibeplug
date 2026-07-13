import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient(await cookies());

  const { data, error } = await supabase
    .from("features")
    .select("id, name, description, category, price")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
