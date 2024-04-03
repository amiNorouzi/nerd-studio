import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function AdvanceCategorySkeleton() {
  return (
    <div className="col w-full gap-1.5">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}

export default AdvanceCategorySkeleton;
