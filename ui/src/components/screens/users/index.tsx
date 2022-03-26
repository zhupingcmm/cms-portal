import React, { useState } from "react";
import { Param } from "@src/types";
import { Menu, PageHeader, Table, Dropdown } from "antd";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "@src/utils/hook.util";
import { useUser } from "./hook.util";
import { useAuth } from "@src/context/auth-context";
import { useDocumentTitle } from "@src/components/hook.util";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
];
const menu = (
  <Menu>
    <Menu.Item>aa</Menu.Item>
  </Menu>
);

export const UsersPage = () => {
  const { user, logout } = useAuth();
  const [param, setParam] = useState<Param>({ key: "username", value: "" });
  const { tableData, isLoading } = useUser(useDebounce(param, 500));
  useDocumentTitle("用户信息", false);
  return (
    <div className="users-page">
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

      <SearchPanel param={param} setParam={setParam} />
      <Table
        dataSource={tableData || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  );
};
