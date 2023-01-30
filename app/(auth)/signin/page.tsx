import Link from "next/link";
import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsEggFried } from "react-icons/bs";

import { UserAuthForm } from "../components/user-auth-form";

const LoginPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="hover:border-slate-600/20 absolute top-4 left-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center  text-sm font-medium text-white hover:bg-dark-1 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:left-8"
      >
        <>
          <BiChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <BsEggFried className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-main-1100">Enter your credentials to sign in to your account</p>
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
  );
};

export default LoginPage;
