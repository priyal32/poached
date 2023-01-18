import React from "react";
import { BsEggFried } from "react-icons/bs";

const HomeNavigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-transparent">
      <div className="pointer-events-none absolute z-[-1] h-full w-full bg-dark-2 bg-opacity-80 shadow-[0_-1px_0_rgba(255,255,255,.1)_inset] contrast-[0_0_0_1px_#fff] backdrop-blur-md"></div>
      <nav className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-x-2">
          <BsEggFried className="h-6 w-6" />
          <h1 className="font-headline text-xl font-medium">Poached</h1>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavigation;
