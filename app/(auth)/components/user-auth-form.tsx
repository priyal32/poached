"use client";

import LoadingDots from "@components/loading-dots/loading-dots";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@libs/stores/notification";
import { userAuthSchema } from "@libs/validations/auth";
import clsx from "clsx";
import { nanoid } from "nanoid";
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
  const { notification, setNotification } = useNotificationStore();
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
    const toastId = nanoid();
    setIsLoading(true);
    setNotification({ id: toastId, category: "loading", message: "Signing in..." });

    const signInResult = await signIn("credentials", {
      username: data.username.toLowerCase(),
      password: data.password,
      redirect: false,
      signingIn: signingIn,
      // callbackUrl: searchParams.get("from") || "/browse",
    });

    if (signInResult?.error) {
      setIsLoading(false);
      setNotification({ id: toastId, category: "error", message: signInResult.error, error: signInResult.error });
    } else {
      React.startTransition(() => {
        setNotification({ id: toastId, category: "success", message: "Signed in successfully" });
        router.push("/browse");
        router.refresh();
      });
    }
  }

  return (
    <div className={clsx("grid gap-6", className)} {...props}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          className="focus-visible:outliine-4 relative inline-flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-[#2e2e2e] px-4 py-2 text-center text-[#ededed] shadow-sm outline-none outline-0 transition-all duration-200 ease-out hover:bg-[#232323] focus-visible:outline-offset-1"
          onClick={() => signIn("google")}
          disabled={isLoading}
        >
          <FaGoogle className="h-4 w-4" />
          <span className="truncate">Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#3e3e3e]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-dark-2 px-2 text-slate-1200">or</span>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2 text-sm md:grid md:grid-cols-12 md:gap-x-4">
              <div className="col-span-12 flex flex-row justify-between space-x-2">
                <label onClick={() => console.log(notification)} className="block break-all text-sm text-main-1100" htmlFor="Username">
                  Username
                </label>
              </div>
              <div className="col-span-12">
                <input
                  id="username"
                  placeholder="John Doe"
                  className={clsx(
                    "box-border block w-full rounded-md border",
                    "px-4 py-2 text-sm text-main-1200 shadow-sm outline-none transition-all",
                    "focus:border-neutral-600 focus:shadow-md",
                    "focus:outline-none focus:ring-2",
                    errors?.username?.message ? "border-red-700 bg-red-100 placeholder:text-red-600 focus:ring-red-500" : "border-main-700 bg-mainA-200 placeholder:text-main-800 focus:ring-main-400",
                  )}
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register("username")}
                />
                <p
                  data-state={!!errors?.username?.message}
                  className="text-sm text-red-900 transition-all data-[state=true]:mt-2 data-[state=false]:animate-slide-up-normal data-[state=true]:animate-slide-down-normal"
                >
                  {errors?.username?.message}
                </p>
              </div>
            </div>
            <div className="grid gap-2 text-sm md:grid md:grid-cols-12 md:gap-x-4">
              <div className="col-span-12 flex flex-row justify-between space-x-2">
                <label className="block break-all text-sm text-main-1100" htmlFor="Password">
                  Password
                </label>
              </div>
              <div className="col-span-12">
                <input
                  id="password"
                  placeholder="••••••••"
                  className={clsx(
                    "box-border block w-full rounded-md border",
                    "px-4 py-2 text-sm text-main-1200 shadow-sm outline-none transition-all",
                    "focus:border-neutral-600 focus:shadow-md",
                    "focus:outline-none focus:ring-2",
                    errors?.password?.message ? "border-red-700 bg-red-100 placeholder:text-red-600 focus:ring-red-500" : "border-main-700 bg-mainA-200 placeholder:text-main-800 focus:ring-main-400",
                  )}
                  type="password"
                  disabled={isLoading}
                  {...register("password")}
                />
                <p
                  data-state={!!errors?.password?.message}
                  className="text-sm text-red-900 transition-all data-[state=true]:mt-2 data-[state=false]:animate-slide-up-normal data-[state=true]:animate-slide-down-normal"
                >
                  {errors?.password?.message}
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="focus-visible:outliine-4 relative inline-flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-[#2b825b] px-4 py-2 text-center text-white shadow-sm outline-none outline-0 transition-all duration-200 ease-out hover:bg-[#40bf86] focus-visible:outline-offset-1"
              disabled={isLoading}
            >
              {isLoading && <LoadingDots />}
              Sign {signingIn ? "In" : "Up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
