import clsx from "clsx";
import React from "react";

const LayoutDuration: React.FunctionComponent<{ label: string; data?: string | number }> = ({ label, data }) => {
  return (
    <div className={clsx("flex flex-col first:pr-4 [&:not(:first-child)]:px-4", !data && "hidden")}>
      <dt className="text-center text-sm font-medium uppercase text-neutral-500">{label}</dt>
      <dd className="font-bold">{data}</dd>
    </div>
  );
};

export default LayoutDuration;
