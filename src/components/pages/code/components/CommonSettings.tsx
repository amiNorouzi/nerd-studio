"use client";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { EngineSelect, SelectAndDrawer } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";

//list of engines
//TODO: replace with real engines data from api
const engines = [
  {
    id: "1",
    name: "GPT-3",
    image: "/images/gpt.jpeg",
  },
  {
    id: "2",
    name: "GPT-4",
    image: "/images/gpt.jpeg",
  },
  {
    id: "3",
    name: "Gemni",
    image: "/images/gemni.jpeg",
  },
  {
    id: "4",
    name: "Clouds",
    image: "/images/cloude.png",
  },
];

interface IProps {
  submitButtonTitle: string;
}

const Box = (props: ChildrenProps) => {
  const isHistoryOpen = useHistoryStore.use.isHistoryOpen();
  return (
    <div
      className={cn(
        "col col-span-2 gap-2",
        isHistoryOpen ? "lg:col-span-1" : " sm:col-span-1",
      )}
    >
      {props.children}
    </div>
  );
};

/**
 * common settings for all features of code page
 * contains: want select, output language select, engine select and submit button
 * @param submitButtonTitle - title of submit button
 * @constructor
 */
function CommonSettings({ submitButtonTitle }: IProps) {
  const [activeEngine, setActiveEngine] = useState("1");
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  return (
    <>
      {/*I want select*/}
      <Box>
        <Label>{codeDictionary.want_select_label}</Label>
        <SelectAndDrawer
          value="To Convert + Explanation"
          setValue={() => {}}
          items={["To Convert + Explanation"]}
        />
      </Box>

      {/*output language select*/}
      <Box>
        <Label>{codeDictionary.output_language_select_label}</Label>
        <SelectAndDrawer
          value="English"
          setValue={() => {}}
          items={["English"]}
        />
      </Box>

      {/*engines select*/}
      <div className="col col-span-2 gap-2 sm:col-span-1">
        <Label>{codeDictionary.engine_select_label}</Label>
        <EngineSelect
          value={activeEngine}
          setValue={setActiveEngine}
          engines={engines}
        />
      </div>

      {/*submit button*/}
      <Button className="col-span-2 mt-auto sm:col-span-1">
        {submitButtonTitle}
      </Button>
    </>
  );
}

export default CommonSettings;
