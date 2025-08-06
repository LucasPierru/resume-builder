import ResumeForm from "@/components/resume-form/resume-form";
import ResumeViewer from "@/components/resume-viewer/resume-viewer";
import React from "react";
import ResumeParser from "@/components/resume-parser/resume-parser";
import { getCurrentUser } from "@/requests/user";
import { redirect } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { getResume } from "@/requests/resume";

async function ResumePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const resume = await getResume();

  const defaultValues = {
    name: resume?.name || "",
    email: resume?.email || "",
    linkedIn: resume?.linkedIn || "",
    github: resume?.github || "",
    phone: resume?.phone || "",
    location: resume?.location || "",
    summary: resume?.summary || "",
    experience: resume?.experience || [],
    project: resume?.project || [],
    skills: resume?.skills || [],
    education: resume?.education || [],
    certifications: resume?.certifications || [],
    extracurriculars: resume?.extracurriculars || [],
  };

  return (
    <div className="max-w-5xl mx-auto h-full pt-18 pb-4 px-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">Resume</h1>
      <ResumeParser balance={currentUser?.balance} />
      <Separator className="h-[1px] bg-border my-6" />
      <ResumeViewer data={defaultValues} />
      <ResumeForm defaultValues={defaultValues} />
    </div>
  );
}

export default ResumePage;
