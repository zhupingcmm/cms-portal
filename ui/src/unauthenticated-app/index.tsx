import React from "react";
import { Button, Card, Form, Input } from "antd";


export const UnauthenticatedApp = () => {
  return (
    <div className="cardContainer">
      <Card className="shadowCard">
        <div className="login-title">Login</div>
        <Form>
          <Form.Item>
            <Input placeholder="username" id="username" />
          </Form.Item>
        </Form>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input placeholder="password" id={"password"} />
        </Form.Item>
        <Button htmlType="submit" type="primary">Login</Button>
      </Card>
    </div>
  );
};
