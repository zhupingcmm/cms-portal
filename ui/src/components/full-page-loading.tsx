import React from "react";
import { Spin } from "antd";

export const FullPageLoading = () => {
  return (
    <div className="full-page">
      <Spin size="large" />
    </div>
  );
};
