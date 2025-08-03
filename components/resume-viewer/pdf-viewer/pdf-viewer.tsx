"use client";

import { Resume } from "@/validation/resume";
import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./pdf-document";

export default function PdfResume({ data }: { data: Resume }) {
  return (
    <PDFViewer width="100%" height={900}>
      <PDFDocument data={data} />
    </PDFViewer>
  );
}
