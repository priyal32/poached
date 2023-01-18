import useRecipeFields from "@libs/hooks/useRecipeFields";
import React from "react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { RootSchema } from "types";

import Wrapper from "./wrapper";

type Props = {
  ingredientRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  onEdit: {
    [key: string]: boolean;
  };
  getValues: UseFormGetValues<RootSchema>;
  handleSubmit(data: RootSchema): void;
};

const IngredientFields: React.FunctionComponent<Props> = ({ ingredientRef, control, setValue, onEdit, getValues, handleSubmit }) => {
  const { fields, append, removeLastEmptyField, handleOnEnter } = useRecipeFields({
    control,
    fieldRef: ingredientRef,
    getValues,
    setValue,
    targetKey: "recipeIngredients",
    onEdit: onEdit.ingredients,
  });

  React.useEffect(() => {
    removeLastEmptyField();
  }, [handleSubmit]);

  return (
    <Wrapper el="ul" aria-label="Ingredients">
      {fields.map((ingredient, id) => (
        <li
          suppressContentEditableWarning
          ref={(val) => (ingredientRef.current[id] = val)}
          onKeyDown={(event) => handleOnEnter(event, id)}
          contentEditable
          onInput={(event) => {
            setValue(`recipeIngredients.${id}`, {
              id,
              item: event.currentTarget.textContent as string,
            });
          }}
          key={ingredient.id}
          className="rounded-md bg-transparent p-2 text-sm focus:outline-none"
        >
          {ingredient.item}
        </li>
      ))}
      <button type="button" onClick={(event) => append(event)} className="my-3 flex w-full items-center justify-center rounded-lg py-2 outline outline-dark-neutral">
        Add ingredient
      </button>
    </Wrapper>
  );
};

export default IngredientFields;
