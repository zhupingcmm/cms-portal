import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/context/auth-context";

interface CustomerError extends Error {
  msg: string
}
export const Login = () => {
  const { login, user } = useAuth();
  const [error, setError] = useState<CustomerError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const user = await login(values);
    } catch(e: any) {
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
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form>
    </>
  );
};
