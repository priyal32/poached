import Link from "next/link";
import React from "react";
import { BsEggFried } from "react-icons/bs";

import { UserAuthForm } from "../components/user-auth-form";

const RegisterPage = () => {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/signin"
        className="absolute top-4 right-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center text-sm  font-medium text-white hover:border-slate-600/20 hover:bg-dark-1 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:right-8"
      >
        Login
      </Link>
      <div className="hidden h-full bg-slate-100 lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            <BsEggFried className="mx-auto h-6 w-6" />

            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-[#bbb]">Enter your credentials below to create your account</p>
          </div>
          <UserAuthForm signingIn={false} />
          <p className="px-8 text-center text-sm text-[#7e7e7e]">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
