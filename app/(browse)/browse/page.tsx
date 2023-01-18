"use client";

import Container from "@components/container";
import SidebarLayout from "@components/sidebar/sidebar-layout";
import Sidebar from "@components/sidebar/sidebar-main";
import { isValidHttpUrl } from "helpers/isValidHttp";
import { parseMilliseconds } from "helpers/msFormatter";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { RootSchema } from "types";

import RecipeForm from "./components/recipe-form";
import Header from "./components/recipe-layouts/header";
import ImportField from "./components/recipe-layouts/import-field";
import RecipeLayout from "./components/recipe-layouts/recipe-main";
import RecipeOnLoading from "./components/recipe-layouts/recipe-onloading";
import RecipeUndefined from "./components/recipe-layouts/recipe-undefined";

type Result = {
  message: string;
  status: boolean;
  results: RootSchema;
  method: string;
};

type SearchParams = {
  searchParams?: { url: string };
};

const BrowsePage = ({ searchParams }: SearchParams) => {
  const [value, setValue] = React.useState<string>("");
  const [targetUrl, setTargetUrl] = React.useState<string>(searchParams?.url || "");

  const { isFetching: isRequested, data: recipeData } = useQuery<Result | undefined, Error>(["scrapRecipe", targetUrl], () => fetchRecipe(targetUrl), {
    refetchOnWindowFocus: false,
  });

  const [recipe, setRecipe] = React.useState<RootSchema | undefined>(recipeData?.results);
  const [onEdit, setOnEdit] = React.useState<boolean>(false);

  const form = useForm<RootSchema>({ defaultValues: recipe });

  async function fetchRecipe(url: string): Promise<Result | undefined> {
    if (!url) return undefined;

    const response = await fetch(`/api/scrap`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });

    const recipe: Result = await response.json();
    setValue("");
    const parsedCookTimes = recipe.results?.convertedCookTimes?.map((time) => {
      return { type: time.type, hr: parseMilliseconds(time.value).hours.toString(), min: parseMilliseconds(time.value).minutes.toString() };
    });

    setRecipe({ ...recipe.results, cookTimes: parsedCookTimes });

    form.reset({ ...recipe.results, cookTimes: parsedCookTimes });
    return recipe;
  }

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    const query: { url: string } = { url: value };
    if (!value || !isValidHttpUrl(query.url)) {
      return alert("Make sure you entered valid url");
    }
    setTargetUrl(value);

    //TODO : router push with query parameter, without encoding.
  }

  function handleCloseEdit() {
    setOnEdit(false);
  }

  const importProps = { handleSubmitForm, isRequested, setValue, value };
  return (
    <div className="h-screen w-full overflow-auto pt-[80px] md:pl-[15rem] md:pt-0">
      <section className="relative m-auto flex h-full flex-col">
        {!isRequested && recipeData?.results && <Header {...importProps} setOnEdit={setOnEdit} />}
        <Container className="m-auto flex flex-col gap-y-8">
          {!targetUrl && !recipeData?.results && (
            <div className="m-auto flex max-w-xl flex-col items-center justify-center px-4 sm:px-0">
              <Image src="/poached_logo.png" alt="Poached Logo" width={150} height={150} className="relative mx-auto object-cover" />
              <p className="mb-6 text-center font-headline text-lg font-bold lg:text-xl">Get just the instructions & ingredients for any recipe. No popups, ads, or annoying clutters</p>
              <ImportField {...importProps} wfull />
            </div>
          )}
          {isRequested && targetUrl && <RecipeOnLoading />}
          {!isRequested && targetUrl && recipe && <RecipeLayout data={recipe} />}
          {!isRequested && targetUrl && !recipeData?.results && <RecipeUndefined {...importProps} />}
        </Container>
        {recipe && onEdit && (
          <Sidebar onClose={handleCloseEdit}>
            <SidebarLayout handleClose={handleCloseEdit}>
              <RecipeForm handleCloseEdit={handleCloseEdit} form={form} recipe={recipe} setRecipe={setRecipe} recipeData={recipeData} />
            </SidebarLayout>
          </Sidebar>
        )}
      </section>
    </div>
  );
};

export default BrowsePage;
