import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-pro"),
      system: "You are Clario, the AI Support Specialist for our UGC scripts marketplace. You help users navigate the platform, understand pricing (which ranges from free signups to pro tiers for analysis features), connect brands with writers, and explain how scripts convert into TikTok and Reels videos.",
      messages,
    });

    return result.toDataStreamResponse();
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Something went wrong"}), { status: 500 });
  }
}
