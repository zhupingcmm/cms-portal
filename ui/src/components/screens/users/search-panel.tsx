import { Param } from "@src/types";
import { Form, Input, Select } from "antd";
import React from "react";
interface SearchPanelProps {
  param: Param;
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form layout="inline">
      <Form.Item className="select-search">
        <Input
          placeholder="搜索名字"
          onChange={(e) => {
            setParam({
              ...param,
              username: e.target.value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};
