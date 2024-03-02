import React, { useCallback, MouseEvent, useState } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { PiPaintBrushLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import RenderIf from "@/components/shared/RenderIf";
import DrawMaskDialog from "./DrawMaskDialog";
import ImageAction from "./ImageAction";
import { Button } from "@/components/ui/button";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

/**
 * drop zone upload component
 * used in image to image. masking and upscale for upload init image
 * @constructor
 */
function UploadZone() {
  const {
    common: { delete_label },
    page: { image: imageDictionary },
  } = useGetDictionary();
  const [uploadedImage, setUploadedImage] = useState("");
  const [maskImage, setMaskImage] = useState("");
  const [openMaskDialog, setOpenMaskDialog] = useState(false);
  const [searchParams] = useCustomSearchParams();

  const currentTab = searchParams.get("feature") || "text-to-image";

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const image = reader.result as string;
        setUploadedImage(image);
        setMaskImage("");
        // const info = await getImageInfo(file, image)
        // const imageData = {
        //     image,
        //     info
        // }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".webp", ".jpg"],
    },
  });

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    open();
  };

  if (currentTab === "text-to-image") return null;

  return (
    <>
      <div
        {...getRootProps()}
        className="mb-2 flex h-[160px] w-full gap-2 rounded-xl border
         bg-background p-2 transition-all duration-300 hover:bg-hover lg:mb-3 xl:mb-5"
      >
        <RenderIf isTrue={uploadedImage !== ""}>
          <div className="col relative h-full w-fit gap-1">
            <div className=" relative h-full w-fit">
              <Image
                src={uploadedImage}
                alt="upload"
                width={100}
                height={100}
                className="h-full w-36 rounded-lg object-cover"
              />
              <RenderIf isTrue={maskImage !== ""}>
                <div className="fit group absolute end-0.5 top-0.5 z-20 rounded-md bg-muted-dark/80 p-1">
                  <PiPaintBrushLight size="1rem" />
                  <Button
                    variant="ghost"
                    className="fit absolute inset-0 p-1 opacity-0 transition-all duration-100 hover:bg-transparent group-hover:opacity-100"
                    onClick={e => {
                      e.stopPropagation();
                      setMaskImage("");
                    }}
                  >
                    <IoCloseSharp size="1rem" className="text-destructive" />
                  </Button>
                </div>
              </RenderIf>
              <div className="absolute inset-0 z-10 flex items-end justify-end bg-transparent p-1 lg:bg-[#00000050] lg:opacity-0 lg:hover:opacity-100">
                <ImageAction
                  title={delete_label}
                  Icon={MdDeleteOutline}
                  iconClassname="text-destructive"
                  className="!h-7 !w-7 p-1"
                  onClick={e => {
                    e.stopPropagation();
                    setUploadedImage("");
                  }}
                />
              </div>
            </div>
            <RenderIf isTrue={currentTab === "image-to-image"}>
              <Button
                size="sm"
                className="row w-full gap-1 text-xs font-normal"
                onClick={e => {
                  e.stopPropagation();
                  setOpenMaskDialog(!openMaskDialog);
                }}
              >
                <PiPaintBrushLight size="0.9rem" />
                {imageDictionary.draw_mask_button_label}
              </Button>
            </RenderIf>
          </div>
        </RenderIf>
        <div className="centered-col h-full w-full cursor-pointer">
          <input {...getInputProps()} onClick={e => e.stopPropagation()} />
          <div className="col items-center gap-3">
            <FiUpload className="h-10 w-10 text-muted-foreground-light" />
            <p className="text-center">{imageDictionary.upload_zone_message}</p>
            <p className="text-center text-xs font-normal text-muted-foreground">
              {imageDictionary.max_upload_size_message}
            </p>
          </div>
        </div>
      </div>
      <DrawMaskDialog
        open={openMaskDialog}
        setOpen={setOpenMaskDialog}
        maskImage={maskImage}
        setMaskImage={setMaskImage}
        imageSrc={uploadedImage}
        canvasDimensions={{ width: 500, height: 500 }}
      />
    </>
  );
}

export default UploadZone;
