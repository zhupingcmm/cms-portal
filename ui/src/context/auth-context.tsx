import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import * as auth from "@src/utils/auth_provider";
import { http } from "@src/utils/http";
import { useAsync } from "@src/utils/use-async";
import { FullPageLoading } from "@src/components/full-page-loading";
import { User } from "@src/types";
import { ErrorPage } from "@src/components/screens/error-page";

export type AuthForm = Pick<User, "username" | "password">;

const AuthContext = React.createContext<
  | {
      login: (form: AuthForm) => Promise<void>;
      register: (from: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
      user: User | null;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    isIdle,
    run,
    data: user,
    setData: setUser,
    isError,
    error,
  } = useAsync<User | null>();

  const bootstrapUser = useCallback(async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
      user = await http("me", { token });
    }
    return user;
  }, []);

  useEffect(() => {
    run(bootstrapUser());
  }, [bootstrapUser]);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (from: AuthForm) => auth.register(from).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  if (isLoading || isIdle) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }
  return (
    <AuthContext.Provider value={{ login, logout, register, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must in AuthContext");
  }

  return context;
};
