import { QueryClient } from "@tanstack/react-query";

const ONE_MINUTE_IN_MS = 60_000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: ONE_MINUTE_IN_MS,
    },
  },
});
