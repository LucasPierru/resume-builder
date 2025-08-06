"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Resume, resumeSchema } from "@/validation/resume";
import InformationSection from "./information-section/information-section";
import ExperienceSection from "./experience-section/experience-section";
import ProjectSection from "./project-section/project-section";
import SkillsSection from "./skills-section/skills-section";
import EducationSection from "./education-section/education-section";
import CertificationSection from "./certifications-section/certification-section";
import ExtracurricularsSection from "./extracurriculars-section/extracurriculars-section";
import { Separator } from "../ui/separator";
import { updateResume } from "@/requests/resume";

function ResumeForm({ defaultValues }: { defaultValues: Resume }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
  });

  const { reset } = form;

  const onSubmit = async (data: Resume) => {
    setIsLoading(true);
    const resume = await updateResume(data);
    setIsLoading(false);
    if (!resume) {
      toast.error("Failed to update your resume");
      return;
    }
    toast.success("Your resume has been updated");
    router.refresh();
  };

  useEffect(() => {
    reset(defaultValues); // 👈 Reset form when defaultValues changes
  }, [defaultValues, reset]);

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
          {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}

export default ResumeForm;
