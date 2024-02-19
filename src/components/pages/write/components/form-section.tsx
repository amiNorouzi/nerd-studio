"use client";
import * as React from "react";

import { Label } from "@/components/ui/label";
import { SelectResponseLang } from "./form-section-components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "@/components/svg-icons";

export function FormSection() {
  return (
    <div className="col-span-12 flex h-full flex-col gap-5   bg-card p-4  lg:col-span-6 xl:col-span-3">
      <p className="text-xsm">
        Write and improve your content with the help of AI in just a second
      </p>

      <div className="flex flex-col gap-2">
        <h6 className="text-xsm font-semibold">Language</h6>
        <SelectResponseLang />
      </div>

      <TextBox />
      <SelectBoxes />
      <SubmitButton />
    </div>
  );
}

export function TextBox() {
  return (
    <div className="mt-1 grid gap-2">
      <Label htmlFor="textbox" className="text-xsm font-semibold">
        Target Text
      </Label>
      <textarea
        name="userTextBox"
        id="textbox"
        rows={10}
        className="rounded-lg border p-2 outline-none ring-0"
      />
    </div>
  );
}

const selectValues = {
  Creativity: [
    "Original",
    "Repetitive",
    "Deterministic",
    "Creative",
    "Imaginative",
  ],
  "Tone of Voice": [
    "Professional",
    "Exciting",
    "Friendly",
    "Witty",
    "Humorous",
    "Convincing",
    "Empathetic",
    "Inspiring",
    "Supportive",
    "Trusting",
    "Playful",
    "Excited",
    "Positive",
    "Negative",
    "Engaging",
    "Worried",
    "Urgent",
    "Passionate",
    "Informative",
    "Funny",
    "Casual",
    "Sarcastic",
    "Dramatic",
  ],
  "Point of view": ["Default", "First Person", "Second Person", "Third Person"],
} as const;

export function SelectBoxes() {
  return (
    <div className="grid grid-cols-4 items-start gap-x-5 gap-y-3">
      {Object.entries(selectValues).map(([key, value]) => (
        <div key={key} className="col-span-4 flex flex-col gap-2 sm:col-span-2">
          <span className="text-xsm m-0 font-semibold">{key}</span>
          <Select
            defaultValue={value[0]}
            onValueChange={value => console.log(value)}
          >
            <SelectTrigger className="m-0 w-full">
              <SelectValue placeholder="Select a fruit" className="text-xsm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xsm font-semibold">
                  {key}
                </SelectLabel>
                {value.map(item => (
                  <SelectItem key={item} value={item} className="text-xsm">
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
      <div className="col-span-4 mt-1 flex flex-col gap-3 sm:col-span-2">
        <Label htmlFor="numOfResult" className="text-xsm font-semibold">
          Number of Results
        </Label>
        <Input
          type="number"
          id="numOfResult"
          defaultValue={1}
          min={1}
          className="h-[40px]"
        />
      </div>
    </div>
  );
}

export function SubmitButton() {
  return (
    <Button className="bg-linearGradient h-[50px] w-full gap-2">
      <Pen /> Rewrite
    </Button>
  );
}
