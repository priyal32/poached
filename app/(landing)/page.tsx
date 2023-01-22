import config from "@libs/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { HiBookOpen, HiCloud, HiLibrary } from "react-icons/hi";

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(config.repo_api_url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response?.ok) {
      return null;
    }

    const json = await response.json();

    return parseInt(json["stargazers_count"]).toLocaleString();
  } catch (error) {
    return null;
  }
}

const IndexPage = async () => {
  const stars = await getGitHubStars();
  return (
    <section className="mx-auto w-full">
      <div className="flex w-full flex-col items-center">
        <section className="max-w-5xl px-6  md:px-0">
          <div className="mx-auto max-w-4xl pt-16 md:pt-28 lg:pt-36">
            <h2 className="text-center font-headline text-lg font-bold text-[hsl(144,42%,47%)]">The home for all your recipes</h2>
            <h1 className="text-center font-headline text-4xl font-bold md:text-7xl">All your recipes in one single page.</h1>
            <p className="mx-auto mt-8 max-w-3xl text-center font-primary text-base md:mt-12 md:text-xl">
              Import just the recipe from any website without the distractions or clutter. Create meal plans, and generate grocery lists
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-4">
              <Link href="/signin" className="flex h-12 items-center gap-x-1.5 rounded-lg bg-[hsl(144,42%,47%)] px-2 md:px-4">
                <span className="text-sm font-bold text-white md:text-lg">Get Started</span>
              </Link>
              <Link href={config.repo_url} target="_blank" className="flex h-12 items-center gap-x-1.5 rounded-lg border border-neutral-800 px-2 md:px-6">
                <span className="text-sm font-bold md:text-lg">Github</span>
                <BsGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        <div className="max-w-5xl py-8 px-6 md:py-16 md:px-0 lg:py-24">
          <div className="gradient-01 absolute left-1/3 -z-50 h-56 w-[30%] rounded-full opacity-40"></div>
          <Image alt="mock" width={1200} height={700} priority src="/poached_mock.png" className="rounded-xl shadow-md" />
        </div>
        <section className="w-full max-w-5xl px-6  md:px-0">
          <h3 className="mx-auto max-w-[80%] pt-8 pb-4 text-center font-headline text-3xl font-bold md:text-5xl">Simple enough for anyone, Powerful enough for anything.</h3>
          <p className="mx-auto max-w-3xl text-center font-primary text-base text-slate-200 md:text-lg">
            Poached will help you to streamline your cooking process, allowing you to quickly and efficiently organize your recipe collection.
          </p>
          <ul className="grid w-full grid-cols-1 gap-8 pt-12 md:grid-cols-3">
            <li className="rounded-md border border-[#292d30] bg-dark-1/30 p-4">
              <HiBookOpen className="h-10 w-10" />
              <h5 className="mt-4 text-xl font-medium">Make recipes your own</h5>
              <p className="mt-2 text-sm text-neutral-400">You can easily edit recipes, save adjustments to ingredients, and add additional steps or tips to your preparation.</p>
            </li>
            <li className="rounded-md border border-[#292d30] bg-dark-1/30 p-4">
              <HiLibrary className="h-10 w-10" />
              <h5 className="mt-4 text-xl font-medium">All in one place</h5>
              <p className="mt-2 text-sm text-neutral-400">Storing your recipes in Poached allows you to quickly search, find, and select what you want to cook.</p>
            </li>
            <li className="rounded-md border border-[#292d30] bg-dark-1/30 p-4">
              <HiCloud className="h-10 w-10" />
              <h5 className="mt-4 text-xl font-medium">Cook from your favorite device</h5>
              <p className="mt-2 text-sm text-neutral-400">Poached stores your recipes in the Cloud so you can access them on any device through our website or Android/iOS app.</p>
            </li>
          </ul>
        </section>
        <section className="mt-8 flex w-full flex-col items-center py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-5xl flex-col gap-y-4">
            <h3 className="text-center font-headline text-3xl font-bold leading-[1.1] tracking-tighter sm:text-3xl md:text-6xl">Proudly Open Source</h3>
            <p className="mx-auto max-w-[85%] text-center leading-normal text-neutral-50 sm:text-lg sm:leading-7">
              Poached is open source and powered by open source software. The code is available on{" "}
              <Link className="underline" href={config.repo_url}>
                Github
              </Link>
              .
            </p>
            <Link className="mx-auto flex items-center" href={config.repo_url}>
              <div className="rounded-md bg-slate-800/60 p-3">
                <BsGithub className="h-6 w-6" />
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-r-8 border-l-0 border-solid border-y-transparent border-r-slate-800"></div>
                <div className="flex h-10 items-center rounded-md border border-slate-800/60 bg-slate-800/60 px-4 font-headline font-medium text-slate-200">{stars} stars on GitHub</div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default IndexPage;
