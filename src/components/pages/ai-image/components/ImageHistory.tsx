"use client";

import ImageHistoryItem from "./ImageHistoryItem";

import { useGetDictionary } from "@/hooks";

import type { HistoryItem } from "@/services/types";

function ImageHistory({ histories }: { histories: HistoryItem[] }) {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <div className="col h-full w-64 bg-muted">
      <h3 className="mb-2 border-b px-4 py-2.5 font-semibold">
        {imageDictionary.history_title}
      </h3>
      <div className="col gap-2 p-2">
        {histories?.map(history => (
          <ImageHistoryItem
            history={history}
            key={history.id}
            isActive={history.id === "1"}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageHistory;
