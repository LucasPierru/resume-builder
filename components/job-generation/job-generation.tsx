"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { jobGenerationSchema, JobGeneration } from "@/validation/jobs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { CircleAlertIcon } from "lucide-react";

function JobGenerationForm({ balance }: { balance: number }) {
  const form = useForm<JobGeneration>({
    resolver: zodResolver(jobGenerationSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: JobGeneration) => {
    console.log("Form submitted with data:", data);
  };

  const lowCreditsBalance = 5000; // Define your low credits balance threshold

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <FormField
          control={form.control}
          name={`content`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Textarea placeholder="Paste your job description here" className="h-52" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
            {balance <= lowCreditsBalance && <CircleAlertIcon className="text-destructive dark:text-destructive/60" />}
            <span className={`${balance <= lowCreditsBalance ? "text-destructive dark:text-destructive/60" : ""}`}>
              {new Intl.NumberFormat("en-US", { style: "decimal" }).format(balance)} credits remaining
            </span>
          </div>
          <span>{form.watch("content").length} characters</span>
        </div>
        <Button className="mt-2 ml-auto" type="submit">
          Generate Resume
        </Button>
      </form>
    </Form>
  );
}

export default JobGenerationForm;
