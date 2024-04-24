"use client ";

import PdfView from "./utility/pdfView";

const EditPagePdf = () => {


  return (
    <div className=" flex w-full  grid-flow-row grid-cols-2 flex-nowrap gap-0">
      <PdfView />
      <div className=" flex h-full  flex-1 items-center justify-center overflow-y-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
        consectetur?
      </div>
    </div>
  );
};

export default EditPagePdf;
