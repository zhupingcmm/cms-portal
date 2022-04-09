import { Spin } from "antd";
import React from "react";
import { CreateKanBan } from "./create-kanban";
import { useBoards, useUserIdInUrl } from "./hook.util";
import { Task } from "./task";

export const KanBan = () => {
  const { data: boards, isLoading } = useBoards(useUserIdInUrl());
  return (
    <div className="kanban">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          {boards?.map((board, index) => {
            return (
              <div key={index} className="kanban-colum">
                <h3>{board.name}</h3>
                <Task boardId={board.id} />
              </div>
            );
          })}
          <CreateKanBan />
        </>
      )}
    </div>
  );
};
