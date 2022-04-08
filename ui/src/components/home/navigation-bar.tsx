import React, { useCallback, useEffect, useMemo } from "react";
import { Menu } from "antd";
import mf from "@src/img/mf_logo_blue_small.png";
import { MenuInfo } from "rc-menu/lib/interface";

export const NavigationBar = () => {
  const initKey = useMemo(() => {
    return window.location.pathname.replace("/", "");
  }, []);
  const handleClick = useCallback((e: MenuInfo) => {
    window.location.href = window.location.origin + "/" + e.key;
  }, []);

  return (
    <Menu
      mode={"horizontal"}
      selectedKeys={[initKey]}
      onClick={handleClick}
      style={{ lineHeight: "5vh" }}
    >
      <Menu.Item
        key={"home"}
        icon={<img src={mf} alt="" style={{ width: 80 }} />}
      >
        Home
      </Menu.Item>
      <Menu.Item key={"ci"}>CI</Menu.Item>
      <Menu.Item key={"cd"}>CD</Menu.Item>
      <Menu.Item key={"code"}>CODE</Menu.Item>
      <Menu.Item key={"env"}>ENV</Menu.Item>
      <Menu.Item key={"users"}>USER</Menu.Item>
    </Menu>
  );
};
