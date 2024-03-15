import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { StateSetterType } from "@/services/types";
import { mockData } from "./constant";

interface ChildCategoryItemProps {
  id: number;
  title: string;
  description: string;
  selectedItem: number;
  handleSelectItem: (v: number) => void;
}
function TopicItem({
  title,
  id,
  description,
  selectedItem,
  handleSelectItem,
}: ChildCategoryItemProps) {
  const isItemSelected = selectedItem === id;
  return (
    <div
      onClick={() => handleSelectItem(id)}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all hover:scale-110",
        isItemSelected && "border-primary bg-primary-light text-primary",
      )}
    >
      <Checkbox
        checked={isItemSelected}
        className="border-muted-foreground data-[state=checked]:border-primary-dark data-[state=checked]:bg-transparent data-[state=checked]:text-primary-dark "
      />
      <div className="col">
        <h4
          className={cn(
            "text-base font-medium",
            isItemSelected && "text-primary-dark",
          )}
        >
          {title}
        </h4>
        <p className="line-clamp-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
interface ListOfContentTopicProps {
  selectedTopicChildItemId: number;
  setSelectedTopicChildItemId: StateSetterType<number>;
}
export function ListOfContentTopic({
  selectedTopicChildItemId,
  setSelectedTopicChildItemId,
}: ListOfContentTopicProps) {
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-x-8 gap-y-3 rounded-xl border p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {mockData.map(item => (
        <TopicItem
          key={item.id}
          {...item}
          selectedItem={selectedTopicChildItemId}
          handleSelectItem={setSelectedTopicChildItemId}
        />
      ))}
    </div>
  );
}
