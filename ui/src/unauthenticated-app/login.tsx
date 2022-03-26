import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useAuth } from "@src/context/auth-context";
import { useAsync } from "@src/utils/use-async";
import { CustomerError } from "@src/types";

export const Login = () => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync();
  const [error, setError] = useState<CustomerError | null>(null);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      run(login(values));
    } catch (e: any) {
      setError(e);
    }
  };
  return (
    <>
      <div className="login-title">login</div>
      {error && <Typography.Text type="danger">{error?.msg}</Typography.Text>}

      <Form onFinish={handleSubmit}>
        <Form.Item
          name={"username"}
          rules={[{ required: true, message: "please input username" }]}
        >
          <Input placeholder="username" id={"username"} />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input placeholder="password" id={"password"} />
        </Form.Item>
        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          className="full-button"
        >
          Login
        </Button>
      </Form>
    </>
  );
};
