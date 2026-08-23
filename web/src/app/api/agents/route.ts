import { NextResponse } from "next/server";
import { getAgents } from "@/lib/8004scan";
import { rankAgents } from "@/lib/ranking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().slice(0, 200);
  const limitText = searchParams.get("limit") ?? "20";
  const requestedLimit = /^\d{1,3}$/.test(limitText) ? Number.parseInt(limitText, 10) : 20;
  const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(requestedLimit, 40)) : 20;

  try {
    const result = await getAgents({ query: q || undefined, limit });
    const ranked = rankAgents(result.data, { rawQuery: q });
    return NextResponse.json({ success: true, data: ranked, meta: result.meta, source: "8004scan" });
  } catch {
    return NextResponse.json({ success: false, error: "The live agent source is temporarily unavailable." }, { status: 502 });
  }
}
