"use client";

import LoadingDots from "@components/loading-dots/loading-dots";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@libs/validations/auth";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import * as z from "zod";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  signingIn: boolean;
}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, signingIn, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      username: data.username.toLowerCase(),
      password: data.password,
      redirect: false,
      signingIn: signingIn,
      // callbackUrl: searchParams.get("from") || "/browse",
    });

    if (signInResult?.error) {
      console.log("Failed...");
      setIsLoading(false);
    } else {
      React.startTransition(() => {
        router.push("/browse");
        router.refresh();
      });
    }
  }

  return (
    <div className={clsx("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="Username">
              Username
            </label>
            <input
              id="username"
              placeholder="Your username"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-neutral-600/20 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-neutral-600 focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-1"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && <p className="px-1 text-xs text-red-600">{errors.username.message}</p>}
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              placeholder="Your password"
              className="my-0 mb-2 block h-9 w-full rounded-md border border-neutral-600/20 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-neutral-600 focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-1"
              type="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <button
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
            disabled={isLoading}
          >
            {isLoading && <LoadingDots />}
            Sign {signingIn ? "In" : "Up"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-dark-2 px-2 text-slate-100">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500"
        onClick={() => signIn("google")}
        disabled={isLoading}
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </button>
    </div>
  );
}
