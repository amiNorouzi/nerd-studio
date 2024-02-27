"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import { MyTooltip } from "@/components/shared/myTooltip";
import { PiShareNetwork } from "react-icons/pi";
import { RiChatNewFill } from "react-icons/ri";

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
    id: "2",
    name: "Clouds",
    image: "/images/cloude.png",
  },
] as const;

/**
 * Chat settings component used in chat page
 * contains a select input for engines and new chat button
 * @constructor
 */
export function ChatSettings() {
  const {
    page: { chat: chatDictionary },
  } = useGetDictionary();
  //user selected engine id
  const [activeEngineId, setActiveEngineId] = useState<string>(engines[0].id);

  //get active engine by activeEngineId
  const activeEngine = engines.find(engine => engine.id === activeEngineId);

  return (
    <div className="spacing-row w-full items-end py-1.5">
      {/*engine select*/}
      <Select onValueChange={value => setActiveEngineId(value)}>
        <SelectTrigger className="borde r h-7 w-48">
          <div className="row gap-2">
            <Image
              src={activeEngine!.image}
              alt={activeEngine!.name}
              className="me-2 h-5 w-5 rounded-full"
              width={30}
              height={30}
            />
            {activeEngine!.name}
          </div>
        </SelectTrigger>
        <SelectContent>
          {engines.map(engine => (
            <SelectItem
              key={engine.id}
              value={engine.id}
              onClick={() => setActiveEngineId(engine.id)}
              className={cn(
                "hide-svg px-2 py-1.5",
                activeEngineId === engine.id && "bg-active text-primary",
              )}
            >
              <div className="row gap-2">
                <Image
                  src={engine.image}
                  alt={engine.name}
                  className="me-2 h-5 w-5 rounded-full"
                  width={30}
                  height={30}
                />
                {engine.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <MyTooltip title={chatDictionary.share_button_label}>
          <Button variant="ghost" className="h-fit w-fit p-1">
            <PiShareNetwork className=" h-4 w-4" />
            {/*{chatDictionary.new_chat_button_label}*/}
          </Button>
        </MyTooltip>
        <MyTooltip title={chatDictionary.new_chat_button_label}>
          <Button variant="ghost" className="h-fit w-fit p-0">
            <RiChatNewFill className=" h-6 w-6 text-primary" />
            {/*{chatDictionary.new_chat_button_label}*/}
          </Button>
        </MyTooltip>
      </div>
    </div>
  );
}
