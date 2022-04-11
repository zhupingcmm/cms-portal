import React, { useState } from "react";
import { User } from "@src/types";
import { Button, Dropdown, Menu, Modal, Table, Typography } from "antd";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "@src/utils/hook.util";
import {
  useUsers,
  useUserModel,
  useDeleteUser,
  useUserSearchParam,
  useUserQueryKey,
} from "./hook.util";
import { useDocumentTitle } from "@src/components/hook.util";
import { Link } from "react-router-dom";
import { UserHeader } from "./user-header";
import { UserModel } from "./user-model";
import { Profiler } from "@src/components/profiler";

export const UsersPage = () => {
  useDocumentTitle("用户信息", false);
  const [param, setParam] = useUserSearchParam();
  const { tableData, isLoading } = useUsers(useDebounce(param, 500));
  const [title, setTitle] = useState("");
  const { open, startEdit } = useUserModel();
  const { mutateAsync } = useDeleteUser(useUserQueryKey());

  const handleDelete = (user: User) => {
    const { id, username } = user;
    Modal.confirm({
      title: "确认删除",
      content: `确认删除${username}吗？`,
      onOk() {
        mutateAsync(id);
      },
      okText: "确认",
      cancelText: "取消",
    });
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
                      <Menu.Item onClick={() => handleDelete(user)}>
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
