import FormSkeleton from "@/components/shared/skeleton/FormSkeleton";
import EditorSkeleton from "@/components/shared/skeleton/EditorSkeleton";

export default function GeneratorsPagesSkeleton() {
  return (
    <div className="form-padding grid h-full grid-cols-12 gap-3">
      <div className="col form-gap h-fit flex-grow lg:col-span-4">
        <FormSkeleton />
      </div>
      <EditorSkeleton />
    </div>
  );
}
