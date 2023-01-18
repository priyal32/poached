"use client";

import Navbar from "@components/navigation/main-navigation";
import React from "react";

const BrowseLayout = ({ children }: React.PropsWithChildren<unknown>) => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState<boolean>(false);
  const [clientWidth, setClientWidth] = React.useState<number | undefined>(undefined);

  const ref = React.useRef<HTMLDivElement>(null);

  const toggleNavBar = () => setIsNavbarOpen((state) => !state);

  React.useEffect(() => {
    function handleResize() {
      setClientWidth(ref.current?.offsetWidth);
    }
    window.addEventListener("resize", handleResize);

    if (clientWidth && clientWidth > 768) {
      setIsNavbarOpen(false);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current?.offsetWidth]);

  return (
    <main ref={ref}>
      <Navbar isOpen={isNavbarOpen} toggleNavBar={toggleNavBar} />
      {children}
    </main>
  );
};

export default BrowseLayout;
