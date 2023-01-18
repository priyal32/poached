"use client";

import config from "@libs/config";
import React from "react";

interface PageSeo {
  title?: string;
  description?: string;
  isPrivate?: boolean;
}

const URLs = () => (
  <>
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={config.url} />
    {/* TODO: OG image */}
    {/* <meta property="twitter:image" content={`${config.url}/assets/og.png`} /> */}
    {/* <meta property="twitter:site" content="@" /> */}
    {/* <meta property="twitter:creator" content="@poaced" /> */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={config.url} />
  </>
);

const PageSeo = ({ title: pageTitle, description = "Easy way to summarize recipe data from various cooking sites", isPrivate = false }: PageSeo) => {
  const title = `Poached${pageTitle ? ` - ${pageTitle}` : ""}`;
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      {!isPrivate && <meta name="description" content={description} />}
      {isPrivate && <meta name="robots" content="noindex" />}

      {/* TODO: verify the correct meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <URLs />
    </>
  );
};

export default PageSeo;
