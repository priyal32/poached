import Textarea from "@components/form/text-area";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RootSchema } from "types";

import Wrapper from "./wrapper";

interface Props extends React.ComponentPropsWithoutRef<"textarea"> {
  register: UseFormRegister<RootSchema>;
}

const Description: React.FunctionComponent<Props> = ({ register }) => {
  return (
    <Wrapper aria-label="Description" className="h-36">
      <Textarea {...register("description")} name="description" placeholder="Describe recipe about" />
    </Wrapper>
  );
};

export default Description;
