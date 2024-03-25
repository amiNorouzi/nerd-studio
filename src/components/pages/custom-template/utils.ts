import type { CustomTemplateInput } from "@/stores/zustand/types";
import { getHslColorByVar } from "@/lib/utils";

export const reorder = (
  list: CustomTemplateInput[],
  startIndex: number,
  endIndex: number,
): CustomTemplateInput[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, index) => {
    return {
      ...item,
      order: index + 1,
    };
  });
};

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  opacity: isDragging ? "0.5" : "1",
  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver
    ? getHslColorByVar("--primary-light")
    : getHslColorByVar("--background"),
  borderRadius: "0.5rem",
});
