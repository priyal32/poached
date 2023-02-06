import { getSession } from "next-auth/react";

export async function fetchWithUser(url: string, options: RequestInit = {}) {
  const session = await getSession();
  const newUrl = new URL(url, process.env.NEXT_PUBLIC_POACHED_URL);
  newUrl.searchParams.append("userId", session?.user.id || "");
  return fetch(newUrl.toString(), options);
}
