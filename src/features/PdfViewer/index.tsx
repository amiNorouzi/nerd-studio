"use client";
import { Document, Page } from "react-pdf";
import "./pdf.worker";

type Props = {
  pdf: File;
};
export default function PdfViewer({ pdf }: Props) {
  return (
    <Document file={pdf} onLoadError={err => console.error(err)}>
      <Page pageNumber={1} />
    </Document>
  );
}
