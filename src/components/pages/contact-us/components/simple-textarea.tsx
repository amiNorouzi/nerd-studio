"use client";
import { useState } from "react";

const SimpleTextArea = ({
  maxLength,
  placeholder,
  labale,
  ...props
}: {
  placeholder: string;
  maxLength: number;
  labale: string;
}) => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className=" text-[#181818 ] w-full space-y-2 font-semibold">
        <h1 className=" text-base ">{labale}</h1>
        <textarea
          className="mb-0 w-full rounded-xl border bg-muted py-16 pl-3 pr-16 pt-2 outline-none ring-0 first-line:pl-4 focus:border-primary focus:bg-background"
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={e => setValue(e.target.value)}
          {...props}
        />
        <span className="mt-0.5 ps-1 text-muted-foreground">
          {value?.toString().length}/{maxLength}
        </span>
      </div>
    </>
  );
};

export default SimpleTextArea;
