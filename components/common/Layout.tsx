import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Navbar from "./Navbar/Navbar";
import SEO from "./SEO";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const router = useRouter();

  const [isNavbarOpen, setIsNavbarOpen] = React.useState<boolean>(false);
  const [clientWidth, setClientWidth] = React.useState<number | undefined>(undefined);

  const ref = React.useRef<HTMLDivElement>(null);

  const toggleNavBar = () => setIsNavbarOpen((state) => !state);
  const isHome = router.pathname.includes("/home");

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
    <QueryClientProvider client={queryClient}>
      <main ref={ref} className={clsx("flex h-auto md:h-screen", isHome ? "flex-col" : "flex-col overflow-hidden md:flex-row")}>
        <SEO>
          <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        </SEO>
        {!isHome ? (
          <React.Fragment>
            <Navbar isOpen={isNavbarOpen} toggleNavBar={toggleNavBar} />
            <div className="h-screen w-full overflow-auto pt-[80px] md:pl-[15rem] md:pt-0">{children}</div>
          </React.Fragment>
        ) : (
          <section className="pb-8">
            <div className="sticky top-0 z-50 w-full bg-transparent">
              <div className="pointer-events-none absolute z-[-1] h-full w-full bg-dark-2 bg-opacity-80 shadow-[0_-1px_0_rgba(255,255,255,.1)_inset] contrast-[0_0_0_1px_#fff] backdrop-blur-md"></div>
              <nav className="flex h-16 items-center justify-between px-8">
                <div className="flex items-center">
                  <h1 className="font-primary text-2xl font-medium">Poached</h1>
                  <span className="ml-1 rounded bg-dark-1 py-1 px-2 text-xs font-medium">BETA</span>
                </div>
              </nav>
            </div>
            <section className="mx-auto w-full max-w-5xl">{children}</section>
          </section>
        )}
      </main>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default Layout;
