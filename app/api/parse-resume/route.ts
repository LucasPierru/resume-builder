// app/api/parse-resume/route.ts
import { NextRequest } from 'next/server';
import pdfParse from 'pdf-parse';

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
    .trim();

  return Response.json({ rawText })
}
