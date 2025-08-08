// app/api/parse-resume/route.ts
import { prisma } from '@/lib/prisma';
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

    if (!user) return Response.json({ resume: null, error: "Not authenticated" }, { status: 401 });

    const { rawText, locale } = await req.json();
    const cost = rawText.length; // Assuming 1 credit per character

    // Fetch current credit balance
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) return Response.json({ resume: null, error: "User not found" }, { status: 404 });
    if (dbUser.balance < cost) {
      return Response.json({ resume: null, error: "Insufficient credits" }, { status: 403 });
    }

    // Update credit balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        balance: { decrement: cost },
      },
    });

    if (!updatedUser) return Response.json({ resume: null, error: "Failed to update user" }, { status: 500 });

    // Use GPT to convert to schema
    const prompt = `You are a strict JSON API. Extract the following fields from the resume text and return ONLY a valid JSON object with NO explanation, formatting, or commentary. DO NOT include triple backticks. DO NOT write anything outside the JSON. Here is the text:\n\n${rawText}\n\nReturn data in this format:\n{
    "name": "",
    "email": "",
    "linkedIn": "",
    "github": "",
    "phone": "",
    "location": "",
    "summary": "",
    "skills": [],
    "experience": [
      {
        "jobTitle": "",
        "company": "",
        "startDate": "",
        "endDate": "",
        "currentlyWorking": false,
        "location": "",
        "bulletPoints": [
          {
            "text": ""
          }
        ]
      }
    ],
    "projects": [
      {
        "name": "",
        "startDate": "",
        "endDate": "",
        "currentlyWorking": false,
        "bulletPoints": [
          {
            "text": ""
          }
        ]
      }
    ],
    "skills": [
      {
        "text": ""
      }
    ],
    "education": [
      {
        "institution": "",
        "location": "",
        "degree": "",
        "startDate": "",
        "endDate": "",
        "currentlyWorking": false,
        "gpa": ""
      }
    ],
    "certifications": [
      {
        "name": "",
        "description": ""
      }
    ],
    "extracurriculars": [
      {
        "name": "",
        "description": "",
        "startDate": "",
        "endDate": "",
        "currentlyWorking": false,
        "location": "",
        "bulletPoints": [
          {
            "text": ""
          }
        ]
      }
    ]
  }
    Requirements:
- All string values must be plain strings (no HTML or markdown).
- Dates must be written in ISO format: "YYYY-MM" or "YYYY-MM-DD".
- Arrays must not be empty unless that section is clearly missing.
- If a field is not found in the resume, return a reasonable placeholder or leave it as an empty string.
- Validate email and phone formats.
- Normalize capitalization and spelling where needed.
- Make sure skills is an array of objects with the shape { "text": "..." } — NOT a comma-separated string.
- Do not return anything before or after the JSON. Only return valid JSON.
- Double-check that your response is a **valid and parsable JSON object**.
- If a summary is not present, generate one that fits the resume.
- Respect the original language of the resume, do not translate it.`;


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
    return Response.json({ resume: null, error: error }, { status: 500 });
  }
}