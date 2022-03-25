import React from "react";
import { Menu } from "antd";

export const NavigationBar = () => {
  return (
    <Menu mode={"horizontal"} selectedKeys={["user"]}>
      <Menu.Item key={"ci"}>CI</Menu.Item>
      <Menu.Item key={"cd"}>CD</Menu.Item>
      <Menu.Item key={"code"}>CODE</Menu.Item>
      <Menu.Item key={"env"}>ENV</Menu.Item>
      <Menu.Item key={"user"}>USER</Menu.Item>
    </Menu>
  );
};
