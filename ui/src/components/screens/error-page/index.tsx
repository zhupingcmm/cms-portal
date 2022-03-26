import { Typography } from "antd";
import React from "react";

export const ErrorPage = ({ error }: { error: Error | null }) => {
  return (
    <div className="error-page">
      <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
    </div>
  );
};
