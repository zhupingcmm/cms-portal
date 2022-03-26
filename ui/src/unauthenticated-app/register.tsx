import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { useAuth } from "@src/context/auth-context";

interface CustomerError extends Error {
  msg?: string;
}
export const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState<CustomerError | null>(null);

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => {
    console.log(values, cpassword);
    if (cpassword !== values.password) {
      setError(new Error("please input the same password"));
      return;
    }
    try {
      const user = await register(values);
    } catch (e: any) {
      setError(e);
    }
  };
  return (
    <>
      <div className="login-title">Register</div>
      {error && (
        <Typography.Text type="danger">
          {error?.msg || error?.message}
        </Typography.Text>
      )}
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
        <Form.Item
          name={"cpassword"}
          rules={[{ required: true, message: "Confirm your password" }]}
        >
          <Input placeholder="confirm password" id={"cpassword"} />
        </Form.Item>
        <Button htmlType="submit" type="primary" className="full-button">
          Register
        </Button>
      </Form>
    </>
  );
};
