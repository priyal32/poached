import React from "react";
import { Control, useFieldArray, UseFormGetValues, UseFormSetValue } from "react-hook-form";

import { RootSchema } from "@/types";

type Props = {
  control: Control<RootSchema, any>;
  targetKey: "recipeInstructions" | "recipeIngredients";
  onEdit?: boolean;
  fieldRef: React.MutableRefObject<(HTMLElement | null)[]>;
  getValues: UseFormGetValues<RootSchema>;
  setValue: UseFormSetValue<RootSchema>;
};

const useRecipeFields = ({ control, targetKey, onEdit, fieldRef, getValues }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: targetKey,
  });

  React.useEffect(() => {
    if (onEdit) {
      setTimeout(() => {
        const targettedElement = getValues()[targetKey];
        if (targettedElement) {
          const lastEl = fieldRef.current[targettedElement.length - 1];
          if (lastEl) {
            lastEl.focus();
            window.getSelection()?.selectAllChildren(lastEl);
            window.getSelection()?.collapseToEnd();
          }
        }
      }, 0);
    }
  }, [fields, onEdit]);

  function removeLastEmptyField() {
    if (fields[fields.length - 1]?.item.length === 0) {
      remove(fields.length - 1);
    }
  }

  function handleOnEnter(event: React.KeyboardEvent, id: number) {
    const textContent = event.currentTarget.textContent as string;
    if (event.code === "Enter" && textContent.length > 0) {
      appendNewField(event);
    }
    if (event.code === "Enter" && textContent.length === 0) {
      remove(id);
    }

    if (event.code === "Backspace" && event.currentTarget.textContent === "") {
      remove(id);
    }
  }

  function appendNewField(event: React.KeyboardEvent | React.MouseEvent) {
    event.preventDefault();
    append({
      item: "",
      id: fields.length,
    });
  }

  function removeField(id: number) {
    remove(id);
  }

  return { fields, append: appendNewField, remove: removeField, removeLastEmptyField, handleOnEnter };
};

export default useRecipeFields;
