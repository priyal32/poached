import Link from "next/link";
import React from "react";
import { BiChevronLeft } from "react-icons/bi";

import { UserAuthForm } from "../components/user-auth-form";

const LoginPage = () => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <Link
        href="/"
        className="hover:border-slate-600/20 absolute top-4 right-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center  text-sm font-medium text-white hover:bg-dark-1 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:right-8"
      >
        <>
          <BiChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex flex-1 flex-shrink-0 flex-col items-center justify-center border-r border-main-500 bg-main-200 px-5 pt-16 pb-8 shadow-lg">
        <div className="flex w-[350px] flex-1 flex-col space-y-6 lg:justify-center">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-main-1100">Sign in to your account</p>
          </div>

          <UserAuthForm signingIn />
          <p className="px-8 text-center text-sm text-main-1000">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-main-1100 underline hover:text-main-1000">
              <span className="text-main-1100 hover:text-main-1000">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
      <aside className="hidden h-full w-full flex-1 flex-shrink basis-1/4 items-center justify-center bg-slate-100 lg:block"></aside>
    </div>
  );
};

export default LoginPage;
