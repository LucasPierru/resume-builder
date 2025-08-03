// types/html2pdf.d.ts
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: object;
    jsPDF?: { unit: string; format: string | number[]; orientation: string };
  }

  interface Html2Pdf {
    set: (options: Html2PdfOptions) => Html2Pdf;
    from: (element: HTMLElement | string) => Html2Pdf;
    save: () => void;
    outputPdf?: () => Promise<Blob>;
  }

  const html2pdf: () => Html2Pdf;

  export default html2pdf;
}
