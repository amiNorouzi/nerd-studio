import { Skeleton } from "@/components/ui/skeleton";
import FormSkeleton from "@/components/shared/skeleton/FormSkeleton";

export default function GeneratorsPagesSkeleton() {
  return (
    <div className="form-padding grid h-full grid-cols-12 gap-3">
      <div className="col form-gap h-fit flex-grow lg:col-span-4">
        <FormSkeleton />
      </div>
      <div className="col-span-12 h-full gap-2.5 overflow-hidden lg:col-span-8">
        <Skeleton className="h-full w-full min-w-32 rounded-lg" />
      </div>
    </div>
  );
}
