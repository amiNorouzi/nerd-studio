"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Provider for react-query
 * @param children
 * @constructor
 */
export function ReactQueryProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Create a client for react-query
  const [queryClient] = useState(() => new QueryClient());
  // Dehydrate the state for Next.js
  const dehydratedState = dehydrate(queryClient);

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 120000,
        refetchInterval: 120000,
        refetchOnReconnect: false,
      },
    });
  }, [queryClient]);

  return (
    // Provide the client and the state to the children
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
