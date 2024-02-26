"use client";
import { ReactNode, useState } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { dehydrate } from "@tanstack/react-query";

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

  return (
    // Provide the client and the state to the children
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
