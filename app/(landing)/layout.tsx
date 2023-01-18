import HomeNavigation from "@components/navigation/home-navigation";
import clsx from "clsx";
import React, { PropsWithChildren } from "react";

const LandingLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <main className={clsx("flex h-auto flex-col md:h-screen")}>
      <HomeNavigation />
      {children}
    </main>
  );
};

export default LandingLayout;
