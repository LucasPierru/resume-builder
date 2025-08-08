"use client";

import { useState } from "react";
import { Resume } from "@/validation/resume";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { pdf } from "@react-pdf/renderer";
import PDFDocument from "./pdf-viewer/pdf-document";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types/types";

const PDFViewer = dynamic(() => import("./pdf-viewer/pdf-viewer"), {
  ssr: false,
});

export default function ResumeViewer({ data }: { data: Resume }) {
  const [showPreview, setShowPreview] = useState(false);
  const t = useTranslations("Resume");
  const locale = useLocale() as Locale;

  const handleTogglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument data={data} t={t} locale={locale} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}_resume.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full my-4">
      <Button type="button" className="mb-4" variant="outline" onClick={handleTogglePreview}>
        {showPreview ? t("hide-preview") : t("show-preview")}
      </Button>
      <br />
      {showPreview && (
        <Button type="button" className="mb-4" onClick={handleDownload}>
          {t("download-pdf")}
        </Button>
      )}
      {showPreview && <PDFViewer data={data} />}
    </div>
  );
}
