import React, { ReactNode } from "react";
import { AuthProvider } from "@src/context/auth-context";
import { Provider } from "react-redux";
import { store } from "@src/store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
