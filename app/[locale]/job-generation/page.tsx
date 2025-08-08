import JobGenerationForm from "@/components/job-generation/job-generation";
import { getCurrentUser } from "@/requests/user";
import { Resume } from "@/validation/resume";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

async function JobGenerationPage() {
  const t = await getTranslations("Generation");
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="max-w-5xl mx-auto h-full pt-18 pb-4 px-4">
      <h1 className="text-foreground font-semibold text-4xl mb-4">{t("job-description")}</h1>
      <JobGenerationForm
        balance={currentUser.balance}
        resume={
          currentUser.resumes && currentUser.resumes[0].data
            ? (JSON.parse(currentUser.resumes[0].data as string) as Resume)
            : null
        }
      />
    </div>
  );
}

export default JobGenerationPage;
