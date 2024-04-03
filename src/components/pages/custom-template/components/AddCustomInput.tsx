"use client";
import { v4 as uuidv4 } from "uuid";
import { TbPlus } from "react-icons/tb";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import CreateInputItem from "./CreateInputItem";

import { useGetDictionary } from "@/hooks";
import { useTemplateStore } from "@/stores/zustand/template-store";
import {
  getItemStyle,
  getListStyle,
  reorder,
} from "@/components/pages/custom-template/utils";
import { RxDragHandleDots2 } from "react-icons/rx";
import { TemplateInput } from "@/stores/zustand/types";
import RenderIf from "@/components/shared/RenderIf";

export function AddCustomInput() {
  const customTemplateInputs = useTemplateStore.use.customTemplateInputs();
  const setCustomTemplateInputs =
    useTemplateStore.use.setCustomTemplateInputs();
  const {
    page: { custom_template: dictionary },
  } = useGetDictionary();

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setCustomTemplateInputs(
      reorder(
        customTemplateInputs,
        result.source.index,
        result.destination.index,
      ),
    );
  }

  const handleAdd = () => {
    setCustomTemplateInputs({
      id: uuidv4(),
      name: `input-${customTemplateInputs.length + 1}`,
      description: "",
      placeholder: "",
      defaultValue: "",
      order: customTemplateInputs.length + 1,
      type: "text",
      options: [],
      isAdvance: false,
    });
  };

  const renderInputs = (inputs: TemplateInput[]) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided, snapshot) => (
            <div
              className="col gap-2"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {inputs.map((input, index) => (
                <Draggable key={input.id} draggableId={input.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="row relative gap-1 py-3 md:border-b"
                      key={input.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <div
                        {...provided.dragHandleProps}
                        id={input.id}
                        role="img"
                        className="max-md:tart-1 max-md:absolute max-md:top-1/2 max-md:-translate-y-1/2"
                      >
                        <RxDragHandleDots2 size={20} />
                      </div>
                      <CreateInputItem item={input} order={index + 1} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div className="col px-4 pb-4 lg:px-7 lg:pb-7 xl:px-9 xl:pb-9">
      <div className="row mb-2 gap-2 text-base font-bold">
        {dictionary.inputs_label}
        <Button
          variant="secondary"
          className="h-7 w-7 rounded-full p-0.5 "
          onClick={handleAdd}
        >
          <TbPlus size={15} />
        </Button>
      </div>
      {renderInputs(customTemplateInputs.filter(input => !input.isAdvance))}

      <RenderIf isTrue={customTemplateInputs.some(input => input.isAdvance)}>
        <p className="mb-2 mt-5 border-b py-2 text-base font-bold">
          {dictionary.advance_inputs_label}
        </p>
        {renderInputs(customTemplateInputs.filter(input => input.isAdvance))}
      </RenderIf>
    </div>
  );
}
