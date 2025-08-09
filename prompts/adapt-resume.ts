import { resumeSchema } from "./parse-resume";

export const adaptResumePrompt = (baseResume: object, jobDescription: string): string => {

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

    Return a valid JSON object with:
    - The updated resume (same schema as input)
    - A new field "improvements": a list of 4–5 plain text bullet points describing how the resume was adapted.
    - Do not include extra commentary, just the updated JSON.
    - Return the resume data in the job description's language. i.e. if the JD is in French, return the resume in French. regardless of the base resume's language.
    - The improvements should be in the base resume's language. i.e. if the base resume is in English, return the improvements in English. regardless of the job description's language.
    - DO NOT include triple backticks. DO NOT write anything outside the JSON.
    - If there is no base resume, return the a resume that fits the description the best and follows this schema:\n${resumeSchema}

    BASE RESUME JSON:
    ${baseResume ? JSON.stringify(baseResume) : ""}

    JOB DESCRIPTION:
    ${jobDescription}
  `;

  return prompt;
};
