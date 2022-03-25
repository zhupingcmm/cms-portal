import React from "react";
import { UsersPage } from "../screens/users";
import { NavigationBar } from "./navigation-bar";

export const Home = () => {
  return (
    <div>
      <NavigationBar />

      <UsersPage />
    </div>
  );
};
