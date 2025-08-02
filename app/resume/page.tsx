import ResumeForm from "@/components/resume-form/resume-form";
import React from "react";

function ResumePage() {
  const defaultValues = {
    name: "",
    email: "",
    linkedIn: "",
    github: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    project: [],
    skills: [],
    education: [],
    certifications: [],
    extracurriculars: [],
  };

  return (
    <div className="max-w-7xl mx-auto h-full mt-14 p-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">Resume</h1>
      <ResumeForm defaultValues={defaultValues} />
    </div>
  );
}

export default ResumePage;
