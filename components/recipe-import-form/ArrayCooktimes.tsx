import React from "react";
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BsClock } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";

import { RootSchema } from "@/types";

import FieldWrapper from "./FieldWrapper";

type Props = {
  control: Control<RootSchema, any>;
  setValue: UseFormSetValue<RootSchema>;
  register: UseFormRegister<RootSchema>;
};

const ArrayCooktimes: React.FunctionComponent<Props> = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cookTimes",
  });

  return (
    <FieldWrapper el="ul" className="flex flex-col gap-4">
      {fields.length !== 3 && (
        <button
          type="button"
          onClick={() => append({ hr: "", min: "", type: "" })}
          className="flex items-center justify-center space-x-2 rounded-lg bg-dark-2 p-3 transition-all hover:bg-dark-neutral"
        >
          <BsClock className="h-4 w-4" /> <span className="text-sm capitalize">Add cooking time</span>
        </button>
      )}
      {fields.map((_, id) => (
        <div className="flex items-center gap-x-3" key={id}>
          <div className="w-1/3">
            <div className="text-sm text-neutral-400">Title</div>
            <input {...register(`cookTimes.${id}.type`)} type="text" className="w-full rounded-md bg-dark-2 p-2 text-sm focus:outline-none" />
          </div>
          <div className="w-1/3">
            <div className="text-sm text-neutral-400">Minutes</div>
            <input {...register(`cookTimes.${id}.min`)} type="text" className="w-full rounded-md bg-dark-2 bg-transparent p-2 text-sm focus:outline-none" />
          </div>
          <div className="w-1/3">
            <div className="text-sm text-neutral-400">Hours</div>
            <div className="flex items-center">
              <input {...register(`cookTimes.${id}.hr`)} type="text" className="w-full rounded-md bg-dark-2 bg-transparent p-2 text-sm focus:outline-none" />
              <FiTrash2 className="ml-1.5 h-5 w-5 cursor-pointer" onClick={() => remove(id)} />
            </div>
          </div>
        </div>
      ))}
    </FieldWrapper>
  );
};

export default ArrayCooktimes;
