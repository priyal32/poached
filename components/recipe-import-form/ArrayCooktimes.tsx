import React from "react";
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsClock } from "react-icons/bs";

import interpretDuration from "@/helpers/interpretDuration";
import { RootSchema } from "@/types";

import FieldWrapper from "./FieldWrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  register: UseFormRegister<RootSchema>;
  recipe: RootSchema | undefined;
};

const ArrayCooktimes: React.FunctionComponent<Props> = ({ control, recipe, register }) => {
  const { fields, append } = useFieldArray({
    control,
    name: "cookTimes",
  });

  const defaultFromImport = [interpretDuration(recipe?.prepTime).toMinutes(), recipe?.totalTime, recipe?.cookTime];

  // item?.match(/\d+/g)

  // React.useEffect(() => {
  //   defaultFromImport.map((item) => {
  //     append({})
  //   }).flat();
  // }, [recipe])

  console.log(defaultFromImport);

  return (
    <FieldWrapper el="ul">
      {fields.length !== 3 && (
        <button
          type="button"
          onClick={() => append({ hr: "", min: "", type: "" })}
          className="flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral"
        >
          <BsClock className="h-4 w-4" /> <span className="text-sm capitalize">Add cooking time</span>
        </button>
      )}
      {fields.map((instruction, id) => (
        <input {...register(`cookTimes.${id}.type`)} type="text" key={instruction.id} className="rounded-md bg-transparent p-2 text-sm focus:outline-none" />
      ))}
    </FieldWrapper>
  );
};

export default ArrayCooktimes;
