"use client";

import { use, useState } from "react";
import { CircleAlertIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ResumeParser({ balance }: { balance: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [rawText, setRawText] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    setIsLoading(true);
    formData.append("file", file);

    const res = await fetch("/api/parse-resume", {
      method: "POST",
      body: formData,
    });

    const { rawText } = await res.json();
    setRawText(rawText);
    setIsLoading(false);
  };

  const parseResume = async () => {
    if (!rawText) return;
    setIsParsing(true);

    const res = await fetch("/api/resume-form", {
      method: "POST",
      body: JSON.stringify({ rawText }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { resume, error } = await res.json();
    if (error) {
      // Handle error
      console.error("Error parsing resume:", error);
    }
    setRawText(null);
    setIsParsing(false);
    router.refresh();
  };

  const lowCreditsBalance = 5000;

  return (
    <div className="my-4 flex gap-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <label
          htmlFor="resume-upload"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
          {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Upload Resume (PDF)"}
        </label>
        <input id="resume-upload" type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
        <Button onClick={parseResume} disabled={!rawText || isLoading}>
          {isParsing ? <LoaderCircleIcon className="animate-spin" /> : "Parse Resume"}
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {rawText && <span className="text-foreground">{rawText.length} credits needed&nbsp;&nbsp;-</span>}
        {balance <= lowCreditsBalance && <CircleAlertIcon className="text-destructive dark:text-destructive/60" />}
        <span className={`${balance <= lowCreditsBalance ? "text-destructive dark:text-destructive/60" : ""}`}>
          {new Intl.NumberFormat("en-US", { style: "decimal" }).format(balance)} credits remaining
        </span>
      </div>
    </div>
  );
}
