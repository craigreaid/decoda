import { NextResponse } from "next/server";
import { getProgress, markCompleted, resetProgress } from "@/lib/progressStore";

export function GET() {
  return NextResponse.json(getProgress());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const storyId =
    typeof body === "object" && body !== null && "storyId" in body
      ? (body as { storyId?: unknown }).storyId
      : undefined;

  if (typeof storyId !== "string" || storyId.length === 0) {
    return NextResponse.json({ error: "storyId is required" }, { status: 400 });
  }

  const result = markCompleted(storyId);
  if (!result.ok) {
    return NextResponse.json({ error: "Unknown story" }, { status: 404 });
  }
  return NextResponse.json(result.progress);
}

export function DELETE() {
  return NextResponse.json(resetProgress());
}
