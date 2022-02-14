import React from "react";
import { Home } from "@src/components/home";
import { UnauthenticatedApp } from "@src/unauthenticated-app";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const PortalRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnauthenticatedApp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
