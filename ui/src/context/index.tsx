import React, { ReactNode } from "react";
import { AuthProvider } from "@src/context/auth-context";
import { Provider } from "react-redux";
import { store } from "@src/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};
