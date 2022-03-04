import React, { useEffect } from "react";
import { Button, Card, Form, Input, Divider } from "antd";
import { http } from "@src/utils/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/context/auth-context";

export const UnauthenticatedApp = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  console.log('UnauthenticatedApp======');

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const user = await login(values);
    console.log(user);
    navigate("/home");
  };

  return (
    <div className="cardContainer">
      <Card className="shadowCard">
        <div className="login-title">Login</div>

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
        <Divider />
      </Card>
    </div>
  );
};
