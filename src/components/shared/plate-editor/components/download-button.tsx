import React from "react";
import { cn } from "@udecode/cn";
import { IoMdCloudDownload } from "react-icons/io";

import { Icons } from "@/components/icons";
import { Button } from "@/components/plate-ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/plate-ui/dropdown-menu";
import MyTooltip from "@/components/shared/myTooltip";

interface IProps {
  handleDownloadPdf: () => void;
  handleDownloadDocx: () => void;
}

export function DownloadDropDown({
  handleDownloadDocx,
  handleDownloadPdf,
}: IProps) {
  return (
    <DropdownMenu>
      <MyTooltip title="Download" responseTab>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <IoMdCloudDownload size={15} />
          </Button>
        </DropdownMenuTrigger>
      </MyTooltip>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleDownloadPdf}>
            Download Pdf
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownloadDocx}>
            Download Docx
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
