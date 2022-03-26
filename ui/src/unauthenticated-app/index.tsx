import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Divider, Typography } from "antd";
import { Register } from "./register";
import { Login } from "./login";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const abc: any = 5;
  return (
    <div className="cardContainer">
      {abc.abc()}
      <Card className="shadowCard">
        {isRegister ? <Register /> : <Login />}
        <Divider />
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "change to login" : "change to register"}
        </Button>
      </Card>
    </div>
  );
};
