import React, { useState } from "react";
import { Param } from "@src/types";
import { Button, Dropdown, Menu, Table, Typography } from "antd";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "@src/utils/hook.util";
import { useUsers, useUserModel, useDeleteUser } from "./hook.util";
import { useDocumentTitle } from "@src/components/hook.util";
import { Link } from "react-router-dom";
import { useUrlQueryParam } from "@src/utils/url";
import { UserHeader } from "./user-header";
import { UserModel } from "./user-model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { close, open } from "@src/reducer/model";

export const UsersPage = () => {
  useDocumentTitle("用户信息", false);
  const [param, setParam] = useUrlQueryParam(["username"]);
  const { tableData, isLoading } = useUsers(useDebounce(param, 500));
  const [title, setTitle] = useState("");
  const status = useSelector((state: RootState) => state.modelReducer.status);
  const dispatch = useDispatch();
  const { open, close, openUserModel, startEdit } = useUserModel();
  const { mutateAsync } = useDeleteUser();

  const handleDelete = (id: number) => {
    mutateAsync(id);
  };

  return (
    <div className="users-page">
      <UserHeader open={open} setTitle={setTitle} />
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
          {
            render(value, user) {
              const { id } = value;
              return (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => startEdit(id)}>编辑</Menu.Item>
                      <Menu.Item onClick={() => handleDelete(id)}>
                        删除
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button type="link">...</Button>
                </Dropdown>
              );
            },
          },
        ]}
        loading={isLoading}
      />
      <UserModel />
    </div>
  );
};
