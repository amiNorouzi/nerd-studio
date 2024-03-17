import React, { useCallback, useState } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { PiPaintBrushLight } from "react-icons/pi";
import { IoCloseSharp } from "react-icons/io5";

import RenderIf from "@/components/shared/RenderIf";
import DrawMaskDialog from "./DrawMaskDialog";
import ImageAction from "./ImageAction";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";
import { FaRegTrashCan } from "react-icons/fa6";

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

  const { currentTab } = useImageTabs();

  /**
   * onDrop for drop zone
   */
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

  function sizeValidation(file: File) {
    if (file.size > 5000000) {
      return {
        code: "file is too big",
        message: "File size is more than 5MB",
      };
    }
    return null;
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".webp", ".jpg"],
    },
    validator: sizeValidation,
  });

  //if text to image tab is selected, don't show the upload zone
  if (currentTab === "text-to-image") return null;

  return (
    <>
      <div
        {...getRootProps()}
        className="mb-2 flex h-[160px] w-full gap-2 rounded-xl border
         bg-background p-2 transition-all duration-300 hover:bg-hover lg:mb-3 xl:mb-5"
      >
        {/*
            thumbnail of the uploaded image
            render if uploadedImage is not empty
        */}
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
              {/*
                  show user that mask drawn on the image
                  render if maskImage is not empty
              */}
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
                {/*delete image button*/}
                <ImageAction
                  title={delete_label}
                  Icon={FaRegTrashCan}
                  iconClassname="text-destructive"
                  className="!h-7 !w-7 p-2"
                  onClick={e => {
                    e.stopPropagation();
                    setUploadedImage("");
                  }}
                />
              </div>
            </div>
            {/*
                draw mask button
                render if currentTab is image-to-image
            */}
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
      {/*
      draw mask dialog
      */}
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
