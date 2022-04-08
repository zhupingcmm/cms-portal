import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Epic } from "./epic";
import { KanBan } from "./kanban";

export const UserInfo = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanBan />} />
        <Route path="/epic" element={<Epic />} />
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};
