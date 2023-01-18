import Image from "next/image";
import React from "react";
import { AiFillWarning } from "react-icons/ai";

import ImportField from "./import-field";

type Props = {
  handleSubmitForm: (event: React.FormEvent) => Promise<void>;
  setValue: (value: React.SetStateAction<string>) => void;
  value?: string;
  isRequested: boolean;
};

const UnsupportedAlert = () => {
  return (
    <div className="border-t border-neutral-900 pb-4">
      <div className="flex items-center space-x-2 rounded border-l-4 border-orange-300 bg-orange-300 bg-opacity-20 py-3 px-3">
        <AiFillWarning className="h-6 w-6 text-yellow-300" />
        <span className="text-sm">
          The website you entered is not supported? open an{" "}
          <a href="https://github.com/arcetros/poached/issues" target="_blank" className="underline" rel="noreferrer">
            issue
          </a>{" "}
          and we&apos;ll do our best to add it.
        </span>
      </div>
    </div>
  );
};

const RecipeUndefined: React.FunctionComponent<Props> = ({ value, setValue, handleSubmitForm, isRequested }) => {
  const importProps = { handleSubmitForm, isRequested, setValue, value };

  return (
    <div className="ml-0 flex flex-col items-center justify-center py-8 md:h-auto lg:ml-[-6rem] lg:flex-row">
      <div className="block lg:hidden">
        <UnsupportedAlert />
      </div>
      <Image alt="notfound" width={600} height={408} className="flex-1 object-cover" src="/not_found.png" />
      <div className="flex-1 pt-5 lg:ml-[-6rem]">
        <div className="hidden lg:block">
          <UnsupportedAlert />
        </div>
        <h5 className="text-2xl font-bold">We didn&apos;t find a recipe here !</h5>
        <p className="mt-1 pb-4 text-gray-500">This often happens when a website&apos;s code is formatted incorrectly or the website is currently not supported by Poached</p>
        <ImportField {...importProps} placeHolder="Try another recipe URL" wfull />
      </div>
    </div>
  );
};

export default RecipeUndefined;
