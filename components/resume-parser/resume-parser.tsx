"use client";

import { useState } from "react";
import { Resume } from "@/validation/resume";
import { LoaderCircleIcon } from "lucide-react";

export default function ResumeParser({ onParse }: { onParse?: (data: Resume) => void }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-resume", {
      method: "POST",
      body: formData,
    });

    const parsed = await res.json();
    // onParse(parsed); // send back to fill form
    setLoading(false);
  };

  return (
    <div className="my-4">
      <label
        htmlFor="resume-upload"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
        {loading ? <LoaderCircleIcon className="animate-spin" /> : "Upload Resume (PDF)"}
      </label>
      <input id="resume-upload" type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
    </div>
  );
}
