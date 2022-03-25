import React from "react";
import { Home } from "@src/components/home";
import { UnauthenticatedApp } from "@src/unauthenticated-app";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "@src/components/screens/error-page";

export const PortalRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnauthenticatedApp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
