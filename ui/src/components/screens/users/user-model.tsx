import { Button, Drawer, Form, Input, Spin } from "antd";
import React, { useEffect } from "react";
import {
  useAddUser,
  useEditUser,
  useUserQueryKey,
  useUserModel,
} from "./hook.util";

export const UserModel = () => {
  const { editUser, isLoading, close, openUserModel } = useUserModel();
  const [form] = Form.useForm();
  const useMutateProject = editUser ? useEditUser : useAddUser;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject(
    useUserQueryKey()
  );

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const onFinish = (values: any) => {
    mutateAsync({ ...editUser, ...values }).then(() => closeModal());
  };
  useEffect(() => {
    form.setFieldsValue(editUser);
  }, [form, editUser]);

  return (
    <Drawer
      forceRender={true}
      title={editUser ? "编辑用户信息" : "创建用户"}
      onClose={closeModal}
      width={"100%"}
      visible={openUserModel}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="user-model">
          <Form
            form={form}
            style={{ width: "40rem" }}
            layout={"vertical"}
            onFinish={onFinish}
          >
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
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Drawer>
  );
};
