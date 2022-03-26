import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Epic } from "./epic";
import { Kanban } from "./kanban";

export const UserInfo = () => {
  return (
    <div>
      UserInfo
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/epic" element={<Epic />} />
      </Routes>
    </div>
  );
};
