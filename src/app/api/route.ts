import { promptAi } from "@/ai/openai";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as { prompt: string }; // TODO verify payload
  const content = await promptAi(payload.prompt);
  return NextResponse.json(JSON.parse(content || ""), {
    status: 200,
  });
}
