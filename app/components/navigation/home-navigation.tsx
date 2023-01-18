import React from "react";

const HomeNavigation = () => {
  return (
    <div className="sticky top-0 z-50 w-full bg-transparent">
      <div className="pointer-events-none absolute z-[-1] h-full w-full bg-dark-2 bg-opacity-80 shadow-[0_-1px_0_rgba(255,255,255,.1)_inset] contrast-[0_0_0_1px_#fff] backdrop-blur-md"></div>
      <nav className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center">
          <h1 className="font-primary text-2xl font-medium">Poached</h1>
          <span className="ml-1 rounded bg-dark-1 py-1 px-2 text-xs font-medium">BETA</span>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavigation;
