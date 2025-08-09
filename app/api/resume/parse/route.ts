// app/api/parse-resume/route.ts
import { prisma } from '@/lib/prisma';
import { parseResumePrompt } from '@/prompts/parse-resume';
import { updateResume } from '@/requests/resume';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';
import { OpenAI } from 'openai'; // if you're using GPT

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return Response.json({ resume: null, error: "not-authenticated" }, { status: 401 });

    const { rawText, locale } = await req.json();
    const cost = rawText.length; // Assuming 1 credit per character

    // Fetch current credit balance
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) return Response.json({ resume: null, error: "user-not-found" }, { status: 404 });
    if (dbUser.balance < cost) {
      return Response.json({ resume: null, error: "insufficient-credits" }, { status: 403 });
    }

    // Update credit balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        balance: { decrement: cost },
      },
    });

    if (!updatedUser) return Response.json({ resume: null, error: "failed-to-update-user" }, { status: 500 });

    // Use GPT to convert to schema
    const prompt = parseResumePrompt(rawText);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });
    // console.log({ promptLength: prompt.length, completion });

    const structuredData = JSON.parse(completion.choices[0].message.content || '{}');

    // console.log({ structuredData });
    await updateResume(structuredData, locale)
    revalidatePath('/resume');

    return Response.json({ resume: structuredData, error: null })
  } catch (error) {
    console.error("Error parsing resume:", error);
    return Response.json({ resume: null, error: "failed-to-parse-resume" }, { status: 500 });
  }
}