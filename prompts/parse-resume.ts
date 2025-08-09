export const resumeSchema = `
  {
    "name": "",
    "email": "",
    "linkedIn": "",
    "github": "",
    "phone": "",
    "location": "",
    "summary": "",z
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
  }`

export const parseResumePrompt = (rawText: string): string => {
  const prompt = `
    You are a strict JSON API. Extract the following fields from the resume text and return ONLY a valid JSON object with NO explanation, formatting, or commentary. DO NOT include triple backticks. DO NOT write anything outside the JSON. Here is the text:\n\n${rawText}\n\nReturn data in this format:\n${resumeSchema}
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
    - Respect the original language of the resume, do not translate it.
  `;

  return prompt;
};
