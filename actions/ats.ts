"use server";

import { Resume } from "@/validation/resume";
import { removeStopwords } from "stopword";

type ATSScoreResult = {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
};
export async function calculateATSScore({
  jobDescription,
  resume,
}: {
  jobDescription: string;
  resume: Resume;
}): Promise<ATSScoreResult> {
  const cleanText = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

  // Extract keywords from JD
  const jdWords = cleanText(jobDescription);
  const keywords = Array.from(new Set(removeStopwords(jdWords)));

  // Flatten resume into text
  const resumeWords = cleanText(
    [
      resume.summary,
      ...resume.skills.map((s) => s.text),
      ...resume.experience.flatMap((e) => e.bulletPoints.map((b) => b.text)),
      ...(resume.projects?.flatMap((p) => p.bulletPoints.map((b) => b.text)) ??
        []),
      ...(resume.education?.flatMap((e) => e.degree) ?? []),
      ...(resume.certifications?.flatMap((c) => c.name) ?? []),
      ...(resume.extracurriculars?.flatMap((c) => c.name) ?? []),
    ].join(" ")
  );

  const resumeTextSet = new Set(resumeWords);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const word of keywords) {
    if (resumeTextSet.has(word)) {
      matchedKeywords.push(word);
    } else {
      missingKeywords.push(word);
    }
  }

  const score = Math.round((matchedKeywords.length / keywords.length) * 100);

  return {
    score: Math.min(score, 100),
    matchedKeywords,
    missingKeywords,
  };
}