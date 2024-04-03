import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/utils";

const Card = () => (
  <div className="col max-h-52 w-full gap-2 rounded-[21px]  border bg-background p-3">
    <div className="row w-full gap-2.5">
      <Skeleton className="h-11 w-11 rounded-xl" />
      <div className="flex-grow space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-8 w-20 " />
  </div>
);

export function TemplateListSkeleton() {
  return (
    <div className="col h-full w-full gap-4 overflow-hidden">
      <div className="row h-fit min-h-10 w-full gap-2 overflow-hidden bg-transparent">
        {range(1, 10).map(i => (
          <Skeleton
            className="h-10 min-h-10 w-40 min-w-32 rounded-lg"
            key={i.toString()}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {range(1, 12).map(i => (
          <Card key={i.toString()} />
        ))}
      </div>
    </div>
  );
}
