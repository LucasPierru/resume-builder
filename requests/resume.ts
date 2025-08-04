"use server"

import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { createClient } from "@/utils/supabase/server";
import { Resume } from "@/validation/resume";

export async function updateResume(data: Resume) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Update the user's resume in the database
  const updatedResume = await prisma.resume.upsert({
    where: { userId: user.id },
    update: {
      data: JSON.stringify(data),
      // Include the fields you want to update
    },
    create: {
      userId: user.id,
      title: `${user.user_metadata.name.replace(" ", "_")}_Resume`,
      data: JSON.stringify(data),
    },
  });

  return updatedResume;
}

export async function getResume() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const resume = await prisma.resume.findUnique({
    where: { userId: user.id },
  });

  if (!resume) return null;

  return JSON.parse(resume.data as string) as Resume;
}