"use client";
import { useState } from "react";

import { BsDownload } from "react-icons/bs";
import { TbDownload } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsivePopover } from "@/components/shared";
import ImageAction from "./ImageAction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { downloadImage } from "../utils";

import { useGetDictionary } from "@/hooks";

type EXT = "png" | "webp" | "jpg" | "pdf";

/**
 * for download image with target ext and name
 * @param image image want to download
 * @constructor
 */
const ImageDownloader = ({ image }: { image: string }) => {
  const {
    common: { download },
    page: { image: imageDictionary },
  } = useGetDictionary();
  //save ext
  const [format, setFormat] = useState<EXT>("png");
  const [fileName, setFileName] = useState(""); //save and download filename

  const handleDownload = async () => {
    await downloadImage(fileName || "download", image, format); //convert to blob and download with file saver whit given ext
  };

  return (
    <ResponsivePopover
      trigger={
        <div>
          <ImageAction title={download} Icon={TbDownload} />
        </div>
      }
      drawerContentProps={{
        className: "p-5",
      }}
    >
      {/*select ext for download*/}
      <div className="col gap-2">
        <Label htmlFor="format">{imageDictionary.download_ext_label}</Label>
        <Select onValueChange={val => setFormat(val as EXT)}>
          <SelectTrigger id="format" className="h-8 w-full focus:ring-0">
            <SelectValue placeholder="PNG" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="jpg">JPG</SelectItem>
            <SelectItem value="webp">WEBP</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        <p className="pl-2 text-xs font-normal text-muted-foreground-light">
          {imageDictionary.download_ext_description}
        </p>

        {/*input for filename*/}
        <Input
          placeholder={imageDictionary.download_input_placeholder}
          value={fileName}
          onChange={event => setFileName(event.target.value)}
          className=" my-2 w-full"
        />

        {/*download button*/}
        <Button
          className="mt-2 h-fit w-full gap-2 px-3 py-2 text-xs"
          onClick={handleDownload}
        >
          <BsDownload size=".8rem" />
          {download}
        </Button>
      </div>
    </ResponsivePopover>
  );
};

export default ImageDownloader;
