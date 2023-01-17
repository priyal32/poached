"use client";

import "@/styles/globals.css";

import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import Providers from "./providers";

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <main className={clsx("flex h-auto flex-col md:h-screen")}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
