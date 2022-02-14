import React, { ReactNode, useCallback, useContext, useEffect } from "react";
import * as auth from "@src/utils/auth_provider";
import { http } from "@src/utils/http";
import { useAsync } from "@src/utils/use-async";

export interface User {
  username: string;
  password: string;
  token: string;
  department: string;
  email: string;
}

export type AuthForm = Pick<User, "username" | "password">;

const AuthContext = React.createContext<
  | {
      login: (form: AuthForm) => Promise<void>;
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
    error,
    isError,
    run,
    data: user,
    setData: setUser,
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
  const logout = () => auth.logout().then(() => setUser(null));
  return (
    <AuthContext.Provider value={{ login, logout, user }}>
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
