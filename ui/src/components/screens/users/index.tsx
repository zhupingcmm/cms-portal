import React, { useState } from "react";
import { Param } from "@src/types";
import { Table } from "antd";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "@src/utils/hook.util";
import { useUser } from "./hook.util";
import { useDocumentTitle } from "@src/components/hook.util";
import { Link } from "react-router-dom";
import { useUrlQueryParam } from "@src/utils/url";

export const UsersPage = () => {
  useDocumentTitle("用户信息", false);
  const [param, setParam] = useUrlQueryParam(["username"]);
  const { tableData, isLoading, retry } = useUser(useDebounce(param, 500));
  return (
    <div className="users-page">
      <SearchPanel param={param} setParam={setParam} />
      <Table
        dataSource={tableData || []}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Username",
            // dataIndex: "username",
            key: "username",
            render(value, user) {
              return <Link to={String(user.id)}>{user.username}</Link>;
            },
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
        ]}
        loading={isLoading}
      />
    </div>
  );
};
