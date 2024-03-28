"use client";
import { TbTrash } from "react-icons/tb";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";

import { inputTypes } from "@/constants/custom-template";

import type {
  CustomTemplateInput,
  CustomTemplateInputType,
} from "@/stores/zustand/types";
import CreateItemSettingsPopover from "@/components/pages/custom-template/components/CreateItemSettingsPopover";

function CreateInputItem({
  item,
  order,
}: {
  item: CustomTemplateInput;
  order: number;
}) {
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();
  const setCustomTemplateInputValue =
    useTemplateStore.use.setCustomTemplateInputValue();
  const setCustomTemplateInputType =
    useTemplateStore.use.setCustomTemplateInputType();
  const deleteCustomTemplateInput =
    useTemplateStore.use.deleteCustomTemplateInput();

  return (
    <div className="flex w-full items-start  gap-2 md:items-center">
      <div className="centered-col h-7 w-7 rounded-lg border bg-muted-dark text-sm font-semibold md:h-10 md:w-10">
        {order}
      </div>
      <div className="grid w-full grid-cols-8 gap-4 rounded-lg border p-4 md:border-none md:p-0">
        <Input
          className="col-span-8 md:col-span-2"
          placeholder={dictionary.name_input_placeholder}
          value={item.name}
          onChange={e =>
            setCustomTemplateInputValue(item.id, "name", e.target.value)
          }
        />

        <Select
          defaultValue={inputTypes[0].type}
          value={item.type}
          onValueChange={val =>
            setCustomTemplateInputType(item.id, val as CustomTemplateInputType)
          }
        >
          <SelectTrigger className="col-span-8 md:col-span-2">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {inputTypes.map(item => (
              <SelectItem key={item.id} value={item.type}>
                {dictionary[item.i18nKey]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="col-span-8 md:col-span-3"
          placeholder={dictionary.description_input_placeholder}
          value={item.description}
          onChange={e =>
            setCustomTemplateInputValue(item.id, "description", e.target.value)
          }
        />
        <div className="row col-span-8 justify-end gap-2 md:col-span-1">
          <CreateItemSettingsPopover item={item} />
          <Button
            className="w-10 rounded-full bg-destructive/10 p-1 text-destructive hover:bg-destructive/30"
            onClick={() => deleteCustomTemplateInput(item.id)}
          >
            <TbTrash size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateInputItem;
