import JobGeneration from "@/components/job-generation/job-generation";
import React from "react";

function JobGenerationPage() {
  return (
    <div className="max-w-7xl mx-auto h-full mt-14 p-4">
      <h1 className="text-foreground font-semibold text-2xl mb-4">Job Generation</h1>
      <JobGeneration />
    </div>
  );
}

export default JobGenerationPage;
