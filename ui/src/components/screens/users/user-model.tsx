import { User } from "@src/types";
import { Button, Drawer, DrawerProps, Form, Input, Space } from "antd";
import React from "react";

interface UserModelProps extends DrawerProps {
  user?: User;
  close: () => void;
}

export const UserModel = ({ user, close, ...restProps }: UserModelProps) => {
  return (
    <Drawer
      title="用户信息"
      onClose={() => close()}
      extra={
        <Space>
          <Button onClick={() => close()}>取消</Button>
          <Button>保存</Button>
        </Space>
      }
      {...restProps}
    >
      <Form labelAlign={"left"}>
        <Form.Item
          label="用户名"
          name={"username"}
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name={"password"}
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input placeholder="密码" />
        </Form.Item>
        <Form.Item label="邮箱" name={"email"}>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item label="部门" name={"department"}>
          <Input placeholder="部门" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
