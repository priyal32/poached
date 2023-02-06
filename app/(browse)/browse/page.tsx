"use client";

import Container from "@components/container";
import SidebarLayout from "@components/sidebar/sidebar-layout";
import Sidebar from "@components/sidebar/sidebar-main";
import { zodResolver } from "@hookform/resolvers/zod";
import config from "@libs/config";
import { useNotificationStore } from "@libs/stores/notification";
import { useSession } from "@libs/use-session-rq";
import { recipeSchema } from "@libs/validations/recipe";
import { fetchWithUser } from "app/libs/fetch-with-user";
import { isValidHttpUrl } from "helpers/isValidHttp";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
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

const toastId = nanoid();

const BrowsePage = ({ searchParams }: SearchParams) => {
  const { setNotification } = useNotificationStore();
  const [value, setValue] = React.useState<string>("");
  const [targetUrl, setTargetUrl] = React.useState<string>(searchParams?.url || "");

  const { isFetching: isRequested, data: recipeData } = useQuery<Result | undefined, Error>(["scrapRecipe", targetUrl], () => fetchRecipe(targetUrl), {
    refetchOnWindowFocus: false,
  });

  const [recipe, setRecipe] = React.useState<RootSchema | undefined>(recipeData?.results);
  const [onEdit, setOnEdit] = React.useState<boolean>(false);

  const form = useForm<RootSchema>({ defaultValues: recipe, resolver: zodResolver(recipeSchema) });

  const router = useRouter();
  const { isAuthenticated } = useSession();

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
    setRecipe(recipe.results);
    form.reset(recipe.results);
    return recipe;
  }

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    const query: { url: string } = { url: value };
    if (!value || !isValidHttpUrl(query.url)) {
      return setNotification({ id: toastId, category: "error", message: "Make sure to enter correct url" });
    }
    setTargetUrl(value);

    //TODO : router push with query parameter, without encoding.
  }

  const sendRequest = React.useCallback(async (url: string, data: RootSchema) => {
    const res = await fetchWithUser(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, recipeYield: Number(data.recipeYield) }),
    });

    if (res.ok) {
      setNotification({ id: toastId, category: "success", message: "Your changes are saved successfully" });
    } else {
      const json = await res.json();
      console.log(json);
      setNotification({ id: toastId, category: "error", message: "An error while saving changes" });
    }
  }, []);

  async function onSave() {
    if (!recipe) return;
    setNotification({ id: toastId, category: "loading", message: "Saving recipe" });
    await sendRequest(`${config.url}/api/recipe`, recipe);
  }

  function handleCloseEdit() {
    setOnEdit(false);
  }

  if (isAuthenticated === false) {
    router.push("signin");
    return null;
  }

  const importProps = { handleSubmitForm, isRequested, setValue, value };
  return (
    <div className="h-screen w-full overflow-auto pt-[80px] md:pl-[15rem] md:pt-0">
      <section className="relative m-auto flex h-full flex-col">
        {!isRequested && recipeData?.results && <Header {...importProps} onSave={onSave} setOnEdit={setOnEdit} />}
        <Container className="m-auto flex flex-col gap-y-8">
          <span className="text-sm" onClick={() => signOut()}>
            Sign out
          </span>
          {!targetUrl && !recipeData?.results && (
            <div className="m-auto flex max-w-xl flex-col items-center justify-center px-4 sm:px-0">
              <Image src="/poached_logo.png" alt="Poached Logo" width={150} height={150} className="relative mx-auto object-cover" />
              <p className="mb-6 text-center font-headline text-lg font-bold lg:text-xl">Get just the instructions & ingredients for any recipe. No popups, ads, or annoying clutters</p>
              <ImportField {...importProps} wfull />
            </div>
          )}
          {isRequested && targetUrl && <RecipeOnLoading />}
          {!isRequested && targetUrl && recipeData?.results && recipe && <RecipeLayout data={recipe} />}
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
