"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import React from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const PortalRootWithNoSSR = dynamic(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  () => import("@radix-ui/react-portal").then((portal) => portal.Root),
  { ssr: false },
);

const PortalToast = () => {
  return (
    <PortalRootWithNoSSR>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border-[#282828] !max-w-[380px]",
          style: {
            padding: "8px",
            paddingLeft: "16px",
            paddingRight: "16px",
            fontSize: "0.875rem",
            backgroundColor: "#1c1c1c",
            color: "#ededed",
          },
          error: {
            duration: 8000,
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                <div className="flex items-center">
                  <div className={clsx("toast-message w-full border-[#282828]", t.type === "loading" ? "max-w-[350px]" : "max-w-[260px]")}>{message}</div>
                  {t.type !== "loading" && (
                    <div className="ml-4">
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toast.dismiss(t.id);
                        }}
                        className="relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 px-2.5 py-1 text-center text-xs text-[#ededed] shadow-none outline-none outline-0 transition-all duration-200 ease-out hover:bg-[#2e2e2e] focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-[#3e3e3e]"
                      >
                        <RxCross2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </PortalRootWithNoSSR>
  );
};

export default PortalToast;
