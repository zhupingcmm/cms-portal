import React from "react";
import { Home } from "@src/components/home";
import { BrowserRouter } from "react-router-dom";
import { NavigationBar } from "@src/components/home/navigation-bar";
import { UsersPage } from "@src/components/screens/users";
import { UserInfo } from "@src/components/screens/users/user-info";
import { Navigate, Route, Routes } from "react-router";
import { PageOperation } from "@src/components/home/page-operation";

export const AuthenticatedApp = () => {
  return (
    <>
      <NavigationBar />
      <PageOperation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id/*" element={<UserInfo />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
