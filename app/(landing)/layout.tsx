import HomeNavigation from "@components/navigation/home-navigation";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

const LandingLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <main className={clsx("flex flex-col")}>
      <HomeNavigation />
      {children}
    </main>
  );
};

export default LandingLayout;
