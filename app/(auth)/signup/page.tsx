import Link from "next/link";
import React from "react";

import { UserAuthForm } from "../components/user-auth-form";

const RegisterPage = () => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <Link
        href="/signin"
        className="hover:border-slate-600/20 absolute top-4 right-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent py-2 px-3 text-center  text-sm font-medium text-white hover:bg-dark-1 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:top-8 md:right-8"
      >
        Login
      </Link>

      <div className="flex flex-1 flex-shrink-0 flex-col items-center justify-center border-r border-main-500 bg-main-200 px-5 pt-16 pb-8 shadow-lg">
        <div className="flex w-[350px] flex-1 flex-col space-y-6 lg:justify-center">
          <div className="flex flex-col space-y-2">
            {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
            <h1 className="text-2xl font-bold">Get started</h1>
            <p className="text-sm text-main-1100">Create a new account</p>
          </div>
          <UserAuthForm signingIn={false} />
          <p className="px-8 text-center text-sm text-main-1000">
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
      <aside className="hidden h-full w-full flex-1 flex-shrink basis-1/4 items-center justify-center bg-slate-100 lg:flex"></aside>
    </div>
  );
};

export default RegisterPage;
