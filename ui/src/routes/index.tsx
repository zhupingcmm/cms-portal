import React from "react";
import { Home } from "@src/components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "@src/components/home/navigation-bar";
import { UsersPage } from "@src/components/screens/users";
import { UserInfo } from "@src/components/screens/users/user-info";

export const PortalRoute = () => {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id/*" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
