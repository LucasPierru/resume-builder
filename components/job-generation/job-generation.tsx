"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { jobGenerationSchema, JobGeneration } from "@/validation/jobs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { CircleAlertIcon } from "lucide-react";
import { Resume } from "@/validation/resume";
import { calculateATSScore } from "@/actions/ats";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

function JobGenerationForm({ balance, resume }: { balance: number; resume: Resume | null }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<JobGeneration>({
    resolver: zodResolver(jobGenerationSchema),
    defaultValues: {
      content: "",
    },
  });
  const t = useTranslations("Generation");

  const parseResume = async (jobDescription: string, baseResume: string) => {
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
      return;
    }
    toast.success(t("resume-generated"));
    setIsLoading(false);
    router.refresh();
    return res.json();
  };

  const onSubmit = async (data: JobGeneration) => {
    const { updatedResume } = await parseResume(data.content, resume ? JSON.stringify(resume) : "");
    const results = await calculateATSScore({
      jobDescription: data.content,
      resume: updatedResume || ({} as Resume),
    });
    console.log("Form submitted with data:", data, results);
  };

  const lowCreditsBalance = 5000; // Define your low credits balance threshold

  return (
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
            {balance <= lowCreditsBalance && <CircleAlertIcon className="text-destructive dark:text-destructive/60" />}
            <span className={`${balance <= lowCreditsBalance ? "text-destructive dark:text-destructive/60" : ""}`}>
              {new Intl.NumberFormat("en-US", { style: "decimal" }).format(balance)} {t("credits-remaining")}
            </span>
          </div>
          <span>
            {form.watch("content").length} {t("characters")}
          </span>
        </div>
        <Button className="mt-2 ml-auto" type="submit">
          {t("generate-resume")}
        </Button>
      </form>
    </Form>
  );
}

export default JobGenerationForm;
