import { Spin } from "antd";
import React from "react";
import { CreateKanBan } from "./create-kanban";
import { useBoards } from "./hook.util";
import { useUserIdInUrl } from "../hook.util";
import { KanBanScreen } from "@src/components/screens/users/kanban/kan-ban";
import { TaskModal } from "../task/task-modal";

export const KanBan = () => {
  const { data: boards, isLoading } = useBoards(useUserIdInUrl());
  return (
    <div className="kanban">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <KanBanScreen boards={boards} />
          <CreateKanBan />
        </>
      )}
      <TaskModal />
    </div>
  );
};
