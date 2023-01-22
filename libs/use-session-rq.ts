"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useQuery } from "react-query";

type Props = {
  required?: boolean;
  redirectTo?: string;
  queryConfig?: Record<any, any>;
};

export async function fetchSession() {
  const res = await fetch("/api/auth/session");
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSession({ required, redirectTo = "/api/auth/signin?error=SessionExpired", queryConfig = {} } = {} as Props) {
  const router = useRouter();
  const query = useQuery<Session, Error>(["session"], fetchSession, {
    ...queryConfig,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      if (data || !required) return;
      router.push(redirectTo);
    },
  });

  const isLoading = query.status === "loading";

  return {
    session: query.data,
    error: query.error,
    isLoading,
    isValidating: query.isFetching,
    isAuthenticated: query.data?.user.id ? true : isLoading ? undefined : false,
    isAdmin: query.data?.user.role === "admin" ? true : isLoading ? undefined : false,
  };
}
