import React, { useCallback } from "react";
import { Button, Typography } from "antd";

export const UserHeader = ({
  setModalVisible,
  setTitle,
}: {
  setModalVisible: (p: boolean) => void;
  setTitle: (t: string) => void;
}) => {
  const handleClick = useCallback(() => {
    setModalVisible(true);
    setTitle("新建用户");
  }, [setModalVisible, setTitle]);
  return (
    <div className="user-header">
      <Typography.Title level={3}>用户信息</Typography.Title>
      <Button onClick={handleClick}>新建用户</Button>
    </div>
  );
};
