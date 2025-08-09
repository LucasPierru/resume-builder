"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { jobGenerationSchema, JobGeneration } from "@/validation/jobs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { CircleAlertIcon, LoaderCircleIcon } from "lucide-react";
import { Resume } from "@/validation/resume";
//import { calculateATSScore } from "@/actions/ats";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import ResumeForm from "../resume-form/resume-form";

function JobGenerationForm({ balance, resume }: { balance: number; resume: Resume | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<Resume | null>(null);
  const [improvements, setImprovements] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<JobGeneration>({
    resolver: zodResolver(jobGenerationSchema),
    defaultValues: {
      content: "",
    },
  });
  const t = useTranslations("Generation");

  const parseResume = async (
    jobDescription: string,
    baseResume: string
  ): Promise<{ data: (Resume & { improvements: string[] }) | null; error: string | null }> => {
    setIsLoading(true);

    const res = await fetch("/api/adapt-resume", {
      method: "POST",
      body: JSON.stringify({ jobDescription, baseResume }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast.error(t("resume-generation-failed"));
      setIsLoading(false);
      return { data: null, error: "Failed to generate resume." };
    }
    toast.success(t("resume-generated"));
    setIsLoading(false);
    router.refresh();
    const data: { updatedResume: Resume & { improvements: string[] } } = await res.json();
    const { updatedResume } = data;

    return { data: updatedResume, error: null };
  };

  const onSubmit = async (data: JobGeneration) => {
    const { data: updatedResume } = await parseResume(data.content, resume ? JSON.stringify(resume) : "");
    console.log("Updated resume:", updatedResume);
    setImprovements(updatedResume?.improvements || []);
    setGeneratedResume(updatedResume);
    /* const results = await calculateATSScore({
      jobDescription: data.content,
      resume: updatedResume || ({} as Resume),
    }); */
  };

  const lowCreditsBalance = 5000; // Define your low credits balance threshold

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name={`content`}
            render={({ field }) => (
              <FormItem className="gap-2">
                <FormControl>
                  <Textarea placeholder={t("job-description-placeholder")} className="h-52" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-2">
              {balance <= lowCreditsBalance && (
                <CircleAlertIcon className="text-destructive dark:text-destructive/60" />
              )}
              <span className={`${balance <= lowCreditsBalance ? "text-destructive dark:text-destructive/60" : ""}`}>
                {new Intl.NumberFormat("en-US", { style: "decimal" }).format(balance)} {t("credits-remaining")}
              </span>
            </div>
            <span>
              {form.watch("content").length} {t("characters")}
            </span>
          </div>
          <Button disabled={isLoading} className="mt-2 ml-auto" type="submit">
            {isLoading ? <LoaderCircleIcon className="animate-spin" /> : t("generate-resume")}
          </Button>
        </form>
      </Form>
      {improvements.length > 0 && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold mb-2">{t("improvements")}</h3>
          <ul>
            {improvements.map((improvement, index) => (
              <li className="list-disc text-lg ml-6" key={index}>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}
      {generatedResume && <ResumeForm defaultValues={generatedResume} canSubmit={false} />}
    </div>
  );
}

export default JobGenerationForm;
