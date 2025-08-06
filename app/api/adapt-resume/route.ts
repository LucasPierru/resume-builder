import { OpenAI } from "openai"; // or your own wrapper
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { jobDescription, baseResume } = await req.json();

  const prompt = `
You are a resume optimization assistant helping candidates tailor their resumes to job descriptions. 

You will receive:
1. A base resume in structured JSON format
2. A job description (JD)

Your tasks:
- Adapt the resume to better match the job description by editing relevant sections: summary, skills, experience, projects, etc.
- Keep formatting and field names the same.
- Improve relevance, clarity, and alignment to the JD.
- Do NOT add fictional or unrelated experience — only adapt the wording and highlights to align with the JD.

Return a JSON object with:
- The updated resume (same schema as input)
- A new field "improvements": a list of 4–5 plain text bullet points describing how the resume was adapted.
- Do not include extra commentary, just the updated JSON.

BASE RESUME JSON:
${JSON.stringify(baseResume)}

JOB DESCRIPTION:
${jobDescription}
`;

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
    return NextResponse.json({ updatedResume });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to parse the updated resume JSON.", raw: cleaned },
      { status: 400 }
    );
  }
}
