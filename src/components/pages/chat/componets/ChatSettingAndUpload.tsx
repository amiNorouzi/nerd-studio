"use client";
import React, { useState } from "react";
import { SelectEngine, UploadZone } from "@/components/shared";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChatTools } from "@/components/pages/chat/componets/ChatTools";
import { useGetDictionary } from "@/hooks";
import { useChatStore } from "@/stores/zustand/chat-store";

export function ChatSettingAndUpload() {
  const files = useChatStore.use.files();
  const addFiles = useChatStore.use.addFiles();
  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <div className="col w-full items-center gap-3">
      <span className="text-center text-sm text-muted-foreground">
        {chat.chat_setting_title}
      </span>
      <div className="form-gap grid w-full grid-cols-1 rounded-xl bg-muted p-4.5 lg:grid-cols-12">
        {/*upload*/}
        <div className="lg:col-span-5">
          <UploadZone
            documentFiles={files}
            setDocumentFiles={addFiles}
            className="mb-0 h-[120px] bg-background lg:mb-0 xl:mb-0"
            placeholder={chat.upload_zone_placeholder}
            description={chat.upload_zone_description}
          />
        </div>
        {/*engine setting*/}
        <div className="col items-start lg:col-span-4">
          <SelectEngine
            className="w-full"
            buttonStyle="bg-white"
            title={chat.chat_setting_select_engine_title}
          />
        </div>
        {/*search options*/}
        <div className="col items-start gap-label-space lg:col-span-3">
          <Label>{chat.chat_setting_tools_title}</Label>
          <ChatTools />
        </div>
      </div>
    </div>
  );
}
