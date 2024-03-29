import useRecipeFields from "@libs/hooks/useRecipeFields";
import React from "react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { RootSchema } from "types";

import Wrapper from "./wrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  onEdit: {
    [key: string]: boolean;
  };
  getValues: UseFormGetValues<RootSchema>;
};

type InstrucitonHandle = { remove: () => void };

const InstructionFields = React.forwardRef<InstrucitonHandle, Props>(({ control, setValue, onEdit, getValues }, ref) => {
  const instructionsRef = React.useRef<(HTMLOListElement | null)[]>([]);

  const { fields, append, removeLastEmptyField, handleOnEnter } = useRecipeFields({
    control,
    fieldRef: instructionsRef,
    getValues,
    setValue,
    targetKey: "recipeInstructions",
    onEdit: onEdit.instructions,
  });

  React.useImperativeHandle(ref, () => ({
    remove() {
      removeLastEmptyField();
    },
  }));

  return (
    <Wrapper el="ul" aria-label="Ingredients">
      {fields.map((instruction, id) => (
        <ol
          suppressContentEditableWarning
          contentEditable
          ref={(val) => (instructionsRef.current[id] = val)}
          onInput={(event) => {
            setValue(`recipeInstructions.${id}`, {
              id: instruction.id,
              item: event.currentTarget.textContent as string,
            });
          }}
          onKeyDown={(event) => handleOnEnter(event, id)}
          key={instruction.id}
          className="rounded-md bg-transparent p-2 text-sm focus:outline-none"
        >
          {instruction.item}
        </ol>
      ))}
      <button type="button" onClick={(event) => append(event)} className="my-3 flex w-full items-center justify-center rounded-lg py-2 outline outline-dark-neutral">
        Add Instruction
      </button>
    </Wrapper>
  );
});

InstructionFields.displayName = "InstructionFields";

export default InstructionFields;
