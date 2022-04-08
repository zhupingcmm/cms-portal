import { Menu } from "antd";
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { Epic } from "./epic";
import { KanBan } from "./kanban";

const Aside = () => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  const selectedKey = useMemo(() => {
    return pathname.split("/").pop();
  }, [pathname]);

  console.log("selectedKey::", selectedKey);

  return (
    <aside className="aside">
      <Menu
        mode="vertical"
        selectedKeys={[selectedKey || "kanban"]}
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <Menu.Item key={"kanban"}>
          <Link to={"kanban"}>看板</Link>
        </Menu.Item>
        <Menu.Item key={"epic"}>
          <Link to={"epic"}>任务组</Link>
        </Menu.Item>
      </Menu>
    </aside>
  );
};

export const UserInfo = () => {
  return (
    <div className="user-info-container">
      <Aside />
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
