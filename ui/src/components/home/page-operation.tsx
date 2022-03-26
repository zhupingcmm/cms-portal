import React from "react";
import { Dropdown, Menu } from "antd";
import { useAuth } from "@src/context/auth-context";

export const PageOperation = () => {
  const { logout, user } = useAuth();
  return (
    <div className="user-info">
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={logout}>logout</Menu.Item>
          </Menu>
        }
      >
        <a
        // target="_blank"
        // rel="noopener noreferrer"
        // href="https://www.aliyun.com"
        >
          {user?.username}
        </a>
      </Dropdown>
    </div>
  );
};
