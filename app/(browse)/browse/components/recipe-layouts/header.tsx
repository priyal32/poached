import clsx from "clsx";
import React from "react";
import { FiEdit, FiPlus, FiShare2 } from "react-icons/fi";

import ImportField from "./import-field";

type RecipeHeader = {
  handleSubmitForm: (event: React.FormEvent) => Promise<void>;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (value: React.SetStateAction<string>) => void;
  value?: string;
  isRequested: boolean;
  onSave(): Promise<void>;
};

const Header: React.FunctionComponent<RecipeHeader> = ({ handleSubmitForm, isRequested, setValue, setOnEdit, value, onSave }) => {
  const [showItems, setShowItems] = React.useState<boolean>(false);
  const handleOnEdit = () => setOnEdit((prev) => !prev);

  const ACTIONS = [
    { label: "Edit", action: handleOnEdit, icon: <FiEdit className="h-5 w-5" /> },
    { label: "Share", action: null, icon: <FiShare2 className="h-5 w-5" /> },
    { label: "Save", action: onSave, icon: <FiPlus className="h-5 w-5" /> },
  ];

  return (
    <React.Fragment>
      <div className="z-50 flex h-auto w-full flex-col justify-between md:bg-dark-1 md:px-4 md:py-4 lg:flex-row lg:items-center lg:px-8">
        <header className="fixed top-4 right-5 w-[calc(100%-90px)] md:relative md:top-0 md:right-0 md:my-auto md:inline-flex md:h-full md:w-full md:items-center">
          <ImportField handleSubmitForm={handleSubmitForm} isRequested={isRequested} setValue={setValue} value={value} />
        </header>
        <div className="ml-auto hidden space-x-4 pt-4 md:pt-0 lg:ml-0 lg:flex">
          {ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => action.action && action.action()}
              className={clsx("flex h-12 items-center space-x-2 rounded-lg px-6 outline outline-1 outline-dark-neutral", action.label === "Save" && "bg-[hsl(144,40%,36%)]")}
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      {showItems && (
        <div className="fixed bottom-24 right-3 z-30 flex flex-col space-y-2 md:right-8 lg:hidden">
          {ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setShowItems(false);
                action.action && action.action();
              }}
              className={clsx("flex h-16 w-16 items-center justify-center rounded-full bg-dark-2 outline outline-1 outline-dark-neutral")}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
      <div className="fixed bottom-3 right-3 z-30 flex space-x-4 shadow md:right-8 lg:hidden">
        <button onClick={() => setShowItems((prev) => !prev)} className="flex h-16 w-16 items-center justify-center space-x-2 rounded-full bg-[hsl(144,40%,36%)] shadow">
          <FiPlus className="h-8 w-8" />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Header;
