"use client";
import { useState } from "react";
import Image from "next/image";

import { FaFileImage } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useGetDictionary } from "@/hooks";

import { generatedImages } from "@/constants/generated-images";

/**
 * section with generated images
 * @constructor
 */
export function ImagesSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const initSelected = {
    id: "0",
    prompt: "",
    title: "",
    image: "/images/generateds/1.webp",
  };
  // for showing selected image details in dialog
  const [selectedImage, setSelectedImage] = useState(initSelected);

  // close dialog when clicked outside by setting selected image to initial state
  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setSelectedImage(initSelected);
    }
  };

  return (
    <section className="col gap-1 rounded-lg border bg-background p-4 shadow-sm">
      {/*title*/}
      <h2 className="row gap-1.5">
        <FaFileImage size="1.2rem" className="text-primary" />
        {dashboardDictionary.generated_images_title}
      </h2>
      {/*description*/}
      <p className="mb-4 text-muted-foreground">
        {dashboardDictionary.generated_images_description}
      </p>

      {/*image gallery wrapper for limit size*/}
      <div className="relative mx-auto my-4 h-[50rem] w-full max-w-7xl overflow-hidden px-4 transition-all delay-300">
        {/*image gallery*/}
        <div className="relative columns-2 gap-2 md:columns-4">
          {generatedImages.map(item => (
            <div
              onClick={() => setSelectedImage(item as typeof initSelected)}
              key={item.id}
              className=" group relative mb-2 inline-block cursor-pointer overflow-hidden rounded-lg shadow-none transition-shadow ease-in-out hover:shadow-xl"
            >
              <Image
                src={`/images/generateds/${item.image}`}
                alt={item.title}
                height={500}
                width={500}
                className="h-auto w-full object-contain"
              />

              <div className="absolute left-0 top-full flex h-full w-full items-end bg-gradient-to-b from-zinc-800/5 to-zinc-800/80 p-3 text-sm text-white transition-all group-hover:top-0">
                <p className="line-clamp-3 whitespace-pre-line break-words text-base font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="centered-col pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[150px] bg-gradient-to-t from-black to-transparent dark:from-gray-900">
          <Button className="mt-14">
            {dashboardDictionary.show_more_images_button_label}
          </Button>
        </div>
      </div>
      {/*
          image details dialog
          open dialog when selected image id is not initial state (have valid id)
        */}
      <Dialog onOpenChange={handleOpenChange} open={selectedImage.id !== "0"}>
        <DialogContent
          className="flex h-[100dvh] max-h-[100dvh] !w-full max-w-[100vw] flex-col gap-4
           overflow-y-auto bg-popover p-5 pt-10 md:h-auto md:max-w-2xl md:flex-row"
        >
          <Image
            src={`/images/generateds/${selectedImage.image}`}
            alt={selectedImage.prompt}
            width={300}
            height={300}
            className="rounded-md object-contain"
          />
          <div className="col flex-grow">
            {/*title that saved in history*/}
            <h1 className="mb-4 text-base font-bold">{selectedImage.title}</h1>
            {/*prompt that generate image*/}
            <p className="mb-1">{dashboardDictionary.prompt_title}:</p>
            <p className="min-w-md max-w-lg rounded-lg border bg-muted p-2 text-muted-foreground">
              {selectedImage.prompt}
            </p>
            {/*try it button for generate a new image with this prompt*/}
            <Button className="ms-auto mt-auto w-fit px-5">
              {dashboardDictionary.try_button_label}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
