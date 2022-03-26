import { CustomerError } from "@src/types";
import { Typography } from "antd";
import React from "react";

export const ErrorPage = ({ error }: { error: CustomerError | null }) => {
  return (
    <div className="error-page">
      <Typography.Text type={"danger"}>
        {error?.message || error?.msg}
      </Typography.Text>
    </div>
  );
};
