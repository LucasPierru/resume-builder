import JobGenerationForm from "@/components/job-generation/job-generation";
import { getCurrentUser } from "@/requests/user";
import { Resume } from "@/validation/resume";
import { redirect } from "next/navigation";
import React from "react";

async function JobGenerationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="max-w-5xl mx-auto h-full pt-18 pb-4 px-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">Job Generation</h1>
      <JobGenerationForm
        balance={currentUser.balance}
        resume={
          currentUser.baseResume && currentUser.baseResume.data
            ? (JSON.parse(currentUser.baseResume.data as string) as Resume)
            : null
        }
      />
    </div>
  );
}

export default JobGenerationPage;
