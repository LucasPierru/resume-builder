"use client";

import { Resume } from "@/validation/resume";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./pdf-document";
import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/types/types";

export default function PdfResume({ data }: { data: Resume }) {
  const t = useTranslations("Resume");
  const locale = useLocale();

  return (
    <PDFViewer width="100%" height={900}>
      <PDFDocument data={data} t={t} locale={locale as Locale} />
    </PDFViewer>
  );
}
