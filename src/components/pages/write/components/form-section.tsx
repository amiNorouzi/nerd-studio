import * as React from "react";
import { FaPen } from "react-icons/fa6";
import { FaBoltLightning } from "react-icons/fa6";

import { SelectResponseLang } from "./form-section-components";

export function FormSection() {
  return (
    <div className="col-span-12 flex h-full flex-col gap-4 rounded border bg-card p-5 shadow lg:col-span-6 xl:col-span-4">
      <div className="flex items-center justify-start gap-3">
        <span className="rounded bg-gray-300 p-2">
          <FaPen size={20} />
        </span>
        <h6 className="text-base font-bold">AI ReWriter</h6>
      </div>
      <p className="text-xs text-gray-500">
        Rewrite and improve your content with the help of AI in just a second
      </p>
      <div className=" rounded bg-muted p-3">
        <span className="ms-2 flex flex-row gap-2 ps-3 text-xs text-gray-500">
          <FaBoltLightning color="blue" />
          Your Balance is
          <span className="font-semibold">9958</span>
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h6 className="text-xs font-semibold">Language</h6>
        <SelectResponseLang />
      </div>
    </div>
  );
}
