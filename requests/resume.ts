"use server"

import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { Locale } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { Resume } from "@/validation/resume";
import { getLocale } from "next-intl/server";

export async function updateResume(data: Resume, locale: Locale = "en") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Update the user's resume in the database
  const updatedResume = await prisma.resume.upsert({
    where: { userId_language: { userId: user.id, language: locale } },
    update: {
      data: JSON.stringify(data),
      // Include the fields you want to update
    },
    create: {
      userId: user.id,
      title: `${user.user_metadata.name.replace(" ", "_")}_Resume`,
      data: JSON.stringify(data),
      language: locale, // Store the locale
    },
  });

  return updatedResume;
}

export async function getResume(locale: Locale = "en") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const resume = await prisma.resume.findUnique({
    where: { userId_language: { userId: user.id, language: locale } },
  });

  if (!resume) return null;

  return JSON.parse(resume.data as string) as Resume;
}

export async function getResumesLanguages() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const locale = await getLocale()

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id, language: { not: locale } },
  });

  if (!resumes) return null;

  return resumes.map(resume => resume.language);
}