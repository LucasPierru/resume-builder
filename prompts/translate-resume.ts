import { Resume } from "@/validation/resume";

export const translateResumePrompt = (baseResume: Resume, originalLanguage: string, targetLanguage: string): string => {
  const prompt = `
    You are a professional translator.

    Translate the following resume from ${originalLanguage} to ${targetLanguage}. Keep the structure and field names exactly as they are. Only translate the values (like job titles, summaries, bullet points, degrees, etc). Do not translate field labels like "jobTitle", "skills", or "summary". Keep in mind, this is a resume and should be treated as such so use the appropriate grammar.

    Return only the translated JSON — no extra commentary.

    BASE RESUME JSON:
    ${JSON.stringify(baseResume)}
  `;

  return prompt;
};