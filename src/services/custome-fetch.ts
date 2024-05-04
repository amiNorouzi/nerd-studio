import { getSession } from "next-auth/react";

export default async function customFetch(input: RequestInfo, init?: RequestInit) {
  const session = await getSession();
  const headers = {
    'Content-Type': 'application/json',
    ...(session && { 'Authorization': `Bearer ${session.user.accessToken}` }),
  };

  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...headers,
    },
  });
}