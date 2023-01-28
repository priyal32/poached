"use client";

import "@styles/globals.css";

import PortalToast from "@components/interfaces/PortalToast";
import useUI from "@libs/hooks/useUI";
import React, { PropsWithChildren } from "react";

import Providers from "./providers";

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  useUI();
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          {children}
          <PortalToast />
        </Providers>
      </body>
    </html>
  );
}
