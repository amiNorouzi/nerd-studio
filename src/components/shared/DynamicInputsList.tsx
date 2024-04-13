"use client";
import { memo } from "react";
import { Label } from "@/components/ui/label";
import RenderIf from "@/components/shared/RenderIf";
import { DescriptionHoverCard } from "./DescriptionHoverCard";

import { DynamicInput } from "@/stores/zustand/types";
import { inputComponents } from "@/constants/dynamic-inputs";
import { cn } from "@/lib/utils";

/**
 * `DynamicInputsList` is a functional component that renders a list of dynamic input components.
 * It takes an array of `components` and an optional `itemClassName` as props.
 *
 * The `components` prop is an array of `DynamicInput` objects, each of which represents a dynamic input component.
 * Each `DynamicInput` object has a `type` property that determines the type of the input component, and other properties that are passed as props to the input component.
 *
 * The `itemClassName` prop is a string that is added as a class name to the div element that wraps each input component.
 *
 * The component maps over the `components` array and for each `DynamicInput` object, it renders a div element that wraps a `Label` component, a `DescriptionHoverCard` component (if the `description` property of the `DynamicInput` object is truthy), and the input component.
 * The type of the input component is determined by the `type` property of the `DynamicInput` object, and the input component is retrieved from the `inputComponents` object.
 *
 * @param {Object} props - The props for the component.
 * @param {DynamicInput[]} props.components - The array of `DynamicInput` objects.
 * @param {string} [props.itemClassName] - The optional class name for the div element that wraps each input component.
 *
 * @returns {JSX.Element[]} An array of div elements that each wrap a `Label` component, a `DescriptionHoverCard` component (if applicable), and an input component.
 */
function DynamicInputsListComponent({
  components,
  itemClassName,
  getValue,
  changeValue,
}: {
  components: DynamicInput[];
  itemClassName?: string;
  getValue: (key: string) => string | number;
  changeValue: (key: string, val: string | number) => void;
}) {
  return (
    <>
      {components.map(input => {
        const Components = inputComponents[input.type];

        return (
          <div
            className={cn("col col-span-2 gap-2", itemClassName)}
            key={input.id}
            data-isLast={input.order === components.length}
          >
            <div className="row w-full gap-label-space">
              <Label>{input.name}</Label>
              <RenderIf isTrue={!!input.description}>
                <DescriptionHoverCard description={input.description} />
              </RenderIf>
            </div>
            <Components
              {...input}
              //@ts-ignore
              value={getValue(input.fieldKey)}
              onChangeValue={val => changeValue(input.fieldKey, val)}
            />
          </div>
        );
      })}
    </>
  );
}

export const DynamicInputsList = memo(DynamicInputsListComponent);
