import { OpenAI } from "openai"; // or your own wrapper
import { NextResponse } from "next/server";
import { adaptResumePrompt } from "@/prompts/adapt-resume";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { jobDescription, baseResume } = await req.json();

  const prompt = adaptResumePrompt(baseResume, jobDescription);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if you're optimizing costs
    messages: [
      {
        role: "system",
        content: "You are an expert ATS-aware resume optimizer.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const textOutput = response.choices[0]?.message?.content ?? "";
  const cleaned = textOutput.trim();

  // Try to parse the updated JSON
  try {
    const updatedResume = JSON.parse(cleaned);
    console.log("Updated resume:", updatedResume);
    return NextResponse.json({ updatedResume });
  } catch (error) {
    console.error("Error parsing updated resume JSON:", error);
    return NextResponse.json(
      { error: "Failed to parse the updated resume JSON.", raw: cleaned },
      { status: 400 }
    );
  }
}
