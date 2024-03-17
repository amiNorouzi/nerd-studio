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
    <div className="col w-full items-center gap-3  ">
      <span className="text-center text-sm text-muted-foreground lg:text-base">
        {chat.chat_setting_title}
      </span>
      <div className="grid w-full grid-cols-1 gap-9 rounded-3xl bg-muted px-9 py-6 lg:grid-cols-12">
        {/*upload*/}
        <div className="lg:col-span-5">
          <UploadZone
            documentFiles={files}
            setDocumentFiles={addFiles}
            className="mb-0 bg-white lg:mb-0 xl:mb-0"
            placeholder={chat.upload_zone_placeholder}
            description={chat.upload_zone_description}
          />
        </div>
        {/*engine setting*/}
        <div className="col items-start gap-3 lg:col-span-4 lg:pe-9">
          <SelectEngine
            className="w-full"
            buttonStyle="bg-white"
            title={chat.chat_setting_select_engine_title}
            titleStyle="text-sm font-medium"
          />
        </div>
        {/*search options*/}
        <div className="col items-start gap-3 lg:col-span-3 lg:pe-9">
          <span className="text-sm font-medium">
            {chat.chat_setting_tools_title}
          </span>
          <ChatTools />
        </div>
      </div>
    </div>
  );
}
