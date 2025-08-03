"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Resume, resumeSchema } from "@/validation/resume";
import InformationSection from "./information-section/information-section";
import ExperienceSection from "./experience-section/experience-section";
import { Separator } from "../ui/separator";
import ProjectSection from "./project-section/project-section";
import SkillsSection from "./skills-section/skills-section";
import EducationSection from "./education-section/education-section";
import CertificationSection from "./certifications-section/certification-section";
import ExtracurricularsSection from "./extracurriculars-section/extracurriculars-section";

function ResumeForm({ defaultValues }: { defaultValues: Resume }) {
  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
  });

  const onSubmit = (data: Resume) => {
    console.log("Form submitted with data:", data);
  };

  console.log("Form state:", form.formState.errors);

  return (
    <Form {...form}>
      <form className="pb-8">
        <InformationSection control={form.control} />
        <Separator className="my-6" />
        <ExperienceSection control={form.control} />
        <Separator className="my-6" />
        <ProjectSection control={form.control} />
        <Separator className="my-6" />
        <SkillsSection control={form.control} />
        <Separator className="my-6" />
        <EducationSection control={form.control} />
        <Separator className="my-6" />
        <CertificationSection control={form.control} />
        <Separator className="my-6" />
        <ExtracurricularsSection control={form.control} />
        <Separator className="my-6" />
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Save
        </Button>
      </form>
    </Form>
  );
}

export default ResumeForm;
