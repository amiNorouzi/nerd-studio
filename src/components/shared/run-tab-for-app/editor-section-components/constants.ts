import { FaRegCopy } from "react-icons/fa6";
import { FaHtml5, FaRegFilePdf } from "react-icons/fa";
import { BsFiletypeDocx } from "react-icons/bs";
import { copyOperation } from "@/lib/copy-operation";
import { GrCopy } from "react-icons/gr";
import { copyTextToClipboard } from "@/lib/copyTextToSystemClipboard";
export const characterValueItems = [
  "editor_footer_total_word",
  "editor_footer_total_char",
  "editor_footer_total_sentence",
  "editor_footer_total_token",
] as const;

export const value = ["all work space", "my work space", "second work space"];

export const downloadDropdownItems = [
  {
    title: "editor_header_copy_text_without_style",
    Icon: FaRegCopy,
    action: async (text?: string) => await copyOperation({ text }),
    type: "copy",
  },
  {
    title: "editor_header_copy_text_with_style",
    Icon: GrCopy,
    action: async (text?: string) =>
      await copyOperation({ text, styleMode: true }),
    type: "copy",
  },
  {
    title: "editor_header_copy_html",
    Icon: FaHtml5,
    action: async (text?: string) => await copyTextToClipboard(text),
    type: "copy",
  },
  {
    title: "editor_header_down_pdf",
    Icon: FaRegFilePdf,
    action: () => {},
    type: "download",
    download: "pdf",
  },
  {
    title: "editor_header_down_word",
    Icon: BsFiletypeDocx,
    action: () => {},
    type: "download",
    download: "doc",
  },
] as const;
