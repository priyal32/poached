import clsx from "clsx";
import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsClock } from "react-icons/bs";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { RootSchema } from "types";

import Wrapper from "./wrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  register: UseFormRegister<RootSchema>;
};

const CooktimeFields: React.FunctionComponent<Props> = ({ control, register }) => {
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "cookTimes",
  });

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    swap(result.source.index, result.destination.index);
  }

  return (
    <Wrapper el="ul" className="flex flex-col gap-4">
      {fields.length !== 3 && (
        <button
          type="button"
          onClick={() => append({ hr: "", min: "", type: "" })}
          className="flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral"
        >
          <BsClock className="h-4 w-4" /> <span className="text-sm capitalize">Add cooking time</span>
        </button>
      )}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((_, id) => (
                <Draggable key={_.id} draggableId={_.id} index={id}>
                  {(provided) => (
                    <div className={clsx("flex items-center space-x-2", id !== 0 && "mt-2")} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <div className="relative flex w-1/3 items-center">
                        <div className="mr-1 h-10 w-10 md:mr-0">
                          <FiMenu className="absolute bottom-0 mr-1 h-5 w-5 -translate-y-1/2" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm text-neutral-400">Title</div>
                          <input {...register(`cookTimes.${id}.type`)} type="text" className="w-full rounded-md bg-dark-2 p-2 text-sm focus:outline-none" />
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="text-sm text-neutral-400">Minutes</div>
                        <input {...register(`cookTimes.${id}.min`)} type="text" className="w-full rounded-md bg-dark-2 bg-transparent p-2 text-sm focus:outline-none" />
                      </div>
                      <div className="w-1/3">
                        <div className="text-sm text-neutral-400">Hours</div>
                        <div className="flex items-center">
                          <input {...register(`cookTimes.${id}.hr`)} type="text" className="w-full rounded-md bg-dark-2 bg-transparent p-2 text-sm focus:outline-none" />
                          <FiTrash2
                            data-rbd-drag-handle-context-id={provided.dragHandleProps?.["data-rbd-drag-handle-context-id"]}
                            data-rbd-drag-handle-draggable-id="gibberish"
                            className="ml-1.5 h-5 w-5"
                            style={{ cursor: "pointer" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              remove(id);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default CooktimeFields;
