import ErrorMessage from "@components/form/error-message";
import clsx from "clsx";
import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsClock } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { RootSchema } from "types";

import styles from "./cooktime-fields.module.css";
import Wrapper from "./wrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  register: UseFormRegister<RootSchema>;
  errors: any; //TODO: fix this asap
};

const CooktimeFields: React.FunctionComponent<Props> = ({ control, register, errors }) => {
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
                    <>
                      <div className={clsx("flex items-center space-x-2", id !== 0 && "mt-2")} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <div className="relative w-1/3">
                          <div className="flex items-end">
                            <button type="button" className={clsx(styles.action, "mr-1 md:mr-0")}>
                              <svg viewBox="0 0 20 20" width="17">
                                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                              </svg>
                            </button>
                            <div className="relative flex flex-col">
                              {errors && <ErrorMessage className="absolute top-0 right-0">{errors[id]?.type?.message}</ErrorMessage>}
                              <div className="text-sm text-neutral-400" onClick={() => console.log(errors)}>
                                Title
                              </div>
                              <input {...register(`cookTimes.${id}.type`)} type="text" className="w-full rounded-md bg-dark-2 p-2 text-sm focus:outline-none" />
                            </div>
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="text-sm text-neutral-400">Minutes</div>
                          <input {...register(`cookTimes.${id}.min`)} type="text" className="w-full rounded-md bg-dark-2   p-2 text-sm focus:outline-none" />
                        </div>
                        <div className="w-1/3">
                          <div className="text-sm text-neutral-400">Hours</div>
                          <div className="flex items-center">
                            <input {...register(`cookTimes.${id}.hr`)} type="text" className="w-full rounded-md bg-dark-2  p-2 text-sm focus:outline-none" />
                            <FiTrash2
                              data-rbd-drag-handle-context-id={provided.dragHandleProps?.["data-rbd-drag-handle-context-id"]}
                              data-rbd-drag-handle-draggable-id="gibberish"
                              className="ml-1.5 h-5 w-5 text-[#6f7b88]"
                              style={{ cursor: "pointer" }}
                              onClick={(event) => {
                                event.stopPropagation();
                                remove(id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
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
