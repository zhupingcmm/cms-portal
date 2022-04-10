import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Divider, Typography } from "antd";
import { Register } from "./register";
import { Login } from "./login";
const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="cardContainer">
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

export default UnauthenticatedApp;
