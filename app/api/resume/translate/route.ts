import { OpenAI } from "openai"; // or your own wrapper
import { NextResponse } from "next/server";
import { getResume, updateResume } from "@/requests/resume";
import { Resume } from "@/validation/resume";
import { revalidatePath } from "next/cache";
import { languages } from "@/lib/utils";
import { translateResumePrompt } from "@/prompts/translate-resume";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { originalLanguage, targetLanguage } = await req.json();

    const resume = await getResume(originalLanguage);
    if (!resume) {
      return NextResponse.json({ error: "no-resume-to-translate" }, { status: 404 });
    }

    const prompt = translateResumePrompt(resume, languages[originalLanguage as keyof typeof languages], languages[targetLanguage as keyof typeof languages]);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if you're optimizing costs
      messages: [
        {
          role: "system",
          content: "You are a professional resume translator. Always return valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    let content = response.choices[0]?.message?.content ?? "";


    if (content.includes("```")) {
      content = content.replace(/```(json)?/g, "").trim();
    }

    // Try to parse the updated JSON
    const updatedResume: Resume = JSON.parse(content);
    await updateResume(updatedResume, targetLanguage);
    revalidatePath('/resume');

    return NextResponse.json({ updatedResume });
  } catch (error) {
    console.error("Error translating resume:", error);
    return NextResponse.json(
      { error: "Failed to parse the updated resume JSON." },
      { status: 400 }
    );
  }
}
