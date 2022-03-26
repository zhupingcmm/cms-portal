import React from "react";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./routes";
import { UnauthenticatedApp } from "./unauthenticated-app";

export const App = () => {
  const { user } = useAuth();
  return <>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</>;
};
