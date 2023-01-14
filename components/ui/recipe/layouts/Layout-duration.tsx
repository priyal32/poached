import clsx from "clsx";
import { startCase } from "lodash";
import React from "react";

const LayoutDuration: React.FunctionComponent<{ label: string; data?: string | number }> = ({ label, data }) => {
  return (
    <div className={clsx("flex flex-col flex-wrap gap-x-2 pr-1 md:flex-row", !data && "hidden")}>
      <dt className="text-sm font-medium uppercase text-neutral-500">{startCase(label)}</dt>
      <dd className="text-sm font-bold">{data}</dd>
    </div>
  );
};

export default LayoutDuration;
