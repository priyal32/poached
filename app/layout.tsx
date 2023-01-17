"use client";

import "@/styles/globals.css";

import React, { PropsWithChildren } from "react";

import Providers from "./providers";

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
