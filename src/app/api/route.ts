import { chatCompletion } from "@/ai/openai";
import { NextResponse } from "next/server";

export async function GET() {
  const completion = await chatCompletion(
    "Could you summarize some news stories from 2021? Answer with a json format containing some useful data related to the news stories."
  );
  return NextResponse.json(JSON.parse(completion?.message?.content || ""), {
    status: 200,
  });
}

export async function POST() {
  return NextResponse.json({ message: "Hello World post" }, { status: 200 });
}
