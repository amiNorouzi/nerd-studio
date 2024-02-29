"use client";
import { useState } from "react";
import Image from "next/image";

import { RiChatNewFill } from "react-icons/ri";
import { PiShareNetwork } from "react-icons/pi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuSettings2 } from "react-icons/lu";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActionButton from "./ActionButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useGetDictionary } from "@/hooks";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";
import { statuses } from "@/components/shared/run-tab-for-app/form-section-components/contants";

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
      <div className="row h-7 rounded-lg border bg-muted px-1">
        <Popover>
          <PopoverTrigger asChild>
            <div className="row">
              <ActionButton
                title={chatDictionary.chat_settings_button_label}
                Icon={LuSettings2}
              />
              <div className="opacity-0" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="col w-60" side="top" sideOffset={8}>
            <p className="mb-5 text-sm font-bold">
              {chatDictionary.chat_settings_button_label}
            </p>
            <div className="row mb-5 gap-2">
              <HiOutlineSpeakerWave size="1rem" />
              <Label htmlFor="voice-switch">
                {chatDictionary.voice_switch_label}
              </Label>
              <Switch id="voice-switch" className="ms-auto" />
            </div>

            <Label htmlFor="respond-language" className="mb-2">
              {chatDictionary.respond_language_label}
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Auto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Language</SelectLabel>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>

        <ActionButton
          title={chatDictionary.share_button_label}
          Icon={PiShareNetwork}
        />
        <ActionButton
          title={chatDictionary.new_chat_button_label}
          Icon={RiChatNewFill}
          iconClassname="text-primary"
        />
      </div>
    </div>
  );
}
