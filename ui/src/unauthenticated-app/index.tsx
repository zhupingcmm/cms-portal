import React from "react";
import { Button, Card, Form, Input, Divider } from "antd";
import { http } from '@src/utils/http';

export const UnauthenticatedApp = () => {

  const handleSubmit = async (values:{
      username: string,
      password: string
  }) => {
    console.log('===================')
    const data = await http('token', {data: values, method: 'POST'});
    console.log(data);
  }

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
