"use client";

import React from "react";

import BrowseRecipe from "./components/browse-recipe";

type SearchParams = {
  searchParams: { url: string };
};

const BrowsePage = ({ searchParams }: SearchParams) => {
  return (
    <div>
      <BrowseRecipe params={searchParams} />
    </div>
  );
};

export default BrowsePage;
