import React, { useCallback } from "react";
import { Button, Typography } from "antd";

export const UserHeader = ({
  open,
  setTitle,
}: {
  open: () => void;
  setTitle: (t: string) => void;
}) => {
  const handleClick = useCallback(() => {
    open();
    setTitle("新建用户");
  }, [open, setTitle]);
  return (
    <div className="user-header">
      <Typography.Title level={3}>用户信息</Typography.Title>
      <Button onClick={handleClick}>新建用户</Button>
    </div>
  );
};
