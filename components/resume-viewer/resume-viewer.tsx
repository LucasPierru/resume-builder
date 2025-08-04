"use client";

import { useState } from "react";
import { Resume } from "@/validation/resume";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { pdf } from "@react-pdf/renderer";
import PDFDocument from "./pdf-viewer/pdf-document";

const PDFViewer = dynamic(() => import("./pdf-viewer/pdf-viewer"), {
  ssr: false,
});

export default function ResumeViewer({ data }: { data: Resume }) {
  const [showPreview, setShowPreview] = useState(false);

  const handleTogglePreview = () => {
    setShowPreview((prev) => !prev);
  };

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument data={data} />).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}_resume.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full my-4">
      <Button className="mb-4" variant="outline" onClick={handleTogglePreview}>
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <br />
      {showPreview && (
        <Button className="mb-4" onClick={handleDownload}>
          Download as PDF
        </Button>
      )}
      {showPreview && <PDFViewer data={data} />}
    </div>
  );
}
