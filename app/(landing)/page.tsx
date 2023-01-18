import Image from "next/image";
import React from "react";
import { BsFillArrowRightCircleFill, BsGlobe } from "react-icons/bs";
import { HiBookOpen, HiCloud, HiLibrary } from "react-icons/hi";

const IndexPage = () => {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="flex w-full flex-col items-center">
        <section className="px-6 md:px-0">
          <div className="gradient-02 absolute inset-0 -z-50 h-[50%] w-[30%] rounded-full opacity-40"></div>
          <div className="mx-auto max-w-4xl pt-28 md:pt-36">
            <h2 className="text-center font-headline text-lg font-bold text-[hsl(144,42%,47%)]">The home for all your recipes</h2>
            <h1 className="text-center font-headline text-4xl font-bold md:text-7xl">All your recipes in one single page.</h1>
            <p className="mx-auto mt-8 max-w-3xl text-center font-headline text-base md:mt-12 md:text-xl">
              Import just the recipe from any website without the distractions or clutter. Create meal plans, and generate grocery lists
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-4">
              <button className="flex h-12 items-center gap-x-1.5 rounded-lg bg-[hsl(144,42%,47%)] px-2 md:px-4">
                <span className="text-sm font-bold md:text-lg">Create an Account</span>
                <BsFillArrowRightCircleFill className="h-5 w-5" />
              </button>
              <button className="flex h-12 items-center gap-x-1.5 rounded-lg px-2 outline outline-dark-1 md:px-4">
                <span className="text-sm font-bold md:text-lg">Explore</span>
                <BsGlobe className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
        <div className="py-24 px-6 md:px-0">
          <Image alt="mock" width={1200} height={700} src="/mock.png" className="rounded-xl" />
        </div>
        <section className="w-full px-6 md:px-0">
          <div className="gradient-01 absolute right-0 -z-50 h-[50%] w-[30%] rounded-full opacity-40"></div>
          <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
            <li>
              <HiBookOpen className="h-10 w-10" />
              <h5 className="mt-2 text-xl font-medium">Make recipes your own</h5>
              <p className="mt-4 text-neutral-400">You can easily edit recipes, save adjustments to ingredients, and add additional steps or tips to your preparation.</p>
            </li>
            <li>
              <HiLibrary className="h-10 w-10" />
              <h5 className="mt-2 text-xl font-medium">All in one place</h5>
              <p className="mt-4 text-neutral-400">Storing your recipes in Poached allows you to quickly search, find, and select what you want to cook.</p>
            </li>
            <li>
              <HiCloud className="h-10 w-10" />
              <h5 className="mt-2 text-xl font-medium">Cook from your favorite device</h5>
              <p className="mt-4 text-neutral-400">Poached stores your recipes in the Cloud so you can access them on any device through our website or Android/iOS app.</p>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default IndexPage;
