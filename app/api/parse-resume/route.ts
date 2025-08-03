// app/api/parse-resume/route.ts
import { NextRequest } from 'next/server';
import pdfParse from 'pdf-parse';
import { OpenAI } from 'openai'; // if you're using GPT

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await pdfParse(buffer);

  const rawText = data.text.replace(/\s{2,}/g, ' ') // multiple spaces → one space
    .replace(/\n{2,}/g, '\n') // multiple newlines → one
    .trim();;

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
    "project": [
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
        "fieldOfStudy": "",
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
  }`;


  const completion = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });
  console.log({ promptLength: prompt.length, completion });

  const structuredData = JSON.parse(completion.choices[0].message.content || '{}');

  console.log({ structuredData });

  return Response.json({ structuredData })
}
