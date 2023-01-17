"use client";

import Navbar from "@components/navigation/main-navigation";
import React from "react";

const BrowseLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState<boolean>(false);

  const toggleNavBar = () => setIsNavbarOpen((state) => !state);

  return (
    <React.Fragment>
      <Navbar isOpen={isNavbarOpen} toggleNavBar={toggleNavBar} />
      {children}
    </React.Fragment>
  );
};

export default BrowseLayout;
