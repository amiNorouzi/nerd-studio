import { Skeleton } from "@/components/ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="col-span-12 h-full gap-2.5 overflow-hidden lg:col-span-8">
      <Skeleton className="h-full w-full min-w-32 rounded-lg" />
    </div>
  );
}
