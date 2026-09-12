import { NextResponse } from "next/server";
import { stories, summarize } from "@/data/stories";

export function GET() {
  return NextResponse.json({
    count: stories.length,
    stories: stories.map(summarize),
  });
}
