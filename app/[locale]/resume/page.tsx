import ResumeForm from "@/components/resume-form/resume-form";
import React from "react";
import ResumeParser from "@/components/resume-parser/resume-parser";
import { getCurrentUser } from "@/requests/user";
import { redirect } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { getResume, getResumesLanguages } from "@/requests/resume";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/types/types";

async function ResumePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const currentUser = await getCurrentUser(locale);
  const t = await getTranslations("Resume");

  if (!currentUser) {
    redirect("/");
  }

  const resume = await getResume(locale);
  const resumeLanguages = await getResumesLanguages();

  const defaultValues = {
    name: resume?.name || "",
    email: resume?.email || "",
    linkedIn: resume?.linkedIn || "",
    github: resume?.github || "",
    phone: resume?.phone || "",
    location: resume?.location || "",
    summary: resume?.summary || "",
    experience: resume?.experience || [],
    projects: resume?.projects || [],
    skills: resume?.skills || [],
    education: resume?.education || [],
    certifications: resume?.certifications || [],
    extracurriculars: resume?.extracurriculars || [],
  };

  return (
    <main className="max-w-5xl mx-auto h-full pt-18 pb-4 px-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">{t("resume")}</h1>
      <ResumeParser balance={currentUser?.balance} resumeLanguages={resumeLanguages} />
      <Separator className="h-[1px] bg-border my-6" />
      <ResumeForm defaultValues={defaultValues} />
    </main>
  );
}

export default ResumePage;
