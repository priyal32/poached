import React from "react";
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsClock } from "react-icons/bs";

import { RootSchema } from "@/types";

import FieldWrapper from "./FieldWrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  register: UseFormRegister<RootSchema>;
};

const ArrayCooktimes: React.FunctionComponent<Props> = ({ control, register }) => {
  const { fields, append } = useFieldArray({
    control,
    name: "cookTimes",
  });

  console.log(fields);

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
        <div className="flex" key={id}>
          <input {...register(`cookTimes.${id}.type`)} type="text" className="rounded-md bg-transparent p-2 text-sm focus:outline-none" />
          <input {...register(`cookTimes.${id}.min`)} type="text" className="rounded-md bg-transparent p-2 text-sm focus:outline-none" />
          <input {...register(`cookTimes.${id}.hr`)} type="text" className="rounded-md bg-transparent p-2 text-sm focus:outline-none" />
        </div>
      ))}
    </FieldWrapper>
  );
};

export default ArrayCooktimes;
