import { OpenAI } from "openai"; // or your own wrapper
import { NextResponse } from "next/server";
import { getResume, updateResume } from "@/requests/resume";
import { Resume } from "@/validation/resume";
import { revalidatePath } from "next/cache";
import { languages } from "@/lib/utils";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { originalLanguage, targetLanguage } = await req.json();

    const resume = await getResume(originalLanguage);

    const prompt = `
      You are a professional translator.

      Translate the following resume from ${languages[originalLanguage as keyof typeof languages]} to ${languages[targetLanguage as keyof typeof languages]}. Keep the structure and field names exactly as they are. Only translate the values (like job titles, summaries, bullet points, degrees, etc). Do not translate field labels like "jobTitle", "skills", or "summary".

      Return only the translated JSON — no extra commentary.

      BASE RESUME JSON:
      ${JSON.stringify(resume)}`;

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
