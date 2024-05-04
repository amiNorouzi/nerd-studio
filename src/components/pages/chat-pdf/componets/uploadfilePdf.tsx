import PdfUploadSection from "./pdf-upload-section";

export default function UploadFilePdf() {
  return (
    <div>
      <div className="px-[143px] py-[48px]">
        <PdfUploadSection />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className=" text-5xl font-bold">
          Chat with any
          <span className=" ml-2 inline-block w-fit -rotate-[2deg] bg-[#9373EE] px-2 py-3 text-white">
            <p className="rotate-[2deg] text-5xl font-bold"> PDF document!</p>
          </span>
        </div>
        <p className=" mx-[15%] w-auto text-center text-xl font-medium text-[#747474]">
          We, at ChatPDF.guru, have revolutionized the way you interact with
          your PDF documents forever. This will save you time, boost
          productivity, and enhance your learning and reading speed.
        </p>
      </div>
    </div>
  );
}
