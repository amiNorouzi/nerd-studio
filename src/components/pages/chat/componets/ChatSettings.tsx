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
import { EngineSelect } from "@/components/shared";

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

  return (
    <div className="spacing-row w-full items-end py-1.5">
      {/*engine select*/}
      <EngineSelect
        value={activeEngineId}
        setValue={setActiveEngineId}
        engines={engines}
        triggerClassName="w-48 h-7"
        contentWidth={192}
      />
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
