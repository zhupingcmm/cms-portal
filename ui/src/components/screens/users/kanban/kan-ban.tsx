import { Board } from "@src/types/board";
import { Dropdown, Menu, Button, Modal } from "antd";
import React, { useCallback } from "react";
import { useBoardQueryKey, useDeleteBoard } from "./hook.util";
import { Task } from "../task";

export const KanBanScreen = ({ boards }: { boards?: Board[] }) => {
  return (
    <>
      {boards?.map((board, index) => {
        return (
          <div key={index} className="kanban-colum">
            <div className="kanban-header">
              <h3>{board.name}</h3>
              <More id={board.id} />
            </div>
            <Task boardId={board.id} />
          </div>
        );
      })}
    </>
  );
};

const More = ({ id }: { id: number }) => {
  const { mutateAsync: deleteBoard } = useDeleteBoard(useBoardQueryKey());
  const handleDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        okText: "确认",
        title: "确认删除",
        content: "确认删除模板吗？",
        onOk: () => deleteBoard(id),
        cancelText: "取消",
      });
      //   deleteBoard(id);
    },
    [deleteBoard]
  );
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => handleDelete(id)}>删除</Menu.Item>
        </Menu>
      }
    >
      <Button type="link">...</Button>
    </Dropdown>
  );
};
